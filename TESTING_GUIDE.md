# 🧪 Motion Pipe - Testing & Backend Integration Guide

## 📋 Quick Summary of Changes

### ✅ What Was Fixed:

1. **Author Field** - Added "Samuel Tuoyo" to all 5 package.json files
2. **HTTP-Only Cookies** - Removed all localStorage usage, now using secure cookies
3. **Auth State with Stunk** - Properly integrated authentication with Stunk state management
4. **Protected Routes** - Created middleware to protect dashboard routes
5. **User Avatar & Info** - Dashboard now displays real user data
6. **Logout Function** - Proper logout with API call and state cleanup
7. **Language System** - Already properly integrated throughout the app

---

## 🔧 Backend Requirements

### Your Go/Backend Server Must Now:

#### 1. **Set HTTP-Only Cookies in OAuth Callback**

When a user successfully authenticates via Google/Twitter, your server should:

```go
// Example: apps/server/handlers/auth.go

func HandleOAuthCallback(w http.ResponseWriter, r *http.Request) {
    // ... your OAuth logic to get tokens ...
    
    // Set access token cookie
    http.SetCookie(w, &http.Cookie{
        Name:     "access_token",
        Value:    accessToken,
        Path:     "/",
        HttpOnly: true,  // JavaScript cannot access
        Secure:   os.Getenv("ENV") == "production",  // HTTPS only in prod
        SameSite: http.SameSiteLaxMode,
        MaxAge:   3600,  // 1 hour
    })
    
    // Set refresh token cookie
    http.SetCookie(w, &http.Cookie{
        Name:     "refresh_token",
        Value:    refreshToken,
        Path:     "/",
        HttpOnly: true,
        Secure:   os.Getenv("ENV") == "production",
        SameSite: http.SameSiteLaxMode,
        MaxAge:   604800,  // 7 days
    })
    
    // Redirect to client success page
    frontendURL := os.Getenv("FRONTEND_URL")  // e.g., http://localhost:3000
    http.Redirect(w, r, frontendURL + "/auth/success", http.StatusFound)
}
```

#### 2. **Read Cookies in Middleware**

```go
// Example: apps/server/middleware/auth.go

func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        // Read cookie from request
        cookie, err := r.Cookie("access_token")
        if err != nil {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        
        // Validate token
        token := cookie.Value
        userID, err := ValidateJWT(token)
        if err != nil {
            http.Error(w, "Invalid token", http.StatusUnauthorized)
            return
        }
        
        // Add user to context
        ctx := context.WithValue(r.Context(), "userID", userID)
        next.ServeHTTP(w, r.WithContext(ctx))
    }
}
```

#### 3. **Implement `/auth/me` Endpoint**

```go
// GET /auth/me
func GetCurrentUser(w http.ResponseWriter, r *http.Request) {
    userID := r.Context().Value("userID").(string)
    
    user, err := db.GetUserByID(userID)
    if err != nil {
        http.Error(w, "User not found", http.StatusNotFound)
        return
    }
    
    // Return user data matching the expected structure
    response := map[string]interface{}{
        "id":       user.ID,
        "email":    user.Email,
        "name":     user.Name,
        "avatar":   user.Avatar,    // Avatar URL
        "provider": user.Provider,  // "google" or "twitter"
    }
    
    json.NewEncoder(w).Encode(response)
}
```

#### 4. **Implement `/auth/logout` Endpoint**

```go
// POST /auth/logout
func Logout(w http.ResponseWriter, r *http.Request) {
    // Clear cookies by setting max age to -1
    http.SetCookie(w, &http.Cookie{
        Name:     "access_token",
        Value:    "",
        Path:     "/",
        HttpOnly: true,
        MaxAge:   -1,  // Delete cookie
    })
    
    http.SetCookie(w, &http.Cookie{
        Name:     "refresh_token",
        Value:    "",
        Path:     "/",
        HttpOnly: true,
        MaxAge:   -1,
    })
    
    json.NewEncoder(w).Encode(map[string]string{
        "message": "Logged out successfully",
    })
}
```

#### 5. **CORS Configuration**

Make sure your backend allows credentials:

