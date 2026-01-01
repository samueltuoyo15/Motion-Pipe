package repositories

import (
	"context"
	"errors"
	"motion-pipe/pkg/entities"

	"github.com/jackc/pgx/v5/pgxpool"
)

type AccountRepository struct {
	DB *pgxpool.Pool
}

func NewAccountRepository(db *pgxpool.Pool) *AccountRepository {
	return &AccountRepository{DB: db}
}

func (accountRepo *AccountRepository) Register(ctx context.Context, account *entities.Account) error {
	query := `
	INSERT INTO accounts (name, email, provider, provider_id, created_at, updated_at
	VALUES ($1, $2, $3, $4, now(), now())
	RETURNING id, created_at, updated_at
	`

	err := accountRepo.DB.QueryRow(ctx, query, account.Name, account.Email, account.Provider, account.ProviderID).Scan(&account.ID, &account.CreatedAt, &account.UpdatedAt)

	return err
}

func (accountRepo *AccountRepository) GetAccountByProviderID(ctx context.Context, provider, providerID string) (*entities.Account, error) {
	query := `
		SELECT id, name, email, provider, provider_id, created_at, updated_at
		FROM accounts
		WHERE provider=$1 AND provider_id=$2
	`
	account := &entities.Account{}
	err := accountRepo.DB.QueryRow(ctx, query, provider, providerID).Scan(
		&account.ID,
		&account.Name,
		&account.Email,
		&account.Provider,
		&account.ProviderID,
		&account.CreatedAt,
		&account.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return account, nil
}

func (accountRepo *AccountRepository) FindOrCreate(ctx context.Context, account *entities.Account) (*entities.Account, error) {
	existing, err := accountRepo.GetAccountByProviderID(ctx, account.Provider, account.ProviderID)
	if err == nil {
		return existing, nil
	}

	if errors.Is(err, pgxpool.ErrNoRows) {
		if err := accountRepo.Register(ctx, account); err != nil {
			return nil, err
		}
		return account, nil
	}

	return nil, err
}
