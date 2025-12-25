package analytics

import (
	"context"
	"time"

	"motion-pipe/pkg/logger"
	"motion-pipe/pkg/mongodb"

	"go.mongodb.org/mongo-driver/bson"
	"go.uber.org/zap"
)

type Event struct {
	Type      string                 `bson:"type"`
	UserID    string                 `bson:"user_id,omitempty"`
	IP        string                 `bson:"ip"`
	UserAgent string                 `bson:"user_agent"`
	Path      string                 `bson:"path"`
	Method    string                 `bson:"method"`
	Status    int                    `bson:"status"`
	Latency   int64                  `bson:"latency_ms"`
	Metadata  map[string]interface{} `bson:"metadata,omitempty"`
	Timestamp time.Time              `bson:"timestamp"`
}

type Service struct {
	client *mongodb.Client
}

func NewAnalyticsService(client *mongodb.Client) *Service {
	return &Service{client: client}
}


func (s *Service) TrackEvent(ctx context.Context, event *Event) error {
	event.Timestamp = time.Now().UTC()

	collection := s.client.Database.Collection("events")
	_, err := collection.InsertOne(ctx, event)
	if err != nil {
		logger.Error("Failed to track event", zap.Error(err))
		return err
	}

	return nil
}

func (s *Service) TrackLogin(ctx context.Context, userID, provider, ip, userAgent string) {
	event := &Event{
		Type:      "user_login",
		UserID:    userID,
		IP:        ip,
		UserAgent: userAgent,
		Metadata: map[string]interface{}{
			"provider": provider,
		},
	}

	if err := s.TrackEvent(ctx, event); err != nil {
		logger.Error("Failed to track login", zap.Error(err))
	}
}

func (s *Service) TrackLogout(ctx context.Context, userID, ip string) {
	event := &Event{
		Type:   "user_logout",
		UserID: userID,
		IP:     ip,
	}

	if err := s.TrackEvent(ctx, event); err != nil {
		logger.Error("Failed to track logout", zap.Error(err))
	}
}

func (s *Service) TrackAPIRequest(ctx context.Context, userID, path, method, ip, userAgent string, status int, latency time.Duration) {
	event := &Event{
		Type:      "api_request",
		UserID:    userID,
		IP:        ip,
		UserAgent: userAgent,
		Path:      path,
		Method:    method,
		Status:    status,
		Latency:   latency.Milliseconds(),
	}

	if err := s.TrackEvent(ctx, event); err != nil {
		logger.Error("Failed to track API request", zap.Error(err))
	}
}

func (s *Service) GetUserStats(ctx context.Context, userID string, from, to time.Time) (map[string]interface{}, error) {
	collection := s.client.Database.Collection("events")

	pipeline := []bson.M{
		{
			"$match": bson.M{
				"user_id": userID,
				"timestamp": bson.M{
					"$gte": from,
					"$lte": to,
				},
			},
		},
		{
			"$group": bson.M{
				"_id":   "$type",
				"count": bson.M{"$sum": 1},
			},
		},
	}

	cursor, err := collection.Aggregate(ctx, pipeline)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	stats := make(map[string]interface{})
	for cursor.Next(ctx) {
		var result bson.M
		if err := cursor.Decode(&result); err != nil {
			continue
		}
		stats[result["_id"].(string)] = result["count"]
	}

	return stats, nil
}
