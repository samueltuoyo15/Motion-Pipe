package middleware

import (
	"time"

	"motion-pipe/pkg/logger"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func Logger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path
		query := c.Request.URL.RawQuery

		c.Next()

		latency := time.Since(start)
		statusCode := c.Writer.Status()
		clientIP := c.ClientIP()
		method := c.Request.Method
		userAgent := c.Request.UserAgent()

		fields := []zap.Field{
			zap.Int("status", statusCode),
			zap.String("method", method),
			zap.String("path", path),
			zap.String("query", query),
			zap.String("ip", clientIP),
			zap.Duration("latency", latency),
			zap.String("user_agent", userAgent),
		}

		if len(c.Errors) > 0 {
			for _, e := range c.Errors {
				logger.Error("Request error", append(fields, zap.Error(e.Err))...)
			}
		} else {
			if statusCode >= 500 {
				logger.Error("Server error", fields...)
			} else if statusCode >= 400 {
				logger.Warn("Client error", fields...)
			} else {
				logger.Info("Request completed", fields...)
			}
		}
	}
}
