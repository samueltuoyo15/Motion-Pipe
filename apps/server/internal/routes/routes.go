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
			auth.GET("/:provider", authHandler.BeginAuth)
			auth.GET("/:provider/callback", authHandler.Callback)
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
