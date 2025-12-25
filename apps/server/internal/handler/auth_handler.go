package handler

import (
	"errors"
	"net/http"

	"motion-pipe/config"
	"motion-pipe/internal/middleware"
	"motion-pipe/internal/service"
	"motion-pipe/pkg/logger"

	"github.com/gin-gonic/gin"
	"github.com/markbates/goth/gothic"
	"go.uber.org/zap"
)

type AuthHandler struct {
	authService service.AuthService
	config      *config.Config
}

func NewAuthHandler(authService service.AuthService, cfg *config.Config) *AuthHandler {
	return &AuthHandler{
		authService: authService,
		config:      cfg,
	}
}

// BeginAuth godoc
// @Summary Start OAuth authentication
// @Description Initiates OAuth flow with specified provider
// @Tags Authentication
// @Param provider path string true "OAuth Provider" Enums(google, twitter)
// @Success 302 {string} string "Redirect to OAuth provider"
// @Failure 400 {object} map[string]string
// @Router /auth/{provider} [get]
func (h *AuthHandler) BeginAuth(c *gin.Context) {
	provider := c.Param("provider")
	
	if provider != "google" && provider != "twitter" {
		logger.Warn("Invalid OAuth provider", zap.String("provider", provider))
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid provider",
			"message": "Only 'google' and 'twitter' providers are supported",
		})
		return
	}

	c.Request = c.Request.WithContext(c.Request.Context())
	gothic.BeginAuthHandler(c.Writer, c.Request)
}

// Callback godoc
// @Summary OAuth callback handler
// @Description Handles OAuth provider callback and returns JWT tokens
// @Tags Authentication
// @Param provider path string true "OAuth Provider" Enums(google, twitter)
// @Success 302 {string} string "Redirect to frontend with token"
// @Failure 400 {object} map[string]string
// @Router /auth/{provider}/callback [get]
func (h *AuthHandler) Callback(c *gin.Context) {
	provider := c.Param("provider")

	if provider != "google" && provider != "twitter" {
		logger.Warn("Invalid OAuth provider in callback", zap.String("provider", provider))
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid provider",
			"message": "Only 'google' and 'twitter' providers are supported",
		})
		return
	}

	gothUser, err := gothic.CompleteUserAuth(c.Writer, c.Request)
	if err != nil {
		logger.Error("OAuth authentication failed", zap.Error(err))
		c.Redirect(http.StatusTemporaryRedirect, h.config.Server.FrontendURL+"/auth/error?message=authentication_failed")
		return
	}

	authResponse, err := h.authService.HandleOAuthCallback(c.Request.Context(), gothUser)
	if err != nil {
		logger.Error("Failed to handle OAuth callback", zap.Error(err))
		
		if errors.Is(err, service.ErrUserInactive) {
			c.Redirect(http.StatusTemporaryRedirect, h.config.Server.FrontendURL+"/auth/error?message=account_inactive")
			return
		}

		c.Redirect(http.StatusTemporaryRedirect, h.config.Server.FrontendURL+"/auth/error?message=internal_error")
		return
	}

	redirectURL := h.config.Server.FrontendURL + "/auth/success?token=" + authResponse.Tokens.AccessToken
	c.Redirect(http.StatusTemporaryRedirect, redirectURL)
}

// RefreshToken godoc
// @Summary Refresh access token
// @Description Get new access token using refresh token
// @Tags Authentication
// @Accept json
// @Produce json
// @Param request body object{refresh_token=string} true "Refresh Token Request"
// @Success 200 {object} map[string]interface{}
// @Failure 400 {object} map[string]string
// @Failure 401 {object} map[string]string
// @Router /auth/refresh [post]
func (h *AuthHandler) RefreshToken(c *gin.Context) {
	var req struct {
		RefreshToken string `json:"refresh_token" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		logger.Warn("Invalid refresh token request", zap.Error(err))
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Bad Request",
			"message": "refresh_token is required",
		})
		return
	}

	tokens, err := h.authService.RefreshToken(c.Request.Context(), req.RefreshToken)
	if err != nil {
		logger.Error("Failed to refresh token", zap.Error(err))
		
		if errors.Is(err, service.ErrInvalidCredentials) {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error":   "Unauthorized",
				"message": "Invalid refresh token",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Internal Server Error",
			"message": "Failed to refresh token",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": tokens,
	})
}

// Logout godoc
// @Summary Logout user
// @Description Blacklist current access token
// @Tags Authentication
// @Security BearerAuth
// @Success 200 {object} map[string]string
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /auth/logout [post]
func (h *AuthHandler) Logout(c *gin.Context) {
	token, err := extractTokenFromHeader(c)
	if err != nil {
		logger.Warn("Failed to extract token for logout", zap.Error(err))
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Bad Request",
			"message": "Invalid authorization header",
		})
		return
	}

	if err := h.authService.Logout(c.Request.Context(), token, h.config.JWT.Expiration); err != nil {
		logger.Error("Failed to logout", zap.Error(err))
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Internal Server Error",
			"message": "Failed to logout",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Logged out successfully",
	})
}

// GetCurrentUser godoc
// @Summary Get current user
// @Description Get authenticated user information
// @Tags Authentication
// @Security BearerAuth
// @Produce json
// @Success 200 {object} map[string]interface{}
// @Failure 401 {object} map[string]string
// @Router /auth/me [get]
func (h *AuthHandler) GetCurrentUser(c *gin.Context) {
	user, exists := middleware.GetCurrentUser(c)
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error":   "Unauthorized",
			"message": "User not authenticated",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": user,
	})
}

func extractTokenFromHeader(c *gin.Context) (string, error) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		return "", errors.New("authorization header is missing")
	}

	var token string
	if len(authHeader) > 7 && authHeader[:7] == "Bearer " {
		token = authHeader[7:]
	} else {
		return "", errors.New("invalid authorization header format")
	}

	return token, nil
}
