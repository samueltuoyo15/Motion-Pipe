package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
)

type Plan struct {
	ID          uuid.UUID      `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	Name        string         `json:"name" gorm:"not null"`
	Slug        string         `json:"slug" gorm:"uniqueIndex;not null"`
	Description string         `json:"description"`
	Price       float64        `json:"price" gorm:"default:0"`
	Currency    string         `json:"currency" gorm:"default:'NGN'"`
	Features    datatypes.JSON `json:"features" gorm:"type:jsonb"`
	IsActive    bool           `json:"is_active" gorm:"default:true"`
	CreatedAt   time.Time      `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt   time.Time      `json:"updated_at" gorm:"autoUpdateTime"`
}

func (Plan) TableName() string {
	return "plans"
}
