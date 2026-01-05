package main

import (
	"context"
	"log"
	"motion-pipe/internal/handlers"
	"motion-pipe/internal/middlewares"
	"motion-pipe/internal/routes"
	"motion-pipe/pkg/logger"
	database "motion-pipe/pkg/postgres"
	"motion-pipe/pkg/repositories"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func main() {
	server := gin.Default()
	GO_ENV := os.Getenv("GO_ENV")
	if GO_ENV == "" {
		GO_ENV = "development"
	}
	logger.Init(GO_ENV)
	defer logger.Sync()

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db, err := database.Connect(ctx)
	if err != nil {
		log.Fatalf("Database connection failed: %v", err)
	}
	defer db.Close()
	log.Println("Connected to PostgreSQL")

	accountRepo := repositories.NewAccountRepository(db.Pool)
	authHandler := handlers.NewAuthHandler(accountRepo)

	server.Use(middlewares.CORS([]string{
		"http://localhost:3000",
		"https://motion-pipe.vercel.app",
	}))
	server.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, World! from Gin",
		})
	})

	routes.RegisterAuthRoutes(server, authHandler)
	logger.Log.Info("Server starting ", zap.String("environment", GO_ENV))
	server.Run(":8080")
}