```go
// Example CORS middleware
func CORSMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        origin := r.Header.Get("Origin")
        
        // Allow your frontend origin
        w.Header().Set("Access-Control-Allow-Origin", origin)
        w.Header().Set("Access-Control-Allow-Credentials", "true")  // Important!
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        
        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusOK)
            return
        }
        
        next.ServeHTTP(w, r)
    })
}
```

---

## 🧪 Testing the Authentication Flow

### Test 1: **Login Flow**
```
1. Go to: http://localhost:3000/login
2. Click "Continue with Google" or "Continue with X"
3. Complete OAuth flow
4. Your backend should:
   ✓ Set access_token cookie
   ✓ Set refresh_token cookie
   ✓ Redirect to: http://localhost:3000/auth/success
5. Client should:
   ✓ Call GET /auth/me (with cookies automatically sent)
   ✓ Store user in Stunk state
   ✓ Redirect to /dashboard
6. Dashboard should:
   ✓ Show user's avatar
   ✓ Show user's name
   ✓ Show all dashboard content
```

### Test 2: **Protected Routes**
```
1. Open incognito/private window
2. Go to: http://localhost:3000/dashboard
3. Should automatically redirect to: http://localhost:3000/login
4. Login via OAuth
5. Should end up at: http://localhost:3000/dashboard
```

### Test 3: **Logout Flow**
```
1. When logged in, click "Log Out" in dashboard sidebar
2. Should:
   ✓ Call POST /auth/logout
   ✓ Clear cookies on backend
   ✓ Clear auth state in Stunk
   ✓ Redirect to /login
3. Try accessing /dashboard again
4. Should redirect to /login
```

### Test 4: **Language Selection**
```
1. Go to homepage
2. Click language selector in header (Globe icon)
3. Select "Français" or any language
4. Verify:
   ✓ All text changes throughout the page
   ✓ Navigation links update
   ✓ CTA buttons update
   ✓ Footer content updates
5. Navigate to dashboard
6. Verify dashboard sidebar labels also changed
```

---

## 🔍 Debugging Tips

### Check if Cookies Are Being Set:

**Chrome/Edge:**
1. Open DevTools (F12)
2. Go to Application tab
3. Click "Cookies" in sidebar
4. Look for `access_token` and `refresh_token`

**Check Cookie Properties:**
- ✅ HttpOnly: true
- ✅ Secure: true (in production)
- ✅ SameSite: Lax or Strict
- ✅ Path: /

### Check if Cookies Are Being Sent:

**Chrome/Edge:**
1. Open DevTools (F12)
2. Go to Network tab
3. Make a request to your API
4. Click on the request
5. Go to "Headers" tab
6. Look for "Cookie" in Request Headers

### Common Issues:

**Issue: Cookies not being set**
- ✅ Check CORS configuration
- ✅ Ensure `Access-Control-Allow-Credentials: true` is set
- ✅ Ensure frontend uses `withCredentials: true` (already done in api.ts)

**Issue: 401 Unauthorized on /auth/me**
- ✅ Check if cookies are being sent in request
- ✅ Check backend middleware is reading cookies correctly
- ✅ Check token validation logic

**Issue: Infinite redirect loop**
- ✅ Check middleware matcher in middleware.ts
- ✅ Ensure backend is actually setting cookies on OAuth callback
- ✅ Check cookie domain/path settings

---

## 📝 Environment Variables Needed

### Frontend (.env file in apps/web):
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

### Backend (.env file in your Go server):
```env
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret
```

---

## ✅ Final Checklist

Before marking this as complete, verify:

- [ ] All package.json files have "Samuel Tuoyo" as author
- [ ] No localStorage usage for tokens anywhere in codebase
- [ ] Backend sets HTTP-only cookies on OAuth callback
- [ ] Backend has `/auth/me` endpoint that reads from cookies
- [ ] Backend has `/auth/logout` endpoint that clears cookies
- [ ] CORS allows credentials
- [ ] Login flow works end-to-end
- [ ] Logout flow works end-to-end
- [ ] Protected routes redirect properly
- [ ] User avatar and name display in dashboard
- [ ] Language selection updates all text across the site

---

## 🎉 You're All Set!

All the client-side code is ready. Just update your backend to use cookies instead of query params, and you're good to go!

If you need help with the backend implementation or run into any issues, let me know! 🚀
