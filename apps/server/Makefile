.PHONY: help dev build run test clean docker-up docker-down swagger install

help:
	@echo "Motion Pipe Server - Available Commands:"
	@echo "  make install     - Install dependencies"
	@echo "  make dev         - Run with hot reload (Air)"
	@echo "  make build       - Build binary"
	@echo "  make run         - Run server"
	@echo "  make test        - Run tests"
	@echo "  make swagger     - Generate Swagger docs"
	@echo "  make docker-up   - Start Docker services"
	@echo "  make docker-down - Stop Docker services"
	@echo "  make clean       - Clean build artifacts"

install:
	@echo "Installing dependencies..."
	go mod download
	go install github.com/cosmtrek/air@latest
	go install github.com/swaggo/swag/cmd/swag@latest

dev:
	@echo "Starting development server with hot reload..."
	air

build:
	@echo "Building server..."
	go build -o bin/motion-pipe main.go

run:
	@echo "Running server..."
	go run main.go

test:
	@echo "Running tests..."
	go test -v ./...

swagger:
	@echo "Generating Swagger documentation..."
	swag init -g main.go --output ./docs

docker-up:
	@echo "Starting Docker services..."
	docker-compose up -d

docker-down:
	@echo "Stopping Docker services..."
	docker-compose down

clean:
	@echo "Cleaning build artifacts..."
	rm -rf bin/ tmp/ docs/
