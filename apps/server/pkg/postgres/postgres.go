package postgres

import (
	"fmt"
	"time"

	"motion-pipe/config"
	"motion-pipe/pkg/logger"
	"motion-pipe/pkg/postgres/models"

	"go.uber.org/zap"
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

	models := []interface{}{
		&models.User{},
		&models.Asset{},
		&models.Template{},
		&models.Project{},
		&models.Subscription{},
		&models.Ticket{},
		&models.TicketMessage{},
	}

	for _, model := range models {
		if err := db.AutoMigrate(model); err != nil {
			return fmt.Errorf("failed to migrate model: %w", err)
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
