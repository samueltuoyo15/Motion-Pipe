package oauth

import (
	"motion-pipe/config"

	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
	"github.com/markbates/goth/providers/twitterv2"
)

func Initialize(cfg *config.Config) {
	store := sessions.NewCookieStore([]byte(cfg.Session.Secret))
	store.MaxAge(cfg.Session.MaxAge)
	store.Options.Path = "/"
	store.Options.HttpOnly = true
	store.Options.Secure = cfg.IsProduction()

	gothic.Store = store

	goth.UseProviders(
		google.New(
			cfg.OAuth.Google.ClientID,
			cfg.OAuth.Google.ClientSecret,
			cfg.OAuth.Google.CallbackURL,
			"email", "profile",
		),
		twitterv2.NewAuthenticate(
			cfg.OAuth.Twitter.ClientID,
			cfg.OAuth.Twitter.ClientSecret,
			cfg.OAuth.Twitter.CallbackURL,
			"tweet.read", "users.read",
		),
	)
}
