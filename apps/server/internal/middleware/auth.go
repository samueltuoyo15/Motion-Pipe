package middleware

import (
	"errors"
	"net/http"
	"strings"

	"motion-pipe/pkg/jwt"
	"motion-pipe/pkg/postgres/models"

	"motion-pipe/pkg/logger"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

const (
	AuthorizationHeader = "Authorization"
	UserContextKey      = "user"
	ClaimsContextKey    = "claims"
)

type AuthMiddleware struct {
	jwtManager *jwt.Manager
}

func NewAuthMiddleware(jwtManager *jwt.Manager) *AuthMiddleware {
	return &AuthMiddleware{
		jwtManager: jwtManager,
	}
}

func (m *AuthMiddleware) RequireAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := extractToken(c)
		if err != nil {
			logger.Warn("Failed to extract token", zap.Error(err))
			c.JSON(http.StatusUnauthorized, gin.H{
				"error":   "Unauthorized",
				"message": "Missing or invalid authorization header",
			})
			c.Abort()
			return
		}

		claims, err := m.jwtManager.ValidateToken(token)
		if err != nil {
			logger.Warn("Invalid token", zap.Error(err))
			
			var statusCode int
			var message string
			
			if errors.Is(err, jwt.ErrExpiredToken) {
				statusCode = http.StatusUnauthorized
				message = "Token has expired"
			} else if errors.Is(err, jwt.ErrInvalidSignature) {
				statusCode = http.StatusUnauthorized
				message = "Invalid token signature"
			} else {
				statusCode = http.StatusUnauthorized
				message = "Invalid token"
			}

			c.JSON(statusCode, gin.H{
				"error":   "Unauthorized",
				"message": message,
			})
			c.Abort()
			return
		}

		user := &models.User{
			ID:       claims.UserID,
			Email:    claims.Email,
			Provider: claims.Provider,
		}

		c.Set(UserContextKey, user)
		c.Set(ClaimsContextKey, claims)

		logger.Debug("User authenticated",
			zap.String("user_id", claims.UserID.String()),
			zap.String("email", claims.Email),
		)

		c.Next()
	}
}

func (m *AuthMiddleware) OptionalAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := extractToken(c)
		if err != nil {
			c.Next()
			return
		}

		claims, err := m.jwtManager.ValidateToken(token)
		if err != nil {
			c.Next()
			return
		}

		user := &models.User{
			ID:       claims.UserID,
			Email:    claims.Email,
			Provider: claims.Provider,
		}

		c.Set(UserContextKey, user)
		c.Set(ClaimsContextKey, claims)

		c.Next()
	}
}

func extractToken(c *gin.Context) (string, error) {
	token, err := c.Cookie("access_token")
	if err == nil && token != "" {
		return token, nil
	}

	authHeader := c.GetHeader(AuthorizationHeader)
	if authHeader == "" {
		return "", errors.New("authorization header is missing")
	}

	parts := strings.SplitN(authHeader, " ", 2)
	if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
		return "", errors.New("invalid authorization header format")
	}

	return parts[1], nil
}

func GetCurrentUser(c *gin.Context) (*models.User, bool) {
	user, exists := c.Get(UserContextKey)
	if !exists {
		return nil, false
	}

	u, ok := user.(*models.User)
	return u, ok
}

func GetClaims(c *gin.Context) (*jwt.Claims, bool) {
	claims, exists := c.Get(ClaimsContextKey)
	if !exists {
		return nil, false
	}

	cl, ok := claims.(*jwt.Claims)
	return cl, ok
}
