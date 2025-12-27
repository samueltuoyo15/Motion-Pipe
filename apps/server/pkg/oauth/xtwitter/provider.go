package xtwitter

import (
	"github.com/markbates/goth"
	"github.com/mrjones/oauth"
)

// New creates a new X (Twitter) OAuth 1.0a provider using api.x.com endpoints
func New(clientKey, secret, callbackURL string) goth.Provider {
	return &Provider{
		clientKey:    clientKey,
		secret:       secret,
		callbackURL:  callbackURL,
		providerName: "twitter",
		consumer: oauth.NewConsumer(
			clientKey,
			secret,
			oauth.ServiceProvider{
				RequestTokenUrl:   "https://api.x.com/oauth/request_token",
				AuthorizeTokenUrl: "https://api.x.com/oauth/authorize",
				AccessTokenUrl:    "https://api.x.com/oauth/access_token",
			},
		),
	}
}

type Provider struct {
	clientKey    string
	secret       string
	callbackURL  string
	providerName string
	consumer     *oauth.Consumer
}

func (p *Provider) Name() string {
	return p.providerName
}

func (p *Provider) SetName(name string) {
	p.providerName = name
}

func (p *Provider) BeginAuth(state string) (goth.Session, error) {
	requestToken, url, err := p.consumer.GetRequestTokenAndUrl(p.callbackURL)
	if err != nil {
		return nil, err
	}

	session := &Session{
		RequestToken: requestToken,
		AuthURL:      url,
	}
	return session, nil
}

func (p *Provider) FetchUser(session goth.Session) (goth.User, error) {
	sess := session.(*Session)
	user := goth.User{
		Provider: p.Name(),
	}

	if sess.AccessToken == nil {
		return user, nil
	}

	response, err := p.consumer.Get(
		"https://api.x.com/1.1/account/verify_credentials.json",
		map[string]string{"include_email": "true"},
		sess.AccessToken,
	)
	if err != nil {
		return user, err
	}
	defer response.Body.Close()

	if err := userFromReader(response.Body, &user); err != nil {
		return user, err
	}

	user.AccessToken = sess.AccessToken.Token
	user.RefreshToken = sess.AccessToken.Secret

	return user, nil
}

func (p *Provider) UnmarshalSession(data string) (goth.Session, error) {
	session := &Session{}
	err := json.Unmarshal([]byte(data), session)
	return session, err
}

func (p *Provider) Debug(debug bool) {}

func (p *Provider) RefreshToken(refreshToken string) (*oauth2.Token, error) {
	return nil, errors.New("refresh token not supported")
}

func (p *Provider) RefreshTokenAvailable() bool {
	return false
}
