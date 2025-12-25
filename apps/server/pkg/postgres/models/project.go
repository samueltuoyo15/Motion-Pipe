package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
)

type ProjectStatus string

const (
	ProjectStatusDraft      ProjectStatus = "draft"
	ProjectStatusProcessing ProjectStatus = "processing"
	ProjectStatusCompleted  ProjectStatus = "completed"
	ProjectStatusFailed     ProjectStatus = "failed"
)

type Project struct {
	ID         uuid.UUID      `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	UserID     uuid.UUID      `json:"user_id" gorm:"type:uuid;not null;index"`
	User       User           `json:"user" gorm:"foreignKey:UserID"`
	TemplateID *uuid.UUID     `json:"template_id" gorm:"type:uuid;index"`
	Template   *Template      `json:"template" gorm:"foreignKey:TemplateID"`
	Name       string         `json:"name" gorm:"not null"`
	Status     ProjectStatus  `json:"status" gorm:"type:varchar(20);default:'draft'"`
	InputData  datatypes.JSON `json:"input_data" gorm:"type:jsonb"` // Values for template parameters
	OutputURL  string         `json:"output_url"`
	RenderID   string         `json:"render_id"` // External render job ID
	CreatedAt  time.Time      `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt  time.Time      `json:"updated_at" gorm:"autoUpdateTime"`
}

func (Project) TableName() string {
	return "projects"
}
