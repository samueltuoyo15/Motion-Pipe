package service

import (
	"context"
	"time"

	"motion-pipe/pkg/logger"
	"motion-pipe/pkg/mongodb"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.uber.org/zap"
)

type AnalyticsService struct {
	client *mongodb.Client
}

func NewAnalyticsService(client *mongodb.Client) *AnalyticsService {
	return &AnalyticsService{client: client}
}

func (s *AnalyticsService) TrackEvent(ctx context.Context, event *mongodb.AnalyticsEvent) error {
	event.Timestamp = time.Now().UTC()

	collection := s.client.Database.Collection("events")
	_, err := collection.InsertOne(ctx, event)
	if err != nil {
		logger.Error("Failed to track event", zap.Error(err))
		return err
	}

	return nil
}

func (s *AnalyticsService) TrackLogin(ctx context.Context, userID, provider, ip, userAgent string) {
	event := &mongodb.AnalyticsEvent{
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

func (s *AnalyticsService) TrackLogout(ctx context.Context, userID, ip string) {
	event := &mongodb.AnalyticsEvent{
		Type:   "user_logout",
		UserID: userID,
		IP:     ip,
	}

	if err := s.TrackEvent(ctx, event); err != nil {
		logger.Error("Failed to track logout", zap.Error(err))
	}
}

func (s *AnalyticsService) TrackSignup(ctx context.Context, userID, provider, ip string) {
	event := &mongodb.AnalyticsEvent{
		Type:   "user_signup",
		UserID: userID,
		IP:     ip,
		Metadata: map[string]interface{}{
			"provider": provider,
		},
	}

	if err := s.TrackEvent(ctx, event); err != nil {
		logger.Error("Failed to track signup", zap.Error(err))
	}
}

func (s *AnalyticsService) TrackAPIRequest(ctx context.Context, userID, path, method, ip, userAgent string, status int, latency time.Duration) {
	event := &mongodb.AnalyticsEvent{
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

func (s *AnalyticsService) GetUserStats(ctx context.Context, userID string, from, to time.Time) (map[string]interface{}, error) {
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
		if id, ok := result["_id"].(string); ok {
			stats[id] = result["count"]
		}
	}

	return stats, nil
}

func (s *AnalyticsService) GetSystemStats(ctx context.Context) (map[string]interface{}, error) {
	collection := s.client.Database.Collection("events")
	stats := make(map[string]interface{})
	now := time.Now().UTC()
	last24h := now.Add(-24 * time.Hour)

	totalEvents, err := collection.EstimatedDocumentCount(ctx)
	if err != nil {
		return nil, err
	}
	stats["total_events"] = totalEvents

	errorCount, err := collection.CountDocuments(ctx, bson.M{
		"status": bson.M{"$gte": 500},
		"timestamp": bson.M{"$gte": last24h},
	})
	if err != nil {
		return nil, err
	}
	stats["errors_last_24h"] = errorCount

	activeUsersPipeline := []bson.M{
		{
			"$match": bson.M{
				"timestamp": bson.M{"$gte": last24h},
				"user_id":   bson.M{"$ne": ""},
			},
		},
		{
			"$group": bson.M{
				"_id": "$user_id",
			},
		},
		{
			"$count": "count",
		},
	}

	activeUsersCursor, err := collection.Aggregate(ctx, activeUsersPipeline)
	if err == nil {
		defer activeUsersCursor.Close(ctx)
		if activeUsersCursor.Next(ctx) {
			var result bson.M
			if err := activeUsersCursor.Decode(&result); err == nil {
				stats["active_users_24h"] = result["count"]
			}
		} else {
			stats["active_users_24h"] = 0
		}
	}

	apiVolumePipeline := []bson.M{
		{
			"$match": bson.M{
				"type": "api_request",
				"timestamp": bson.M{"$gte": last24h},
			},
		},
		{
			"$group": bson.M{
				"_id": nil,
				"avg_latency": bson.M{"$avg": "$latency_ms"},
				"total_requests": bson.M{"$sum": 1},
			},
		},
	}

	apiCursor, err := collection.Aggregate(ctx, apiVolumePipeline)
	if err == nil {
		defer apiCursor.Close(ctx)
		if apiCursor.Next(ctx) {
			var result bson.M
			if err := apiCursor.Decode(&result); err == nil {
				stats["requests_24h"] = result["total_requests"]
				stats["avg_latency_ms"] = result["avg_latency"]
			}
		}
	}

	return stats, nil
}
