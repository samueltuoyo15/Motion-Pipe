package middleware

import (
	"fmt"
	"net/http"
	"runtime/debug"

	"motion-pipe/pkg/logger"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func Recovery() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				stack := debug.Stack()

				logger.Error("Panic recovered",
					zap.Any("error", err),
					zap.String("stack", string(stack)),
					zap.String("path", c.Request.URL.Path),
					zap.String("method", c.Request.Method),
				)

				c.JSON(http.StatusInternalServerError, gin.H{
					"error":   "Internal Server Error",
					"message": "An unexpected error occurred",
				})

				c.Abort()
			}
		}()

		c.Next()
	}
}

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		if len(c.Errors) > 0 {
			err := c.Errors.Last()

			logger.Error("Request error",
				zap.Error(err.Err),
				zap.String("path", c.Request.URL.Path),
				zap.String("method", c.Request.Method),
			)

			statusCode := http.StatusInternalServerError
			message := "An error occurred"

			if c.Writer.Status() != http.StatusOK {
				statusCode = c.Writer.Status()
			}

			if err.Meta != nil {
				if msg, ok := err.Meta.(string); ok {
					message = msg
				}
			}

			c.JSON(statusCode, gin.H{
				"error":   http.StatusText(statusCode),
				"message": message,
			})
		}
	}
}

func NotFoundHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{
			"error":   "Not Found",
			"message": fmt.Sprintf("Route %s %s not found", c.Request.Method, c.Request.URL.Path),
		})
	}
}
