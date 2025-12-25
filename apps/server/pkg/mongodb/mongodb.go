package mongodb

import (
	"context"
	"fmt"
	"time"

	"motion-pipe/config"
	"motion-pipe/pkg/logger"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.uber.org/zap"
)

type Client struct {
	*mongo.Client
	Database *mongo.Database
}

func NewClient(cfg *config.Config) (*Client, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().
		ApplyURI(cfg.MongoDB.URI).
		SetMaxPoolSize(100).
		SetMinPoolSize(10).
		SetMaxConnIdleTime(30 * time.Second)

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to MongoDB: %w", err)
	}

	if err := client.Ping(ctx, nil); err != nil {
		return nil, fmt.Errorf("failed to ping MongoDB: %w", err)
	}

	database := client.Database(cfg.MongoDB.Database)

	logger.Info("MongoDB connected successfully",
		zap.String("database", cfg.MongoDB.Database),
	)

	return &Client{
		Client:   client,
		Database: database,
	}, nil
}

func (c *Client) Close() error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	return c.Client.Disconnect(ctx)
}
