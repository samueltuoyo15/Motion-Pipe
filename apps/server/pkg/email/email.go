package email

import (
	"bytes"
	"fmt"
	"html/template"

	"motion-pipe/config"
	"motion-pipe/pkg/logger"

	"go.uber.org/zap"
	gomail "gopkg.in/gomail.v2"
)

type Service struct {
	dialer *gomail.Dialer
	config *config.Config
}

func NewService(cfg *config.Config) *Service {
	dialer := gomail.NewDialer(
		cfg.Email.SMTPHost,
		cfg.Email.SMTPPort,
		cfg.Email.SMTPUser,
		cfg.Email.SMTPPassword,
	)

	return &Service{
		dialer: dialer,
		config: cfg,
	}
}

type WelcomeEmailData struct {
	Name string
	URL  string
}

const welcomeEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #3b82f6; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
        .button { display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 20px; font-size: 0.8em; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Motion Pipe!</h1>
        </div>
        <div class="content">
            <p>Hi {{.Name}},</p>
            <p>We're thrilled to have you on board! Motion Pipe is your go-to platform for generating amazing motion designs without the hassle.</p>
            <p>Get started by exploring our dashboard:</p>
            <div style="text-align: center;">
                <a href="{{.URL}}" class="button">Go to Dashboard</a>
            </div>
            <p>If you have any questions, feel free to reply to this email.</p>
            <p>Cheers,<br>The Motion Pipe Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Motion Pipe. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`

func (s *Service) SendWelcomeEmail(toEmail, name string) error {
	tmpl, err := template.New("welcome").Parse(welcomeEmailTemplate)
	if err != nil {
		return fmt.Errorf("failed to parse welcome email template: %w", err)
	}

	data := WelcomeEmailData{
		Name: name,
		URL:  s.config.Server.FrontendURL + "/dashboard",
	}

	var body bytes.Buffer
	if err := tmpl.Execute(&body, data); err != nil {
		return fmt.Errorf("failed to execute welcome email template: %w", err)
	}

	m := gomail.NewMessage()
	m.SetHeader("From", fmt.Sprintf("%s <%s>", s.config.Email.FromName, s.config.Email.FromEmail))
	m.SetHeader("To", toEmail)
	m.SetHeader("Subject", "Welcome to Motion Pipe! 🚀")
	m.SetBody("text/html", body.String())

	if err := s.dialer.DialAndSend(m); err != nil {
		logger.Error("Failed to send welcome email", zap.String("to", toEmail), zap.Error(err))
		return err
	}

	logger.Info("Welcome email sent successfully", zap.String("to", toEmail))
	return nil
}
