package storage

import (
	"context"
	"fmt"
	"io"
	"time"

	"motion-pipe/config"
	"motion-pipe/pkg/logger"

	"github.com/aws/aws-sdk-go-v2/aws"
	awscfg "github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"go.uber.org/zap"
)

type S3Client struct {
	client     *s3.Client
	presigner  *s3.PresignClient
	bucketName string
	publicURL  string
}

func NewS3Client(ctx context.Context, cfg *config.Config) (*S3Client, error) {
	r2Resolver := aws.EndpointResolverWithOptionsFunc(func(service, region string, options ...interface{}) (aws.Endpoint, error) {
		return aws.Endpoint{
			URL: cfg.S3.Endpoint,
		}, nil
	})

	awsCfg, err := awscfg.LoadDefaultConfig(ctx,
		awscfg.WithEndpointResolverWithOptions(r2Resolver),
		awscfg.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(
			cfg.S3.AccessKeyID,
			cfg.S3.SecretAccessKey,
			"",
		)),
		awscfg.WithRegion(cfg.S3.Region),
	)
	if err != nil {
		return nil, fmt.Errorf("unable to load SDK config: %w", err)
	}

	client := s3.NewFromConfig(awsCfg)
	presigner := s3.NewPresignClient(client)

	logger.Info("S3 Storage initialized", zap.String("bucket", cfg.S3.BucketName))

	return &S3Client{
		client:     client,
		presigner:  presigner,
		bucketName: cfg.S3.BucketName,
		publicURL:  cfg.S3.PublicURL,
	}, nil
}

func (s *S3Client) UploadFile(ctx context.Context, key string, body io.Reader, contentType string) (string, error) {
	_, err := s.client.PutObject(ctx, &s3.PutObjectInput{
		Bucket:      aws.String(s.bucketName),
		Key:         aws.String(key),
		Body:        body,
		ContentType: aws.String(contentType),
	})
	if err != nil {
		logger.Error("Failed to upload file to S3", zap.String("key", key), zap.Error(err))
		return "", fmt.Errorf("failed to upload file: %w", err)
	}


	if s.publicURL != "" {
		return fmt.Sprintf("%s/%s", s.publicURL, key), nil
	}
	return key, nil
}

func (s *S3Client) GetPresignedURL(ctx context.Context, key string, lifetime time.Duration) (string, error) {
	presignedReq, err := s.presigner.PresignGetObject(ctx, &s3.GetObjectInput{
		Bucket: aws.String(s.bucketName),
		Key:    aws.String(key),
	}, s3.WithPresignExpires(lifetime))
	if err != nil {
		return "", fmt.Errorf("failed to presign request: %w", err)
	}
	return presignedReq.URL, nil
}

func (s *S3Client) DeleteFile(ctx context.Context, key string) error {
	_, err := s.client.DeleteObject(ctx, &s3.DeleteObjectInput{
		Bucket: aws.String(s.bucketName),
		Key:    aws.String(key),
	})
	if err != nil {
		return fmt.Errorf("failed to delete file: %w", err)
	}
	return nil
}
