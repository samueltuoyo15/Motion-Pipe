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

// XAuthBegin godoc
// @Summary      Begin X (Twitter) OAuth 2.0 authentication
// @Description  Initiates OAuth 2.0 flow with PKCE for X (Twitter)
// @Tags         Authentication
// @Success      302  "Redirects to X OAuth page"
// @Failure      500  {object}  map[string]string
// @Router       /auth/twitter [get]
func (h *AuthHandler) XAuthBegin(c *gin.Context) {
	// Generate PKCE code verifier and challenge
	verifier := oauth2.GenerateVerifier()
	
	// Generate state for CSRF protection
	state := uuid.New().String()
	
	// Get or create session store
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
	session.Options.Path = "/"
	
	if err := session.Save(c.Request, c.Writer); err != nil {
		logger.Error("Failed to save session", zap.Error(err))
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save session"})
		return
	}
	
	// Generate authorization URL with PKCE
	authURL := oauth.XOAuthConfig.AuthCodeURL(
		state,
		oauth2.S256ChallengeOption(verifier),
	)
	
	logger.Info("Redirecting to X OAuth", zap.String("url", authURL))
	c.Redirect(http.StatusTemporaryRedirect, authURL)
}

// XAuthCallback godoc
// @Summary      X (Twitter) OAuth 2.0 callback handler
// @Description  Handles the X OAuth callback and creates user session
// @Tags         Authentication
// @Success      302  "Redirects to frontend with authentication"
// @Failure      400  {object}  map[string]string
// @Router       /auth/twitter/callback [get]
func (h *AuthHandler) XAuthCallback(c *gin.Context) {
	// Get session
	store := sessions.NewCookieStore([]byte(h.config.Session.Secret))
	session, err := store.Get(c.Request, "x-auth-session")
	if err != nil {
		logger.Error("Failed to get session", zap.Error(err))
		h.redirectWithError(c, "Failed to retrieve session")
		return
	}
	
	// Verify state for CSRF protection
	savedState, ok := session.Values["state"].(string)
	if !ok || savedState != c.Query("state") {
		logger.Warn("Invalid state parameter", zap.String("expected", savedState), zap.String("got", c.Query("state")))
		h.redirectWithError(c, "Invalid state parameter")
		return
	}
	
	// Get code verifier from session
	verifier, ok := session.Values["code_verifier"].(string)
	if !ok {
		logger.Error("Code verifier not found in session")
		h.redirectWithError(c, "Invalid session")
		return
	}
	
	// Exchange authorization code for token
	code := c.Query("code")
	if code == "" {
		logger.Error("Authorization code not provided")
		h.redirectWithError(c, "Authorization code missing")
		return
	}
	
	// Exchange code for token with PKCE verifier
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
	
	// Fetch user info from X API v2
	userInfo, err := fetchXUserInfo(token.AccessToken)
	if err != nil {
		logger.Error("Failed to fetch user info", zap.Error(err))
		h.redirectWithError(c, "Failed to fetch user information")
		return
	}
	
	// Create goth.User compatible struct for existing auth flow
	gothUser := convertXUserToGoth(userInfo, token)
	
	// Use existing HandleOAuthCallback logic
	authResp, err := h.authService.HandleOAuthCallback(c.Request.Context(), gothUser)
	if err != nil {
		logger.Error("Failed to handle OAuth callback", zap.Error(err))
		h.redirectWithError(c, "Authentication failed")
		return
	}
	
	// Redirect to frontend with tokens (matching existing pattern)
	redirectURL := fmt.Sprintf("%s/auth/success?access_token=%s&refresh_token=%s",
		h.config.Server.FrontendURL,
		authResp.Tokens.AccessToken,
		authResp.Tokens.RefreshToken,
	)
	c.Redirect(http.StatusTemporaryRedirect, redirectURL)
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
