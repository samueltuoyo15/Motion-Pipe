package service

import (
	"context"
	"errors"
	"time"

	"motion-pipe/internal/repository"
	"motion-pipe/pkg/jwt"
	"motion-pipe/pkg/postgres/models"
	"motion-pipe/pkg/logger"
	"motion-pipe/pkg/redis"

	"github.com/google/uuid"
	"github.com/markbates/goth"
	"go.uber.org/zap"

	"motion-pipe/internal/worker"
	"motion-pipe/pkg/rabbitmq"
)

var (
	ErrAuthenticationFailed = errors.New("authentication failed")
	ErrInvalidCredentials   = errors.New("invalid credentials")
	ErrUserInactive         = errors.New("user account is inactive")
	ErrTokenBlacklisted     = errors.New("token has been blacklisted")
)

type AuthService interface {
	HandleOAuthCallback(ctx context.Context, gothUser goth.User) (*AuthResponse, error)
	RefreshToken(ctx context.Context, refreshToken string) (*jwt.TokenPair, error)
	Logout(ctx context.Context, token string, expiration time.Duration) error
	ValidateToken(ctx context.Context, token string) (*models.User, error)
}

type AuthResponse struct {
	User   *models.User   `json:"user"`
	Tokens *jwt.TokenPair `json:"tokens"`
}

type authService struct {
	userRepo     repository.UserRepository
	blacklist    *redis.TokenBlacklist
	jwtManager   *jwt.Manager
	rabbitClient *rabbitmq.Client
}

func NewAuthService(
	userRepo repository.UserRepository,
	blacklist *redis.TokenBlacklist,
	jwtManager *jwt.Manager,
	rabbitClient *rabbitmq.Client,
) AuthService {
	return &authService{
		userRepo:     userRepo,
		blacklist:    blacklist,
		jwtManager:   jwtManager,
		rabbitClient: rabbitClient,
	}
}

func (s *authService) HandleOAuthCallback(
	ctx context.Context,
	gothUser goth.User,
) (*AuthResponse, error) {
	logger.Info("Processing OAuth callback",
		zap.String("provider", gothUser.Provider),
		zap.String("email", gothUser.Email),
	)

	user, err := s.userRepo.GetByProviderID(ctx, gothUser.Provider, gothUser.UserID)
	if err != nil && !errors.Is(err, repository.ErrUserNotFound) {
		logger.Error("Failed to fetch user by provider ID", zap.Error(err))
		return nil, err
	}

	if user == nil {
		user, err = s.createUserFromOAuth(ctx, gothUser)
		if err != nil {
			logger.Error("Failed to create user from OAuth", zap.Error(err))
			return nil, err
		}
		logger.Info("Created new user", zap.String("user_id", user.ID.String()))

		payload := worker.WelcomeEmailPayload{
			UserID: user.ID.String(),
			Email:  user.Email,
			Name:   user.Name,
		}
		if err := worker.PublishWelcomeEmail(ctx, s.rabbitClient, payload); err != nil {
			logger.Error("Failed to publish welcome email event", zap.Error(err))
		}
	} else {
		if err := s.updateUserFromOAuth(ctx, user, gothUser); err != nil {
			logger.Error("Failed to update user from OAuth", zap.Error(err))
			return nil, err
		}
		logger.Info("Updated existing user", zap.String("user_id", user.ID.String()))
	}

	if !user.IsActive {
		logger.Warn("Inactive user attempted login", zap.String("user_id", user.ID.String()))
		return nil, ErrUserInactive
	}

	if err := s.userRepo.UpdateLastLogin(ctx, user.ID); err != nil {
		logger.Error("Failed to update last login", zap.Error(err))
	}

	tokens, err := s.jwtManager.GenerateTokenPair(user.ID, user.Email, user.Provider)
	if err != nil {
		logger.Error("Failed to generate tokens", zap.Error(err))
		return nil, err
	}

	logger.Info("User authenticated successfully",
		zap.String("user_id", user.ID.String()),
		zap.String("provider", user.Provider),
	)

	return &AuthResponse{
		User:   user,
		Tokens: tokens,
	}, nil
}

