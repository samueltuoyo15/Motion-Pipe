package handlers

import (
	"motion-pipe/pkg/oauth"
	"motion-pipe/pkg/repositories"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	AccountRepo *repositories.AccountRepository
}

func NewAuthHandler(accountRepo *repositories.AccountRepository) *AuthHandler {
	return &AuthHandler{AccountRepo: accountRepo}
}

func (h *AuthHandler) GoogleLogin(c *gin.Context) {
	config := oauth.GoogleConfig()

	authUrl := config.AuthCodeURL("state")
	c.Redirect(http.StatusTemporaryRedirect, authUrl)
}

func (h *AuthHandler) GoogleCallback(c *gin.Context) {

}
