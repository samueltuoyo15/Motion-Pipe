package redis

import (
	"context"
	"fmt"
	"time"

	"motion-pipe/config"
	"motion-pipe/pkg/logger"

	"github.com/redis/go-redis/v9"
	"go.uber.org/zap"
)

type Client struct {
	*redis.Client
}

func NewClient(cfg *config.Config) (*Client, error) {
	client := redis.NewClient(&redis.Options{
		Addr:         fmt.Sprintf("%s:%s", cfg.Redis.Host, cfg.Redis.Port),
		Password:     cfg.Redis.Password,
		DB:           cfg.Redis.DB,
		DialTimeout:  5 * time.Second,
		ReadTimeout:  3 * time.Second,
		WriteTimeout: 3 * time.Second,
		PoolSize:     10,
		MinIdleConns: 5,
	})

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := client.Ping(ctx).Err(); err != nil {
		return nil, fmt.Errorf("failed to connect to Redis: %w", err)
	}

	logger.Info("Redis connected successfully",
		zap.String("host", cfg.Redis.Host),
		zap.String("port", cfg.Redis.Port),
	)

	return &Client{Client: client}, nil
}

func (c *Client) Close() error {
	return c.Client.Close()
}
