package service

import (
	"context"
	"time"

	"motion-pipe/pkg/clickhouse"
	"motion-pipe/pkg/logger"

	"go.uber.org/zap"
)

type AnalyticsService struct {
	client *clickhouse.Client
}

func NewAnalyticsService(client *clickhouse.Client) *AnalyticsService {
	return &AnalyticsService{client: client}
}

func (s *AnalyticsService) TrackEvent(ctx context.Context, event *clickhouse.AnalyticsEvent) error {
	event.Timestamp = time.Now().UTC()

	query := `
	INSERT INTO events (
		type, user_id, ip, user_agent, path, method, status, latency_ms, metadata, timestamp
	) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`

	err := s.client.Conn.Exec(ctx, query,
		event.Type,
		event.UserID,
		event.IP,
		event.UserAgent,
		event.Path,
		event.Method,
		event.Status,
		event.Latency,
		event.Metadata,
		event.Timestamp,
	)

	if err != nil {
		logger.Error("Failed to track event in ClickHouse", zap.Error(err))
		return err
	}

	return nil
}

func (s *AnalyticsService) TrackLogin(ctx context.Context, userID, provider, ip, userAgent string) {
	event := &clickhouse.AnalyticsEvent{
		Type:      "user_login",
		UserID:    userID,
		IP:        ip,
		UserAgent: userAgent,
		Metadata: map[string]string{
			"provider": provider,
		},
	}

	if err := s.TrackEvent(ctx, event); err != nil {
		logger.Error("Failed to track login", zap.Error(err))
	}
}

func (s *AnalyticsService) TrackLogout(ctx context.Context, userID, ip string) {
	event := &clickhouse.AnalyticsEvent{
		Type:   "user_logout",
		UserID: userID,
		IP:     ip,
	}

	if err := s.TrackEvent(ctx, event); err != nil {
		logger.Error("Failed to track logout", zap.Error(err))
	}
}

func (s *AnalyticsService) TrackSignup(ctx context.Context, userID, provider, ip string) {
	event := &clickhouse.AnalyticsEvent{
		Type:   "user_signup",
		UserID: userID,
		IP:     ip,
		Metadata: map[string]string{
			"provider": provider,
		},
	}

	if err := s.TrackEvent(ctx, event); err != nil {
		logger.Error("Failed to track signup", zap.Error(err))
	}
}

func (s *AnalyticsService) TrackAPIRequest(ctx context.Context, userID, path, method, ip, userAgent string, status int, latency time.Duration) {
	event := &clickhouse.AnalyticsEvent{
		Type:      "api_request",
		UserID:    userID,
		IP:        ip,
		UserAgent: userAgent,
		Path:      path,
		Method:    method,
		Status:    int32(status),
		Latency:   latency.Milliseconds(),
	}

	if err := s.TrackEvent(ctx, event); err != nil {
		logger.Error("Failed to track API request", zap.Error(err))
	}
}

func (s *AnalyticsService) GetUserStats(ctx context.Context, userID string, from, to time.Time) (map[string]interface{}, error) {
	query := `
	SELECT type, count() as count
	FROM events
	WHERE user_id = ? AND timestamp >= ? AND timestamp <= ?
	GROUP BY type
	`

	rows, err := s.client.Conn.Query(ctx, query, userID, from, to)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	stats := make(map[string]interface{})
	for rows.Next() {
		var (
			eventType string
			count     uint64
		)
		if err := rows.Scan(&eventType, &count); err != nil {
			continue
		}
		stats[eventType] = count
	}

	return stats, nil
}

func (s *AnalyticsService) GetSystemStats(ctx context.Context) (map[string]interface{}, error) {
	stats := make(map[string]interface{})
	now := time.Now().UTC()
	last24h := now.Add(-24 * time.Hour)

	var totalEvents uint64
	if err := s.client.Conn.QueryRow(ctx, "SELECT count() FROM events").Scan(&totalEvents); err != nil {
		return nil, err
	}
	stats["total_events"] = totalEvents

	var errorCount uint64
	if err := s.client.Conn.QueryRow(ctx, "SELECT count() FROM events WHERE status >= 500 AND timestamp >= ?", last24h).Scan(&errorCount); err != nil {
		return nil, err
	}
	stats["errors_last_24h"] = errorCount

	var activeUsers uint64
	if err := s.client.Conn.QueryRow(ctx, "SELECT count(DISTINCT user_id) FROM events WHERE timestamp >= ? AND user_id != ''", last24h).Scan(&activeUsers); err != nil {
		stats["active_users_24h"] = 0
	} else {
		stats["active_users_24h"] = activeUsers
	}

	var totalRequests uint64
	var avgLatency float64
	query := "SELECT count(), avg(latency_ms) FROM events WHERE type = 'api_request' AND timestamp >= ?"
	if err := s.client.Conn.QueryRow(ctx, query, last24h).Scan(&totalRequests, &avgLatency); err == nil {
		stats["requests_24h"] = totalRequests
		stats["avg_latency_ms"] = avgLatency
	}

	return stats, nil
}