func (s *authService) createUserFromOAuth(ctx context.Context, gothUser goth.User) (*models.User, error) {
	var tokenExpiry *time.Time
	if !gothUser.ExpiresAt.IsZero() {
		tokenExpiry = &gothUser.ExpiresAt
	}

	user := &models.User{
		Email:         gothUser.Email,
		Name:          gothUser.Name,
		Avatar:        gothUser.AvatarURL,
		Provider:      gothUser.Provider,
		ProviderID:    gothUser.UserID,
		AccessToken:   gothUser.AccessToken,
		RefreshToken:  gothUser.RefreshToken,
		TokenExpiry:   tokenExpiry,
		EmailVerified: true,
		IsActive:      true,
	}

	if err := s.userRepo.Create(ctx, user); err != nil {
		return nil, err
	}

	return user, nil
}

func (s *authService) updateUserFromOAuth(ctx context.Context, user *models.User, gothUser goth.User) error {
	var tokenExpiry *time.Time
	if !gothUser.ExpiresAt.IsZero() {
		tokenExpiry = &gothUser.ExpiresAt
	}

	user.Name = gothUser.Name
	user.Avatar = gothUser.AvatarURL
	user.AccessToken = gothUser.AccessToken
	user.RefreshToken = gothUser.RefreshToken
	user.TokenExpiry = tokenExpiry

	return s.userRepo.Update(ctx, user)
}

func (s *authService) RefreshToken(ctx context.Context, refreshToken string) (*jwt.TokenPair, error) {
	logger.Info("Refreshing access token")

	isBlacklisted, err := s.blacklist.IsBlacklisted(ctx, refreshToken)
	if err != nil {
		logger.Error("Failed to check token blacklist", zap.Error(err))
		return nil, err
	}

	if isBlacklisted {
		logger.Warn("Attempted to use blacklisted refresh token")
		return nil, ErrTokenBlacklisted
	}

	claims, err := s.jwtManager.ValidateToken(refreshToken)
	if err != nil {
		logger.Error("Invalid refresh token", zap.Error(err))
		return nil, ErrInvalidCredentials
	}

	isUserBlacklisted, err := s.blacklist.IsUserBlacklisted(ctx, claims.UserID.String())
	if err != nil {
		logger.Error("Failed to check user blacklist", zap.Error(err))
		return nil, err
	}

	if isUserBlacklisted {
		logger.Warn("User tokens are blacklisted", zap.String("user_id", claims.UserID.String()))
		return nil, ErrTokenBlacklisted
	}

	user, err := s.userRepo.GetByID(ctx, claims.UserID)
	if err != nil {
		logger.Error("User not found for refresh token", zap.Error(err))
		return nil, ErrAuthenticationFailed
	}

	if !user.IsActive {
		logger.Warn("Inactive user attempted token refresh", zap.String("user_id", user.ID.String()))
		return nil, ErrUserInactive
	}

	tokens, err := s.jwtManager.GenerateTokenPair(user.ID, user.Email, user.Provider)
	if err != nil {
		logger.Error("Failed to generate new tokens", zap.Error(err))
		return nil, err
	}

	logger.Info("Token refreshed successfully", zap.String("user_id", user.ID.String()))
	return tokens, nil
}

func (s *authService) Logout(ctx context.Context, token string, expiration time.Duration) error {
	logger.Info("Processing logout")

	if err := s.blacklist.BlacklistToken(ctx, token, expiration); err != nil {
		logger.Error("Failed to blacklist token", zap.Error(err))
		return err
	}

	logger.Info("User logged out successfully")
	return nil
}

func (s *authService) ValidateToken(ctx context.Context, token string) (*models.User, error) {
	isBlacklisted, err := s.blacklist.IsBlacklisted(ctx, token)
	if err != nil {
		logger.Error("Failed to check token blacklist", zap.Error(err))
		return nil, err
	}

	if isBlacklisted {
		return nil, ErrTokenBlacklisted
	}

	claims, err := s.jwtManager.ValidateToken(token)
	if err != nil {
		return nil, ErrInvalidCredentials
	}

	isUserBlacklisted, err := s.blacklist.IsUserBlacklisted(ctx, claims.UserID.String())
	if err != nil {
		logger.Error("Failed to check user blacklist", zap.Error(err))
		return nil, err
	}

	if isUserBlacklisted {
		return nil, ErrTokenBlacklisted
	}

	user, err := s.userRepo.GetByID(ctx, claims.UserID)
	if err != nil {
		return nil, ErrAuthenticationFailed
	}

	if !user.IsActive {
		return nil, ErrUserInactive
	}

	return user, nil
}
