package handlers

import (
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
	var req struct {
		Name       string `json:"name"`
		Email      string `json:"email"`
		ProviderID string `json:"provider_id"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
}
