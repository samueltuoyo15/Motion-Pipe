package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
)

type Template struct {
	ID          uuid.UUID      `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	Name        string         `json:"name" gorm:"not null"`
	Description string         `json:"description"`
	Thumbnail   string         `json:"thumbnail"`
	PreviewURL  string         `json:"preview_url"`
	SourceFile  string         `json:"-"` // S3 path to .aep or package
	Schema      datatypes.JSON `json:"schema" gorm:"type:jsonb"` // Input parameters definition
	IsPublic    bool           `json:"is_public" gorm:"default:false"`
	Price       float64        `json:"price" gorm:"default:0"`
	CreatedAt   time.Time      `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt   time.Time      `json:"updated_at" gorm:"autoUpdateTime"`
}

func (Template) TableName() string {
	return "templates"
}
