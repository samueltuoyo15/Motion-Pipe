package logger

import (
	"os"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var Log *zap.Logger

func Initialize(level, output string) error {
	var zapLevel zapcore.Level
	switch level {
	case "debug":
		zapLevel = zapcore.DebugLevel
	case "info":
		zapLevel = zapcore.InfoLevel
	case "warn":
		zapLevel = zapcore.WarnLevel
	case "error":
		zapLevel = zapcore.ErrorLevel
	default:
		zapLevel = zapcore.InfoLevel
	}

	encoderConfig := zapcore.EncoderConfig{
		TimeKey:        "timestamp",
		LevelKey:       "level",
		NameKey:        "logger",
		CallerKey:      "caller",
		FunctionKey:    zapcore.OmitKey,
		MessageKey:     "message",
		StacktraceKey:  "stacktrace",
		LineEnding:     zapcore.DefaultLineEnding,
		EncodeLevel:    zapcore.CapitalColorLevelEncoder,
		EncodeTime:     zapcore.ISO8601TimeEncoder,
		EncodeDuration: zapcore.SecondsDurationEncoder,
		EncodeCaller:   zapcore.ShortCallerEncoder,
	}

	config := zap.Config{
		Level:            zap.NewAtomicLevelAt(zapLevel),
		Development:      false,
		Encoding:         "console",
		EncoderConfig:    encoderConfig,
		OutputPaths:      []string{output},
		ErrorOutputPaths: []string{"stderr"},
	}

	if output == "stdout" {
		config.OutputPaths = []string{"stdout"}
	}

	logger, err := config.Build(zap.AddCallerSkip(1))
	if err != nil {
		return err
	}

	Log = logger
	return nil
}

func Sync() {
	if Log != nil {
		_ = Log.Sync()
	}
}

func Debug(msg string, fields ...zap.Field) {
	if Log != nil {
		Log.Debug(msg, fields...)
	}
}

func Info(msg string, fields ...zap.Field) {
	if Log != nil {
		Log.Info(msg, fields...)
	}
}

func Warn(msg string, fields ...zap.Field) {
	if Log != nil {
		Log.Warn(msg, fields...)
	}
}

func Error(msg string, fields ...zap.Field) {
	if Log != nil {
		Log.Error(msg, fields...)
	}
}

func Fatal(msg string, fields ...zap.Field) {
	if Log != nil {
		Log.Fatal(msg, fields...)
	}
	os.Exit(1)
}

func With(fields ...zap.Field) *zap.Logger {
	if Log != nil {
		return Log.With(fields...)
	}
	return zap.NewNop()
}
