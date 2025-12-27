package oauth

import (
	"motion-pipe/config"

	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
	"golang.org/x/oauth2"
)

var XOAuthConfig *oauth2.Config

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
	)

	XOAuthConfig = &oauth2.Config{
		ClientID:     cfg.OAuth.Twitter.ClientID,
		ClientSecret: cfg.OAuth.Twitter.ClientSecret,
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://x.com/i/oauth2/authorize",
			TokenURL: "https://api.x.com/2/oauth2/token",
		},
		RedirectURL: cfg.OAuth.Twitter.CallbackURL,
		Scopes:      []string{"tweet.read", "users.read", "offline.access"},
	}
}
