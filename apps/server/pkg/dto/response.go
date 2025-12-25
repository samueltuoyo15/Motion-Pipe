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
	Code    string            `json:"code"`              // Machine-readable error code (e.g., "INVALID_INPUT")
	Details map[string]string `json:"details,omitempty"` // Field-specific errors for validation
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

// SuccessWithMeta creates a successful response with metadata (for pagination)
func SuccessWithMeta(w http.ResponseWriter, statusCode int, message string, data interface{}, meta *MetaData) {
	response := APIResponse{
		Message: message,
		Data:    data,
		Meta:    meta,
	}
	writeJSON(w, statusCode, response)
}

// Error creates an error response
func Error(w http.ResponseWriter, statusCode int, message string, errorCode string) {
	response := APIResponse{
		Message: message,
		Error: &ErrorData{
			Code: errorCode,
		},
	}
	writeJSON(w, statusCode, response)
}

// ValidationError creates a validation error response with field-specific errors
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

// Unauthorized creates a 401 unauthorized response
func Unauthorized(w http.ResponseWriter, message string) {
	Error(w, http.StatusUnauthorized, message, "UNAUTHORIZED")
}

// Forbidden creates a 403 forbidden response
func Forbidden(w http.ResponseWriter, message string) {
	Error(w, http.StatusForbidden, message, "FORBIDDEN")
}

// NotFound creates a 404 not found response
func NotFound(w http.ResponseWriter, message string) {
	Error(w, http.StatusNotFound, message, "NOT_FOUND")
}

// InternalError creates a 500 internal server error response
func InternalError(w http.ResponseWriter, message string) {
	Error(w, http.StatusInternalServerError, message, "INTERNAL_ERROR")
}

// BadRequest creates a 400 bad request response
func BadRequest(w http.ResponseWriter, message string) {
	Error(w, http.StatusBadRequest, message, "BAD_REQUEST")
}

// Conflict creates a 409 conflict response
func Conflict(w http.ResponseWriter, message string) {
	Error(w, http.StatusConflict, message, "CONFLICT")
}

// writeJSON is a helper function to write JSON responses
func writeJSON(w http.ResponseWriter, statusCode int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	
	// Encode with indentation for readability
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	
	if err := encoder.Encode(data); err != nil {
		// Fallback to basic error response if encoding fails
		http.Error(w, `{"message":"Internal server error","error":{"code":"ENCODING_ERROR"}}`, http.StatusInternalServerError)
	}
}

// Created is a helper for 201 Created responses
func Created(w http.ResponseWriter, message string, data interface{}) {
	Success(w, http.StatusCreated, message, data)
}

// OK is a helper for 200 OK responses
func OK(w http.ResponseWriter, message string, data interface{}) {
	Success(w, http.StatusOK, message, data)
}

// NoContent sends a 204 No Content response
func NoContent(w http.ResponseWriter) {
	w.WriteHeader(http.StatusNoContent)
}
