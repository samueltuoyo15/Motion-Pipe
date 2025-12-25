package postgres

import (
	"fmt"
	"time"

	"motion-pipe/config"
	"motion-pipe/pkg/logger"
	"motion-pipe/pkg/postgres/models"

	"go.uber.org/zap"
	"gorm.io/datatypes"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	gormlogger "gorm.io/gorm/logger"
)

func Connect(cfg *config.Config) (*gorm.DB, error) {
	logLevel := gormlogger.Silent
	if cfg.IsDevelopment() {
		logLevel = gormlogger.Info
	}

	db, err := gorm.Open(postgres.Open(cfg.GetDSN()), &gorm.Config{
		Logger: gormlogger.Default.LogMode(logLevel),
		NowFunc: func() time.Time {
			return time.Now().UTC()
		},
	})

	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("failed to get database instance: %w", err)
	}

	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	logger.Info("Database connected successfully")
	return db, nil
}

func Migrate(db *gorm.DB) error {
	logger.Info("Running database migrations")

	if err := db.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"").Error; err != nil {
		logger.Warn("Failed to create uuid-ossp extension", zap.Error(err))
	}

	modelsList := []interface{}{
		&models.User{},
		&models.Asset{},
		&models.Template{},
		&models.Project{},
		&models.Subscription{},
		&models.Ticket{},
		&models.TicketMessage{},
		&models.Plan{},
	}

	for _, model := range modelsList {
		if err := db.AutoMigrate(model); err != nil {
			return fmt.Errorf("failed to migrate model: %w", err)
		}
	}

	plans := []models.Plan{
		{
			Name:        "Pay-As-You-Go",
			Slug:        "pay-as-you-go",
			Description: "For agencies & brands",
			Price:       10000,
			Currency:    "NGN",
			Features:    datatypes.JSON([]byte(`["4K Broadcast Quality", "AI Voiceover (ElevenLabs)", "No Watermark", "Escrow Protection"]`)),
			IsActive:    true,
		},
		{
			Name:        "Enterprise",
			Slug:        "enterprise",
			Description: "High volume infrastructure",
			Price:       0,
			Currency:    "NGN",
			Features:    datatypes.JSON([]byte(`["Dedicated GPU Instances", "Custom Brand Models", "SLA & Support"]`)),
			IsActive:    true,
		},
	}

	for _, p := range plans {
		if err := db.Where(models.Plan{Slug: p.Slug}).FirstOrCreate(&p).Error; err != nil {
			logger.Warn("Failed to seed plan", zap.String("slug", p.Slug), zap.Error(err))
		}
	}

	logger.Info("Database migrations completed successfully")
	return nil
}

func Close(db *gorm.DB) error {
	sqlDB, err := db.DB()
	if err != nil {
		return err
	}
	return sqlDB.Close()
}
