package middleware

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

type rateLimiter struct {
	requests map[string]*clientLimit
	mu       sync.RWMutex
	maxReqs  int
	duration time.Duration
}

type clientLimit struct {
	count     int
	resetTime time.Time
}

func NewRateLimiter(maxRequests int, duration time.Duration) *rateLimiter {
	rl := &rateLimiter{
		requests: make(map[string]*clientLimit),
		maxReqs:  maxRequests,
		duration: duration,
	}

	go rl.cleanup()

	return rl
}

func (rl *rateLimiter) Limit() gin.HandlerFunc {
	return func(c *gin.Context) {
		clientIP := c.ClientIP()

		rl.mu.Lock()
		defer rl.mu.Unlock()

		now := time.Now()
		limit, exists := rl.requests[clientIP]

		if !exists || now.After(limit.resetTime) {
			rl.requests[clientIP] = &clientLimit{
				count:     1,
				resetTime: now.Add(rl.duration),
			}
			c.Next()
			return
		}

		if limit.count >= rl.maxReqs {
			c.JSON(http.StatusTooManyRequests, gin.H{
				"error":   "Rate limit exceeded",
				"message": "Too many requests. Please try again later.",
				"retry_after": limit.resetTime.Sub(now).Seconds(),
			})
			c.Abort()
			return
		}

		limit.count++
		c.Next()
	}
}

func (rl *rateLimiter) cleanup() {
	ticker := time.NewTicker(time.Minute)
	defer ticker.Stop()

	for range ticker.C {
		rl.mu.Lock()
		now := time.Now()
		for ip, limit := range rl.requests {
			if now.After(limit.resetTime) {
				delete(rl.requests, ip)
			}
		}
		rl.mu.Unlock()
	}
}
