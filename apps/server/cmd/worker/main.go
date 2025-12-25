package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"motion-pipe/config"
	"motion-pipe/internal/worker"
	"motion-pipe/pkg/email"
	"motion-pipe/pkg/logger"
	"motion-pipe/pkg/rabbitmq"
	"go.uber.org/zap"
)

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

	logger.Info("Starting Motion Pipe Background Worker",
		zap.String("env", cfg.Server.Env),
	)

	rabbitClient, err := rabbitmq.NewClient(cfg)
	if err != nil {
		logger.Fatal("Failed to connect to RabbitMQ", zap.Error(err))
	}
	defer rabbitClient.Close()

	emailService := email.NewService(cfg)
	emailWorker := worker.NewEmailWorker(rabbitClient, emailService)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	if err := emailWorker.Start(ctx); err != nil {
		logger.Fatal("Failed to start email worker", zap.Error(err))
	}

	logger.Info("Worker is running and waiting for messages...")

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	logger.Info("Shutting down worker...")
}
