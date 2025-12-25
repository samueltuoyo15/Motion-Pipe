package mongodb

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AnalyticsEvent struct {
	ID        primitive.ObjectID     `bson:"_id,omitempty" json:"id"`
	Type      string                 `bson:"type" json:"type"`
	UserID    string                 `bson:"user_id,omitempty" json:"user_id,omitempty"`
	IP        string                 `bson:"ip" json:"ip"`
	UserAgent string                 `bson:"user_agent" json:"user_agent"`
	Path      string                 `bson:"path" json:"path"`
	Method    string                 `bson:"method" json:"method"`
	Status    int                    `bson:"status" json:"status"`
	Latency   int64                  `bson:"latency_ms" json:"latency_ms"`
	Metadata  map[string]interface{} `bson:"metadata,omitempty" json:"metadata,omitempty"`
	Timestamp time.Time              `bson:"timestamp" json:"timestamp"`
}
