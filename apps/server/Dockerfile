FROM golang:1.24-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o server ./cmd/server/main.go
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o worker ./cmd/worker/main.go

FROM alpine:latest
WORKDIR /app
RUN apk add --no-cache ffmpeg ca-certificates tzdata wget
COPY --from=builder /app/server .
COPY --from=builder /app/worker .
EXPOSE 8080
CMD ["./server"]
