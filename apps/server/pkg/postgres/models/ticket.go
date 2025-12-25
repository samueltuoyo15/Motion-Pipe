package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
)

type TicketStatus string

const (
	TicketStatusOpen    TicketStatus = "open"
	TicketStatusClosed  TicketStatus = "closed"
	TicketStatusPending TicketStatus = "pending"
)

type TicketPriority string

const (
	TicketPriorityLow    TicketPriority = "low"
	TicketPriorityMedium TicketPriority = "medium"
	TicketPriorityHigh   TicketPriority = "high"
)

type Ticket struct {
	ID            uuid.UUID       `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	UserID        uuid.UUID       `json:"user_id" gorm:"type:uuid;not null;index"`
	User          User            `json:"user" gorm:"foreignKey:UserID"`
	Subject       string          `json:"subject" gorm:"not null"`
	Status        TicketStatus    `json:"status" gorm:"type:varchar(20);default:'open'"`
	Priority      TicketPriority  `json:"priority" gorm:"type:varchar(20);default:'medium'"`
	ReferenceType string          `json:"reference_type"` 
	ReferenceID   string          `json:"reference_id"`  
	Messages      []TicketMessage `json:"messages" gorm:"foreignKey:TicketID"`
	CreatedAt     time.Time       `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt     time.Time       `json:"updated_at" gorm:"autoUpdateTime"`
}

type TicketMessage struct {
	ID          uuid.UUID      `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	TicketID    uuid.UUID      `json:"ticket_id" gorm:"type:uuid;not null;index"`
	SenderID    uuid.UUID      `json:"sender_id" gorm:"type:uuid;not null"`
	ReplyToID   *uuid.UUID     `json:"reply_to_id" gorm:"type:uuid"`
	ReplyTo     *TicketMessage `json:"reply_to" gorm:"foreignKey:ReplyToID"`
	Content     string         `json:"content" gorm:"type:text;not null"`
	Attachments datatypes.JSON `json:"attachments" gorm:"type:jsonb"`
	CreatedAt   time.Time      `json:"created_at" gorm:"autoCreateTime"`
}

func (Ticket) TableName() string {
	return "tickets"
}

func (TicketMessage) TableName() string {
	return "ticket_messages"
}
