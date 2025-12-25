package config

import (
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	Server    ServerConfig
	Database  DatabaseConfig
	Redis     RedisConfig
	ClickHouse ClickHouseConfig
	RabbitMQ  RabbitMQConfig
	Email     EmailConfig
	Cloudinary CloudinaryConfig
	Paystack  PaystackConfig
	JWT       JWTConfig
	OAuth     OAuthConfig
	Session   SessionConfig
	RateLimit RateLimitConfig
	Logging   LoggingConfig
}

type ServerConfig struct {
	Port       string
	Env        string
	APIVersion string
	FrontendURL string
	AllowedOrigins []string
}

type DatabaseConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	DBName   string
	SSLMode  string
}

type RedisConfig struct {
	Host     string
	Port     string
	Password string
	DB       int
}

type ClickHouseConfig struct {
	Addr     string
	Database string
	Username string
	Password string
}

type RabbitMQConfig struct {
	URL string
}

type EmailConfig struct {
	SMTPHost     string
	SMTPPort     int
	SMTPUser     string
	SMTPPassword string
	FromEmail    string
	FromName     string
}

type CloudinaryConfig struct {
	CloudName    string
	APIKey       string
	APISecret    string
	UploadPreset string
}

type PaystackConfig struct {
	SecretKey string
	PublicKey string
}

type JWTConfig struct {
	Secret            string
	Expiration        time.Duration
	RefreshExpiration time.Duration
}

type OAuthConfig struct {
	Google  OAuthProvider
	Twitter OAuthProvider
}

type OAuthProvider struct {
	ClientID     string
	ClientSecret string
	CallbackURL  string
}

type SessionConfig struct {
	Secret string
	MaxAge int
}

type RateLimitConfig struct {
	Requests int
	Duration time.Duration
}

type LoggingConfig struct {
	Level  string
	Output string
}

