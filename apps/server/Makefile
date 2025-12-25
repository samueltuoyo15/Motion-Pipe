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
	go mod download
	go install github.com/cosmtrek/air@latest
	go install github.com/swaggo/swag/cmd/swag@latest

dev:
	air

build:
	go build -o bin/motion-pipe cmd/server/main.go

run:
	go run cmd/server/main.go

test:
	go test -v ./...

swagger:
	swag init -g cmd/server/main.go --output ./docs

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

clean:
	rm -rf bin/ tmp/ docs/
