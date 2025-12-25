package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"motion-pipe/config"
	_ "motion-pipe/docs"
	"motion-pipe/internal/handler"
	"motion-pipe/internal/middleware"
	"motion-pipe/internal/repository"
	"motion-pipe/internal/routes"
	"motion-pipe/internal/service"
	"motion-pipe/pkg/database"
	"motion-pipe/pkg/jwt"
	"motion-pipe/pkg/logger"
	"motion-pipe/pkg/mongodb"
	"motion-pipe/pkg/oauth"
	"motion-pipe/pkg/redis"

	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"go.uber.org/zap"
)

// @title Motion Pipe API
// @version 1.0
// @description Production-grade API for Motion Pipe platform with OAuth authentication, JWT tokens, and analytics
// @termsOfService http://swagger.io/terms/

// @contact.name Samuel Tuoyo
// @contact.url https://github.com/samueltuoyo15

// @license.name MIT
// @license.url https://opensource.org/licenses/MIT

// @host localhost:8080
// @BasePath /api/v1

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description Type "Bearer" followed by a space and JWT token
func main() {
	cfg, err := config.Load()
	if err != nil {
		fmt.Printf("Failed to load configuration: %v\n", err)
		os.Exit(1)
	}

	if err := logger.Initialize(cfg.Logging.Level, cfg.Logging.Output); err != nil {
		fmt.Printf("Failed to initialize logger: %v\n", err)
		os.Exit(1)
	}
	defer logger.Sync()

	logger.Info("Starting Motion Pipe Server",
		zap.String("env", cfg.Server.Env),
		zap.String("port", cfg.Server.Port),
		zap.String("api_version", cfg.Server.APIVersion),
	)

	db, err := database.Connect(cfg)
	if err != nil {
		logger.Fatal("Failed to connect to database", zap.Error(err))
	}
	defer func() {
		if err := database.Close(db); err != nil {
			logger.Error("Failed to close database connection", zap.Error(err))
		}
	}()

	if err := database.Migrate(db); err != nil {
		logger.Fatal("Failed to run database migrations", zap.Error(err))
	}

	redisClient, err := redis.NewClient(cfg)
	if err != nil {
		logger.Fatal("Failed to connect to Redis", zap.Error(err))
	}
	defer func() {
		if err := redisClient.Close(); err != nil {
			logger.Error("Failed to close Redis connection", zap.Error(err))
		}
	}()

	mongoClient, err := mongodb.NewClient(cfg)
	if err != nil {
		logger.Fatal("Failed to connect to MongoDB", zap.Error(err))
	}
	defer func() {
		if err := mongoClient.Close(); err != nil {
			logger.Error("Failed to close MongoDB connection", zap.Error(err))
		}
	}()

	oauth.Initialize(cfg)
	logger.Info("OAuth providers initialized")

	userRepo := repository.NewUserRepository(db)
	logger.Info("Repositories initialized")

	tokenBlacklist := redis.NewTokenBlacklist(redisClient)
	logger.Info("Token blacklist initialized")

	analyticsService := service.NewAnalyticsService(mongoClient)
	logger.Info("Analytics service initialized")

	jwtManager := jwt.NewManager(
		cfg.JWT.Secret,
		cfg.JWT.Expiration,
		cfg.JWT.RefreshExpiration,
	)
	logger.Info("JWT manager initialized")

	authService := service.NewAuthService(userRepo, tokenBlacklist, jwtManager)
	logger.Info("Services initialized")

	authHandler := handler.NewAuthHandler(authService, cfg)
	logger.Info("Handlers initialized")

	if cfg.IsProduction() {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.New()

	router.Use(middleware.Recovery())
	router.Use(middleware.Logger())
	router.Use(middleware.Prometheus())
	router.Use(middleware.CORS(cfg.Server.AllowedOrigins))
	router.Use(middleware.ErrorHandler())

	rateLimiter := middleware.NewRateLimiter(
		cfg.RateLimit.Requests,
		cfg.RateLimit.Duration,
	)
	router.Use(rateLimiter.Limit())

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "healthy",
			"version": cfg.Server.APIVersion,
			"time":    time.Now().UTC(),
		})
	})

	router.GET("/metrics", gin.WrapH(promhttp.Handler()))
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	routes.SetupRoutes(router, cfg, authHandler, jwtManager)
	logger.Info("Routes configured")

	srv := &http.Server{
		Addr:           ":" + cfg.Server.Port,
		Handler:        router,
		ReadTimeout:    15 * time.Second,
		WriteTimeout:   15 * time.Second,
		IdleTimeout:    60 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	go func() {
		logger.Info("Server starting", zap.String("address", srv.Addr))
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Fatal("Failed to start server", zap.Error(err))
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	logger.Info("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		logger.Error("Server forced to shutdown", zap.Error(err))
	}

	logger.Info("Server exited gracefully")
}

