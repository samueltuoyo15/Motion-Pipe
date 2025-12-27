package routes

import (
	"motion-pipe/config"
	"motion-pipe/internal/handler"
	"motion-pipe/internal/middleware"
	"motion-pipe/pkg/jwt"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(
	router *gin.Engine,
	cfg *config.Config,
	authHandler *handler.AuthHandler,
	jwtManager *jwt.Manager,
) {
	authMiddleware := middleware.NewAuthMiddleware(jwtManager)

	api := router.Group("/api/" + cfg.Server.APIVersion)
	{
		auth := api.Group("/auth")
		{
			// Twitter/X OAuth 2.0 with PKCE (new implementation)
			auth.GET("/twitter", authHandler.XAuthBegin)
			auth.GET("/twitter/callback", authHandler.XAuthCallback)
			
			// Google OAuth (using goth)
			auth.GET("/google", authHandler.BeginAuth)
			auth.GET("/google/callback", authHandler.Callback)
			
			// Other auth endpoints
			auth.POST("/refresh", authHandler.RefreshToken)
			
			authenticated := auth.Group("")
			authenticated.Use(authMiddleware.RequireAuth())
			{
				authenticated.POST("/logout", authHandler.Logout)
				authenticated.GET("/me", authHandler.GetCurrentUser)
			}
		}
	}

	router.NoRoute(middleware.NotFoundHandler())
}
