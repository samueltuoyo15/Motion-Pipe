package dto

import (
	"encoding/json"
	"net/http"
)

type APIResponse struct {
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
	Error   *ErrorData  `json:"error,omitempty"`
	Meta    *MetaData   `json:"meta,omitempty"`
}

type ErrorData struct {
	Code    string            `json:"code"`
	Details map[string]string `json:"details,omitempty"`
}

type MetaData struct {
	Page       int   `json:"page,omitempty"`
	Limit      int   `json:"limit,omitempty"`
	Total      int64 `json:"total,omitempty"`
	TotalPages int   `json:"total_pages,omitempty"`
}

func Success(w http.ResponseWriter, statusCode int, message string, data interface{}) {
	response := APIResponse{
		Message: message,
		Data:    data,
	}
	writeJSON(w, statusCode, response)
}

func SuccessWithMeta(w http.ResponseWriter, statusCode int, message string, data interface{}, meta *MetaData) {
	response := APIResponse{
		Message: message,
		Data:    data,
		Meta:    meta,
	}
	writeJSON(w, statusCode, response)
}

func Error(w http.ResponseWriter, statusCode int, message string, errorCode string) {
	response := APIResponse{
		Message: message,
		Error: &ErrorData{
			Code: errorCode,
		},
	}
	writeJSON(w, statusCode, response)
}

func ValidationError(w http.ResponseWriter, message string, fieldErrors map[string]string) {
	response := APIResponse{
		Message: message,
		Error: &ErrorData{
			Code:    "VALIDATION_ERROR",
			Details: fieldErrors,
		},
	}
	writeJSON(w, http.StatusBadRequest, response)
}

func Unauthorized(w http.ResponseWriter, message string) {
	Error(w, http.StatusUnauthorized, message, "UNAUTHORIZED")
}

func Forbidden(w http.ResponseWriter, message string) {
	Error(w, http.StatusForbidden, message, "FORBIDDEN")
}

func NotFound(w http.ResponseWriter, message string) {
	Error(w, http.StatusNotFound, message, "NOT_FOUND")
}

func InternalError(w http.ResponseWriter, message string) {
	Error(w, http.StatusInternalServerError, message, "INTERNAL_ERROR")
}

func BadRequest(w http.ResponseWriter, message string) {
	Error(w, http.StatusBadRequest, message, "BAD_REQUEST")
}

func Conflict(w http.ResponseWriter, message string) {
	Error(w, http.StatusConflict, message, "CONFLICT")
}

func writeJSON(w http.ResponseWriter, statusCode int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	if err := encoder.Encode(data); err != nil {
		http.Error(w, `{"message":"Internal server error","error":{"code":"ENCODING_ERROR"}}`, http.StatusInternalServerError)
	}
}

func Created(w http.ResponseWriter, message string, data interface{}) {
	Success(w, http.StatusCreated, message, data)
}

func OK(w http.ResponseWriter, message string, data interface{}) {
	Success(w, http.StatusOK, message, data)
}

func NoContent(w http.ResponseWriter) {
	w.WriteHeader(http.StatusNoContent)
}
