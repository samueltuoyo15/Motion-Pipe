package routes

import (
	"motion-pipe/internal/handlers"

	"github.com/gin-gonic/gin"
)

func RegisterAuthRoutes(router *gin.Engine, authHandler *handlers.AuthHandler) {
	auth := router.Group("/auth")

	{
		auth.GET("/google", authHandler.GoogleLogin)

		auth.GET("/google/callback", authHandler.GoogleCallback)
	}
}
