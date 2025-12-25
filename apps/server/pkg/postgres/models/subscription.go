package models

import (
	"time"

	"github.com/google/uuid"
)

type SubscriptionStatus string

const (
	SubscriptionStatusActive   SubscriptionStatus = "active"
	SubscriptionStatusCanceled SubscriptionStatus = "canceled"
	SubscriptionStatusPastDue  SubscriptionStatus = "past_due"
	SubscriptionStatusTrialing SubscriptionStatus = "trialing"
)

type Subscription struct {
	ID                   uuid.UUID          `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	UserID               uuid.UUID          `json:"user_id" gorm:"type:uuid;not null;uniqueIndex"`
	User                 User               `json:"user" gorm:"foreignKey:UserID"`
	PaystackCustomerCode string             `json:"paystack_customer_code" gorm:"type:varchar(255);index"`
	PaystackSubCode      string             `json:"paystack_subscription_code" gorm:"type:varchar(255);index"`
	PaystackPlanCode     string             `json:"paystack_plan_code"` // E.g., "PLN_..."
	Status               SubscriptionStatus `json:"status" gorm:"type:varchar(20)"`
	CurrentPeriodEnd     time.Time          `json:"current_period_end"`
	PaystackAuthCode     string             `json:"paystack_auth_code"` // For recurring charges
	CreatedAt            time.Time          `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt            time.Time          `json:"updated_at" gorm:"autoUpdateTime"`
}

func (Subscription) TableName() string {
	return "subscriptions"
}
