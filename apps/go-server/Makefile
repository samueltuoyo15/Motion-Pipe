.PHONY: help dev run test clean docker-up docker-down install

help:
	@echo "Available commands:"
	@echo "  help      - Display this help message"
	@echo "  dev       - Start the development server"
	@echo "  run       - Run the application"
	@echo "  docker-up - Start the Docker containers"
	@echo "  make clean - Clean build artifacts"
	@echo "  docker-down - Stop the Docker containers"
	@echo "  install   - Install the dependencies"

install:
	go mod download
	go install github.com/cosmtrek/air@latest

dev:
	air -c .air.toml

run:
	go run cmd/api/main.go

test:
	go test -v ./...

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

clean:
	rm -rf bin/ tmp/ docs/
