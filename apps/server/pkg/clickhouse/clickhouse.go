package clickhouse

import (
	"context"
	"fmt"
	"time"

	"motion-pipe/config"
	"motion-pipe/pkg/logger"

	"github.com/ClickHouse/clickhouse-go/v2"
	"github.com/ClickHouse/clickhouse-go/v2/lib/driver"
	"go.uber.org/zap"
)

type Client struct {
	Conn driver.Conn
}

func Connect(cfg *config.Config) (*Client, error) {
	conn, err := clickhouse.Open(&clickhouse.Options{
		Addr: []string{cfg.ClickHouse.Addr},
		Auth: clickhouse.Auth{
			Database: cfg.ClickHouse.Database,
			Username: cfg.ClickHouse.Username,
			Password: cfg.ClickHouse.Password,
		},
		Settings: clickhouse.Settings{
			"max_execution_time": 60,
		},
		DialTimeout: 5 * time.Second,
		Compression: &clickhouse.Compression{
			Method: clickhouse.CompressionLZ4,
		},
	})

	if err != nil {
		return nil, fmt.Errorf("failed to connect to clickhouse: %w", err)
	}

	if err := conn.Ping(context.Background()); err != nil {
		if exception, ok := err.(*clickhouse.Exception); ok {
			fmt.Printf("Exception [%d] %s \n%s\n", exception.Code, exception.Message, exception.StackTrace)
		}
		return nil, fmt.Errorf("failed to ping clickhouse: %w", err)
	}

	logger.Info("Connected to ClickHouse", zap.String("addr", cfg.ClickHouse.Addr))
	return &Client{Conn: conn}, nil
}

func (c *Client) InitSchema(ctx context.Context) error {
	ddl := `
	CREATE TABLE IF NOT EXISTS events (
		type String,
		user_id String,
		ip String,
		user_agent String,
		path String,
		method String,
		status Int32,
		latency_ms Int64,
		metadata Map(String, String),
		timestamp DateTime64(3, 'UTC')
	) ENGINE = MergeTree()
	ORDER BY (timestamp, type, user_id)
	`
	if err := c.Conn.Exec(ctx, ddl); err != nil {
		return fmt.Errorf("failed to create events table: %w", err)
	}

	logger.Info("ClickHouse schema initialized")
	return nil
}

func (c *Client) Close() error {
	return c.Conn.Close()
}

type AnalyticsEvent struct {
	Type      string            `json:"type"`
	UserID    string            `json:"user_id"`
	IP        string            `json:"ip"`
	UserAgent string            `json:"user_agent"`
	Path      string            `json:"path"`
	Method    string            `json:"method"`
	Status    int32             `json:"status"`
	Latency   int64             `json:"latency_ms"`
	Metadata  map[string]string `json:"metadata"`
	Timestamp time.Time         `json:"timestamp"`
}