func Load() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		fmt.Println("Warning: .env file not found, using environment variables")
	}

	jwtExp, err := time.ParseDuration(getEnv("JWT_EXPIRATION", "24h"))
	if err != nil {
		return nil, fmt.Errorf("invalid JWT_EXPIRATION: %w", err)
	}

	jwtRefreshExp, err := time.ParseDuration(getEnv("JWT_REFRESH_EXPIRATION", "168h"))
	if err != nil {
		return nil, fmt.Errorf("invalid JWT_REFRESH_EXPIRATION: %w", err)
	}

	rateLimitDuration, err := time.ParseDuration(getEnv("RATE_LIMIT_DURATION", "1m"))
	if err != nil {
		return nil, fmt.Errorf("invalid RATE_LIMIT_DURATION: %w", err)
	}

	sessionMaxAge, err := strconv.Atoi(getEnv("SESSION_MAX_AGE", "86400"))
	if err != nil {
		return nil, fmt.Errorf("invalid SESSION_MAX_AGE: %w", err)
	}

	rateLimitRequests, err := strconv.Atoi(getEnv("RATE_LIMIT_REQUESTS", "100"))
	if err != nil {
		return nil, fmt.Errorf("invalid RATE_LIMIT_REQUESTS: %w", err)
	}

	redisDB, err := strconv.Atoi(getEnv("REDIS_DB", "0"))
	if err != nil {
		return nil, fmt.Errorf("invalid REDIS_DB: %w", err)
	}

	config := &Config{
		Server: ServerConfig{
			Port:           getEnv("PORT", "8080"),
			Env:            getEnv("ENV", "development"),
			APIVersion:     getEnv("API_VERSION", "v1"),
			FrontendURL:    getEnv("FRONTEND_URL", "http://localhost:3000"),
			AllowedOrigins: parseAllowedOrigins(getEnv("ALLOWED_ORIGINS", "http://localhost:3000")),
		},
		Database: DatabaseConfig{
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnv("DB_PORT", "5432"),
			User:     getEnv("DB_USER", "postgres"),
			Password: getEnv("DB_PASSWORD", ""),
			DBName:   getEnv("DB_NAME", "motion_pipe"),
			SSLMode:  getEnv("DB_SSL_MODE", "disable"),
		},
		Redis: RedisConfig{
			Host:     getEnv("REDIS_HOST", "localhost"),
			Port:     getEnv("REDIS_PORT", "6379"),
			Password: getEnv("REDIS_PASSWORD", ""),
			DB:       redisDB,
		},
		ClickHouse: ClickHouseConfig{
			Addr:     getEnv("CLICKHOUSE_ADDR", "localhost:9000"),
			Database: getEnv("CLICKHOUSE_DATABASE", "motion_pipe_analytics"),
			Username: getEnv("CLICKHOUSE_USER", "default"),
			Password: getEnv("CLICKHOUSE_PASSWORD", ""),
		},
		RabbitMQ: RabbitMQConfig{
			URL: getEnv("RABBITMQ_URL", "amqp://guest:guest@localhost:5672/"),
		},
		Email: EmailConfig{
			SMTPHost:     getEnv("SMTP_HOST", "smtp.gmail.com"),
			SMTPPort:     getEnvAsInt("SMTP_PORT", 587),
			SMTPUser:     getEnv("SMTP_USER", ""),
			SMTPPassword: getEnv("SMTP_PASSWORD", ""),
			FromEmail:    getEnv("EMAIL_FROM_ADDRESS", "motionpipehq@gmail.com"),
			FromName:     getEnv("EMAIL_FROM_NAME", "Motion Pipe"),
		},
		Cloudinary: CloudinaryConfig{
			CloudName:    getEnv("CLOUDINARY_CLOUD_NAME", ""),
			APIKey:       getEnv("CLOUDINARY_API_KEY", ""),
			APISecret:    getEnv("CLOUDINARY_API_SECRET", ""),
			UploadPreset: getEnv("CLOUDINARY_UPLOAD_PRESET", "ml_default"),
		},
		Paystack: PaystackConfig{
			SecretKey: getEnv("PAYSTACK_SECRET_KEY", ""),
			PublicKey: getEnv("PAYSTACK_PUBLIC_KEY", ""),
		},
		JWT: JWTConfig{
			Secret:            getEnv("JWT_SECRET", ""),
			Expiration:        jwtExp,
			RefreshExpiration: jwtRefreshExp,
		},
		OAuth: OAuthConfig{
			Google: OAuthProvider{
				ClientID:     getEnv("GOOGLE_CLIENT_ID", ""),
				ClientSecret: getEnv("GOOGLE_CLIENT_SECRET", ""),
				CallbackURL:  getEnv("GOOGLE_CALLBACK_URL", ""),
			},
			Twitter: OAuthProvider{
				ClientID:     getEnv("TWITTER_CLIENT_ID", ""),
				ClientSecret: getEnv("TWITTER_CLIENT_SECRET", ""),
				CallbackURL:  getEnv("TWITTER_CALLBACK_URL", ""),
			},
		},
		Session: SessionConfig{
			Secret: getEnv("SESSION_SECRET", ""),
			MaxAge: sessionMaxAge,
		},
		RateLimit: RateLimitConfig{
			Requests: rateLimitRequests,
			Duration: rateLimitDuration,
		},
		Logging: LoggingConfig{
			Level:  getEnv("LOG_LEVEL", "info"),
			Output: getEnv("LOG_OUTPUT", "stdout"),
		},
	}

	if err := config.Validate(); err != nil {
		return nil, err
	}

	return config, nil
}

func (c *Config) Validate() error {
	if c.JWT.Secret == "" {
		return fmt.Errorf("JWT_SECRET is required")
	}

	if c.Session.Secret == "" {
		return fmt.Errorf("SESSION_SECRET is required")
	}

	if c.OAuth.Google.ClientID == "" || c.OAuth.Google.ClientSecret == "" {
		return fmt.Errorf("Google OAuth credentials are required")
	}

	if c.OAuth.Twitter.ClientID == "" || c.OAuth.Twitter.ClientSecret == "" {
		return fmt.Errorf("Twitter OAuth credentials are required")
	}

	return nil
}

func (c *Config) IsDevelopment() bool {
	return c.Server.Env == "development"
}

func (c *Config) IsProduction() bool {
	return c.Server.Env == "production"
}

func (c *Config) GetDSN() string {
	return fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		c.Database.Host,
		c.Database.Port,
		c.Database.User,
		c.Database.Password,
		c.Database.DBName,
		c.Database.SSLMode,
	)
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvAsInt(key string, defaultValue int) int {
	valueStr := getEnv(key, "")
	if valueStr == "" {
		return defaultValue
	}
	value, err := strconv.Atoi(valueStr)
	if err != nil {
		return defaultValue
	}
	return value
}

func parseAllowedOrigins(origins string) []string {
	if origins == "" {
		return []string{}
	}
	
	var result []string
	current := ""
	for _, char := range origins {
		if char == ',' {
			if current != "" {
				result = append(result, current)
				current = ""
			}
		} else {
			current += string(char)
		}
	}
	if current != "" {
		result = append(result, current)
	}
	return result
}
