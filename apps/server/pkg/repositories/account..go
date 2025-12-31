package repositories

import (
	"github.com/jackc/pgx/v5/pgxpool"
)

type AccountRepository struct {
	DB *pgxpool.Pool
}

func NewAccountRepository(db *pgxpool.Pool) *AccountRepository {
	return &AccountRepository{DB: db}
}
