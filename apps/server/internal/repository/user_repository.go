package repository

import (
	"context"
	"errors"
	"time"

	"motion-pipe/pkg/postgres/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

var (
	ErrUserNotFound      = errors.New("user not found")
	ErrUserAlreadyExists = errors.New("user already exists")
	ErrInvalidUserData   = errors.New("invalid user data")
)

type UserRepository interface {
	Create(ctx context.Context, user *models.User) error
	GetByID(ctx context.Context, id uuid.UUID) (*models.User, error)
	GetByEmail(ctx context.Context, email string) (*models.User, error)
	GetByProviderID(ctx context.Context, provider, providerID string) (*models.User, error)
	Update(ctx context.Context, user *models.User) error
	UpdateLastLogin(ctx context.Context, id uuid.UUID) error
	Delete(ctx context.Context, id uuid.UUID) error
	List(ctx context.Context, limit, offset int) ([]*models.User, error)
	Count(ctx context.Context) (int64, error)
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) Create(ctx context.Context, user *models.User) error {
	if user == nil {
		return ErrInvalidUserData
	}

	if user.Email == "" || user.Provider == "" || user.ProviderID == "" {
		return ErrInvalidUserData
	}

	result := r.db.WithContext(ctx).Create(user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrDuplicatedKey) {
			return ErrUserAlreadyExists
		}
		return result.Error
	}

	return nil
}

func (r *userRepository) GetByID(ctx context.Context, id uuid.UUID) (*models.User, error) {
	var user models.User
	result := r.db.WithContext(ctx).Where("id = ? AND is_active = ?", id, true).First(&user)
	
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, ErrUserNotFound
		}
		return nil, result.Error
	}

	return &user, nil
}

func (r *userRepository) GetByEmail(ctx context.Context, email string) (*models.User, error) {
	var user models.User
	result := r.db.WithContext(ctx).Where("email = ? AND is_active = ?", email, true).First(&user)
	
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, ErrUserNotFound
		}
		return nil, result.Error
	}

	return &user, nil
}

func (r *userRepository) GetByProviderID(ctx context.Context, provider, providerID string) (*models.User, error) {
	var user models.User
	result := r.db.WithContext(ctx).Where(
		"provider = ? AND provider_id = ? AND is_active = ?",
		provider, providerID, true,
	).First(&user)
	
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, ErrUserNotFound
		}
		return nil, result.Error
	}

	return &user, nil
}

func (r *userRepository) Update(ctx context.Context, user *models.User) error {
	if user == nil || user.ID == uuid.Nil {
		return ErrInvalidUserData
	}

	result := r.db.WithContext(ctx).Model(user).Updates(user)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return ErrUserNotFound
	}

	return nil
}

func (r *userRepository) UpdateLastLogin(ctx context.Context, id uuid.UUID) error {
	now := time.Now()
	result := r.db.WithContext(ctx).Model(&models.User{}).
		Where("id = ?", id).
		Update("last_login_at", now)

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return ErrUserNotFound
	}

	return nil
}

func (r *userRepository) Delete(ctx context.Context, id uuid.UUID) error {
	result := r.db.WithContext(ctx).Model(&models.User{}).
		Where("id = ?", id).
		Update("is_active", false)

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return ErrUserNotFound
	}

	return nil
}

func (r *userRepository) List(ctx context.Context, limit, offset int) ([]*models.User, error) {
	var users []*models.User
	result := r.db.WithContext(ctx).
		Where("is_active = ?", true).
		Limit(limit).
		Offset(offset).
		Order("created_at DESC").
		Find(&users)

	if result.Error != nil {
		return nil, result.Error
	}

	return users, nil
}

func (r *userRepository) Count(ctx context.Context) (int64, error) {
	var count int64
	result := r.db.WithContext(ctx).Model(&models.User{}).
		Where("is_active = ?", true).
		Count(&count)

	if result.Error != nil {
		return 0, result.Error
	}

	return count, nil
}
