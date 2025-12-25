package redis

import (
	"context"
	"fmt"
	"time"

	"motion-pipe/pkg/logger"

	"go.uber.org/zap"
)

type TokenBlacklist struct {
	client *Client
}

func NewTokenBlacklist(client *Client) *TokenBlacklist {
	return &TokenBlacklist{client: client}
}

func (tb *TokenBlacklist) BlacklistToken(ctx context.Context, token string, expiration time.Duration) error {
	key := fmt.Sprintf("blacklist:token:%s", token)
	
	err := tb.client.Set(ctx, key, "1", expiration).Err()
	if err != nil {
		logger.Error("Failed to blacklist token", zap.Error(err))
		return fmt.Errorf("failed to blacklist token: %w", err)
	}

	logger.Info("Token blacklisted successfully",
		zap.String("token_prefix", token[:min(10, len(token))]),
		zap.Duration("expiration", expiration),
	)

	return nil
}

func (tb *TokenBlacklist) IsBlacklisted(ctx context.Context, token string) (bool, error) {
	key := fmt.Sprintf("blacklist:token:%s", token)
	
	exists, err := tb.client.Exists(ctx, key).Result()
	if err != nil {
		logger.Error("Failed to check token blacklist", zap.Error(err))
		return false, fmt.Errorf("failed to check blacklist: %w", err)
	}

	return exists > 0, nil
}

func (tb *TokenBlacklist) RemoveToken(ctx context.Context, token string) error {
	key := fmt.Sprintf("blacklist:token:%s", token)
	
	err := tb.client.Del(ctx, key).Err()
	if err != nil {
		logger.Error("Failed to remove token from blacklist", zap.Error(err))
		return fmt.Errorf("failed to remove token: %w", err)
	}

	return nil
}

func (tb *TokenBlacklist) BlacklistUserTokens(ctx context.Context, userID string, expiration time.Duration) error {
	key := fmt.Sprintf("blacklist:user:%s", userID)
	
	err := tb.client.Set(ctx, key, "1", expiration).Err()
	if err != nil {
		logger.Error("Failed to blacklist user tokens", zap.Error(err), zap.String("user_id", userID))
		return fmt.Errorf("failed to blacklist user tokens: %w", err)
	}

	logger.Info("User tokens blacklisted", zap.String("user_id", userID))
	return nil
}

func (tb *TokenBlacklist) IsUserBlacklisted(ctx context.Context, userID string) (bool, error) {
	key := fmt.Sprintf("blacklist:user:%s", userID)
	
	exists, err := tb.client.Exists(ctx, key).Result()
	if err != nil {
		logger.Error("Failed to check user blacklist", zap.Error(err))
		return false, fmt.Errorf("failed to check user blacklist: %w", err)
	}

	return exists > 0, nil
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
