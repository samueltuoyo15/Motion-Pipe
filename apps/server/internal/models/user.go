package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID            uuid.UUID  `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	Email         string     `json:"email" gorm:"uniqueIndex;not null"`
	Name          string     `json:"name" gorm:"not null"`
	Avatar        string     `json:"avatar"`
	Provider      string     `json:"provider" gorm:"not null"`
	ProviderID    string     `json:"provider_id" gorm:"uniqueIndex:idx_provider_id;not null"`
	AccessToken   string     `json:"-" gorm:"type:text"`
	RefreshToken  string     `json:"-" gorm:"type:text"`
	TokenExpiry   *time.Time `json:"-"`
	EmailVerified bool       `json:"email_verified" gorm:"default:false"`
	IsActive      bool       `json:"is_active" gorm:"default:true"`
	LastLoginAt   *time.Time `json:"last_login_at"`
	CreatedAt     time.Time  `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt     time.Time  `json:"updated_at" gorm:"autoUpdateTime"`
}

func (User) TableName() string {
	return "users"
}

