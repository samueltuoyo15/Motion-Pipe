package models

import (
	"time"

	"github.com/google/uuid"
)

type AssetType string

const (
	AssetTypeImage AssetType = "image"
	AssetTypeVideo AssetType = "video"
	AssetTypeAudio AssetType = "audio"
)

type Asset struct {
	ID        uuid.UUID `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	UserID    uuid.UUID `json:"user_id" gorm:"type:uuid;not null;index"`
	User      User      `json:"user" gorm:"foreignKey:UserID"`
	Name      string    `json:"name" gorm:"not null"`
	Type      AssetType `json:"type" gorm:"type:varchar(20);not null"`
	URL       string    `json:"url" gorm:"not null"`
	S3Key     string    `json:"s3_key" gorm:"not null"`
	MimeType  string    `json:"mime_type"`
	Size      int64     `json:"size"` // in bytes
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}

func (Asset) TableName() string {
	return "assets"
}
