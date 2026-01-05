package entities

import "time"

type Account struct {
	ID         int64     `db:"id"`
	Name       string    `db:"name"`
	Email      string    `db:"email"`
	Provider   string    `db:"provider"`
	ProviderID string    `db:"provider_id"`
	CreatedAt  time.Time `db:"created_at"`
	UpdatedAt  time.Time `db:"updated_at"`
}
