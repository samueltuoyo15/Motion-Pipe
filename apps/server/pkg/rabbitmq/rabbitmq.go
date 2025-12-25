package rabbitmq

import (
	"context"
	"fmt"
	"time"

	"motion-pipe/config"
	"motion-pipe/pkg/logger"

	amqp "github.com/rabbitmq/amqp091-go"
	"go.uber.org/zap"
)

type Client struct {
	conn    *amqp.Connection
	channel *amqp.Channel
	cfg     *config.Config
}

func NewClient(cfg *config.Config) (*Client, error) {
	// Retry connection logic
	var conn *amqp.Connection
	var err error

	for i := 0; i < 5; i++ {
		conn, err = amqp.Dial(cfg.RabbitMQ.URL)
		if err == nil {
			break
		}
		logger.Warn("Failed to connect to RabbitMQ, retrying...", zap.Error(err))
		time.Sleep(2 * time.Second)
	}

	if err != nil {
		return nil, fmt.Errorf("failed to connect to RabbitMQ: %w", err)
	}

	ch, err := conn.Channel()
	if err != nil {
		conn.Close()
		return nil, fmt.Errorf("failed to open a channel: %w", err)
	}

	logger.Info("Connected to RabbitMQ")
	return &Client{
		conn:    conn,
		channel: ch,
		cfg:     cfg,
	}, nil
}

func (c *Client) Close() {
	if c.channel != nil {
		c.channel.Close()
	}
	if c.conn != nil {
		c.conn.Close()
	}
}

func (c *Client) DeclareQueue(name string) error {
	_, err := c.channel.QueueDeclare(
		name,  // name
		true,  // durable
		false, // delete when unused
		false, // exclusive
		false, // no-wait
		nil,   // arguments
	)
	return err
}

func (c *Client) Publish(ctx context.Context, queueName string, body []byte) error {
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	return c.channel.PublishWithContext(
		ctx,
		"",        // exchange
		queueName, // routing key
		false,     // mandatory
		false,     // immediate
		amqp.Publishing{
			ContentType: "application/json",
			Body:        body,
		},
	)
}

func (c *Client) Consume(queueName string) (<-chan amqp.Delivery, error) {
	return c.channel.Consume(
		queueName,
		"",    // consumer
		false, // auto-ack
		false, // exclusive
		false, // no-local
		false, // no-wait
		nil,   // args
	)
}
