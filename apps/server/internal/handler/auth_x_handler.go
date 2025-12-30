package handler

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"motion-pipe/pkg/oauth"
	"motion-pipe/pkg/logger"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/markbates/goth"
	"github.com/gorilla/sessions"
	"go.uber.org/zap"
	"golang.org/x/oauth2"
)

type XUser struct {
	Data struct {
		ID              string `json:"id"`
		Name            string `json:"name"`
		Username        string `json:"username"`
		ProfileImageURL string `json:"profile_image_url"`
	} `json:"data"`
}


func (h *AuthHandler) XAuthBegin(c *gin.Context) {
	verifier := oauth2.GenerateVerifier()

	
	state := uuid.New().String()

	
	store := sessions.NewCookieStore([]byte(h.config.Session.Secret))

	session, err := store.Get(c.Request, "x-auth-session")
	if err != nil {
		logger.Error("Failed to get session", zap.Error(err))
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to initialize session"})
		return
	}
	
	session.Values["code_verifier"] = verifier
	session.Values["state"] = state
	session.Options.MaxAge = 600 
	session.Options.HttpOnly = true
	session.Options.Secure = h.config.IsProduction()
	session.Options.SameSite = http.SameSiteLaxMode
	session.Options.Path = "/"
	
	if err := session.Save(c.Request, c.Writer); err != nil {
		logger.Error("Failed to save session", zap.Error(err))
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save session"})
		return
	}
	
	authURL := oauth.XOAuthConfig.AuthCodeURL(
		state,
		oauth2.S256ChallengeOption(verifier),
	)

	
	logger.Info("Redirecting to X OAuth", zap.String("url", authURL))
	c.Redirect(http.StatusTemporaryRedirect, authURL)
}


func (h *AuthHandler) XAuthCallback(c *gin.Context) {
	store := sessions.NewCookieStore([]byte(h.config.Session.Secret))

	session, err := store.Get(c.Request, "x-auth-session")
	if err != nil {
		logger.Error("Failed to get session", zap.Error(err))
		h.redirectWithError(c, "Failed to retrieve session")
		return
	}

	logger.Info("OAuth Callback Debug", 
		zap.Bool("session_is_new", session.IsNew),
		zap.Int("values_count", len(session.Values)),
		zap.String("query_state", c.Query("state")),
		zap.Any("session_keys", getKeys(session.Values)),
	)
	
	savedState, ok := session.Values["state"].(string)

	if !ok || savedState != c.Query("state") {
		logger.Warn("Invalid state parameter", 
			zap.String("expected", savedState), 
			zap.String("got", c.Query("state")),
			zap.Bool("state_found_in_session", ok),
		)
		h.redirectWithError(c, "Invalid state parameter")
		return
	}
	
	verifier, ok := session.Values["code_verifier"].(string)

	if !ok {
		logger.Error("Code verifier not found in session")
		h.redirectWithError(c, "Invalid session")
		return
	}
	
	code := c.Query("code")

	if code == "" {
		logger.Error("Authorization code not provided")
		h.redirectWithError(c, "Authorization code missing")
		return
	}
	
	token, err := oauth.XOAuthConfig.Exchange(

		context.Background(),
		code,
		oauth2.VerifierOption(verifier),
	)
	if err != nil {
		logger.Error("Failed to exchange code for token", zap.Error(err))
		h.redirectWithError(c, "Failed to exchange authorization code")
		return
	}
	
	userInfo, err := fetchXUserInfo(token.AccessToken)

	if err != nil {
		logger.Error("Failed to fetch user info", zap.Error(err))
		h.redirectWithError(c, "Failed to fetch user information")
		return
	}
	
	gothUser := convertXUserToGoth(userInfo, token)

	
	authResp, err := h.authService.HandleOAuthCallback(c.Request.Context(), gothUser)

	if err != nil {
		logger.Error("Failed to handle OAuth callback", zap.Error(err))
		h.redirectWithError(c, "Authentication failed")
		return
	}

	domain := ""
	if h.config.IsProduction() {
		domain = h.config.Server.Domain
	}

	c.SetCookie(
		"access_token",
		authResp.Tokens.AccessToken,
		86400,
		"/",
		domain,
		h.config.IsProduction(),
		true,
	)

	c.SetCookie(
		"refresh_token",
		authResp.Tokens.RefreshToken,
		604800,
		"/",
		domain,
		h.config.IsProduction(),
		true,
	)

	c.SetCookie(
		"x-auth-session",
		"",
		-1,
		"/",
		domain,
		h.config.IsProduction(),
		true,
	)

	c.Redirect(http.StatusTemporaryRedirect, h.config.Server.FrontendURL+"/auth/success")
}

func fetchXUserInfo(accessToken string) (*XUser, error) {
	req, err := http.NewRequest("GET", "https://api.x.com/2/users/me?user.fields=profile_image_url", nil)
	if err != nil {
		return nil, err
	}
	
	req.Header.Set("Authorization", "Bearer "+accessToken)
	
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	
	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("X API returned status %d: %s", resp.StatusCode, string(body))
	}
	
	var user XUser
	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		return nil, err
	}
	
	return &user, nil
}

func convertXUserToGoth(xUser *XUser, token *oauth2.Token) goth.User {
	return goth.User{
		UserID:       xUser.Data.ID,
		Name:         xUser.Data.Name,
		NickName:     xUser.Data.Username,
		AvatarURL:    xUser.Data.ProfileImageURL,
		Provider:     "twitter",
		AccessToken:  token.AccessToken,
		RefreshToken: token.RefreshToken,
		ExpiresAt:    token.Expiry,
	}
}

func (h *AuthHandler) redirectWithError(c *gin.Context, errorMsg string) {
	redirectURL := fmt.Sprintf("%s/auth/error?message=%s", h.config.Server.FrontendURL, errorMsg)
	c.Redirect(http.StatusTemporaryRedirect, redirectURL)
}

func getKeys(m map[interface{}]interface{}) []string {
	keys := make([]string, 0, len(m))
	for k := range m {
		if s, ok := k.(string); ok {
			keys = append(keys, s)
		} else {
			keys = append(keys, fmt.Sprintf("%v", k))
		}
	}
	return keys
}
