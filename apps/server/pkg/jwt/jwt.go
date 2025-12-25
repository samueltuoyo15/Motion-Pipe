package jwt

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

var (
	ErrInvalidToken     = errors.New("invalid token")
	ErrExpiredToken     = errors.New("token has expired")
	ErrInvalidSignature = errors.New("invalid token signature")
)

type Claims struct {
	UserID   uuid.UUID `json:"user_id"`
	Email    string    `json:"email"`
	Provider string    `json:"provider"`
	jwt.RegisteredClaims
}

type TokenPair struct {
	AccessToken  string    `json:"access_token"`
	RefreshToken string    `json:"refresh_token"`
	ExpiresAt    time.Time `json:"expires_at"`
	TokenType    string    `json:"token_type"`
}

type Manager struct {
	secret            []byte
	accessExpiration  time.Duration
	refreshExpiration time.Duration
}

func NewManager(secret string, accessExp, refreshExp time.Duration) *Manager {
	return &Manager{
		secret:            []byte(secret),
		accessExpiration:  accessExp,
		refreshExpiration: refreshExp,
	}
}

func (m *Manager) GenerateTokenPair(userID uuid.UUID, email, provider string) (*TokenPair, error) {
	accessToken, expiresAt, err := m.generateToken(userID, email, provider, m.accessExpiration)
	if err != nil {
		return nil, err
	}

	refreshToken, _, err := m.generateToken(userID, email, provider, m.refreshExpiration)
	if err != nil {
		return nil, err
	}

	return &TokenPair{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		ExpiresAt:    expiresAt,
		TokenType:    "Bearer",
	}, nil
}

func (m *Manager) generateToken(userID uuid.UUID, email, provider string, expiration time.Duration) (string, time.Time, error) {
	now := time.Now()
	expiresAt := now.Add(expiration)

	claims := &Claims{
		UserID:   userID,
		Email:    email,
		Provider: provider,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiresAt),
			IssuedAt:  jwt.NewNumericDate(now),
			NotBefore: jwt.NewNumericDate(now),
			Issuer:    "motion-pipe",
			Subject:   userID.String(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(m.secret)
	if err != nil {
		return "", time.Time{}, err
	}

	return tokenString, expiresAt, nil
}

func (m *Manager) ValidateToken(tokenString string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, ErrInvalidSignature
		}
		return m.secret, nil
	})

	if err != nil {
		if errors.Is(err, jwt.ErrTokenExpired) {
			return nil, ErrExpiredToken
		}
		return nil, ErrInvalidToken
	}

	claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		return nil, ErrInvalidToken
	}

	return claims, nil
}

func (m *Manager) RefreshAccessToken(refreshToken string) (string, time.Time, error) {
	claims, err := m.ValidateToken(refreshToken)
	if err != nil {
		return "", time.Time{}, err
	}

	accessToken, expiresAt, err := m.generateToken(
		claims.UserID,
		claims.Email,
		claims.Provider,
		m.accessExpiration,
	)
	if err != nil {
		return "", time.Time{}, err
	}

	return accessToken, expiresAt, nil
}

func (m *Manager) ExtractClaims(tokenString string) (*Claims, error) {
	return m.ValidateToken(tokenString)
}
