package worker

import (
	"context"
	"encoding/json"

	"motion-pipe/pkg/email"
	"motion-pipe/pkg/logger"
	"motion-pipe/pkg/rabbitmq"

	"go.uber.org/zap"
)

const (
	WelcomeEmailQueue = "email.welcome"
)

type WelcomeEmailPayload struct {
	UserID string `json:"user_id"`
	Email  string `json:"email"`
	Name   string `json:"name"`
}

type EmailWorker struct {
	client       *rabbitmq.Client
	emailService *email.Service
}

func NewEmailWorker(client *rabbitmq.Client, emailService *email.Service) *EmailWorker {
	return &EmailWorker{
		client:       client,
		emailService: emailService,
	}
}

func (w *EmailWorker) Start(ctx context.Context) error {
	if err := w.client.DeclareQueue(WelcomeEmailQueue); err != nil {
		return err
	}

	msgs, err := w.client.Consume(WelcomeEmailQueue)
	if err != nil {
		return err
	}

	go func() {
		logger.Info("Started Email Worker")
		for {
			select {
			case <-ctx.Done():
				logger.Info("Stopping Email Worker")
				return
			case d, ok := <-msgs:
				if !ok {
					logger.Warn("RabbitMQ channel closed")
					return
				}

				var payload WelcomeEmailPayload
				if err := json.Unmarshal(d.Body, &payload); err != nil {
					logger.Error("Failed to unmarshal welcome email payload", zap.Error(err))
					d.Nack(false, false) 
					// Requeue set to false for now, maybe dead letter later
					continue
				}

				logger.Info("Processing welcome email job", zap.String("email", payload.Email))
				if err := w.emailService.SendWelcomeEmail(payload.Email, payload.Name); err != nil {
					logger.Error("Failed to send welcome email", zap.Error(err))
					d.Nack(false, true) 
					continue
				}

				d.Ack(false)
			}
		}
	}()

	return nil
}

func PublishWelcomeEmail(ctx context.Context, client *rabbitmq.Client, payload WelcomeEmailPayload) error {
	body, err := json.Marshal(payload)
	if err != nil {
		return err
	}
	return client.Publish(ctx, WelcomeEmailQueue, body)
}
