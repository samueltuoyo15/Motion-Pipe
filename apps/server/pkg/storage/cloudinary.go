package storage

import (
	"context"
	"fmt"
	"io"

	"motion-pipe/config"
	"motion-pipe/pkg/logger"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"go.uber.org/zap"
)

type CloudinaryClient struct {
	client       *cloudinary.Cloudinary
	uploadPreset string
}

func NewCloudinaryClient(cfg *config.Config) (*CloudinaryClient, error) {
	cld, err := cloudinary.NewFromParams(
		cfg.Cloudinary.CloudName,
		cfg.Cloudinary.APIKey,
		cfg.Cloudinary.APISecret,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to initialize Cloudinary: %w", err)
	}

	logger.Info("Cloudinary Storage initialized", zap.String("cloud_name", cfg.Cloudinary.CloudName))

	return &CloudinaryClient{
		client:       cld,
		uploadPreset: cfg.Cloudinary.UploadPreset,
	}, nil
}

func (c *CloudinaryClient) UploadFile(ctx context.Context, key string, body io.Reader, contentType string) (string, error) {
	params := uploader.UploadParams{
		PublicID:       key,
		Overwrite:      true,
		ResourceType:   "auto",
	}

	if c.uploadPreset != "" {
		params.UploadPreset = c.uploadPreset
	}

	resp, err := c.client.Upload.Upload(ctx, body, params)
	if err != nil {
		logger.Error("Failed to upload file to Cloudinary", zap.String("key", key), zap.Error(err))
		return "", fmt.Errorf("failed to upload file: %w", err)
	}

	return resp.SecureURL, nil
}

func (c *CloudinaryClient) DeleteFile(ctx context.Context, key string) error {
	_, err := c.client.Upload.Destroy(ctx, uploader.DestroyParams{
		PublicID: key,
	})
	if err != nil {
		logger.Error("Failed to delete file from Cloudinary", zap.String("key", key), zap.Error(err))
		return fmt.Errorf("failed to delete file: %w", err)
	}
	return nil
}
