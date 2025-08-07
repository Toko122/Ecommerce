# Google OAuth Debugging Guide

## Issues Found and Fixed:

### 1. ✅ Missing Google Login Button Handler
- **Fixed**: Added `onClick={handleGoogleLogin}` to the Google login button

### 2. ✅ CORS Configuration
- **Fixed**: Updated CORS to allow both frontend and callback domains

### 3. ✅ AuthProvider Router Context Issue
- **Fixed**: Removed `useNavigate()` from AuthProvider to avoid Router context issues

### 4. ✅ Backend Dependencies
- **Fixed**: Removed unnecessary `react-router-dom` from backend dependencies

## Current Implementation Status:

### Frontend Components:
- ✅ `LoginComponent.jsx` - Google button has proper handler
- ✅ `OauthSuccess.jsx` - Properly handles OAuth callback with JWT token
- ✅ `AuthProvider.jsx` - Fixed Router context issue

### Backend Components:
- ✅ `server.js` - Google OAuth strategy and routes configured
- ✅ `user.js` - User model includes googleId field
- ✅ CORS configuration allows both domains

## Debugging Steps:

### 1. Check Environment Variables
Make sure your backend `.env` file has all required variables:
```env
MONGODB=your_mongodb_connection_string
JWT=your_jwt_secret_key
MYSECRET=your_session_secret
CLIENTID=your_google_oauth_client_id
CLIENTSECRET=your_google_oauth_client_secret
```

### 2. Check Google OAuth Configuration
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Verify your OAuth 2.0 credentials
3. Check that the redirect URI is exactly: `https://ecommerce-kboc.onrender.com/auth/google/callback`
4. Make sure the Google+ API is enabled

### 3. Test the Flow Step by Step:

#### Step 1: Frontend Initiation
1. Open browser console
2. Go to login page
3. Click "Continue with Google"
4. Should see: "Google login initiated" in console
5. Should redirect to Google OAuth page

#### Step 2: Backend OAuth Processing
1. Check backend console logs
2. Should see: "Google OAuth initiated"
3. After Google authorization, should see: "Google OAuth callback received"
4. Should see: "Processing OAuth callback" and user details

#### Step 3: Frontend OAuth Success
1. Should redirect to: `https://ecommerce-nine-beige-73.vercel.app/oauth-success`
2. Check browser console for: "OauthSuccess component mounted"
3. Should see OAuth callback params logged
4. Should see: "All OAuth params present, logging in user"

### 4. Common Issues and Solutions:

#### Issue: "Google OAuth initiated" not showing
- **Cause**: Frontend not reaching backend
- **Solution**: Check if backend is running and accessible

#### Issue: "Google OAuth callback received" not showing
- **Cause**: Google OAuth configuration issue
- **Solution**: Check Google Cloud Console credentials and redirect URI

#### Issue: "No user found in OAuth callback"
- **Cause**: Database connection or user creation issue
- **Solution**: Check MongoDB connection and User model

#### Issue: "Missing OAuth params" in frontend
- **Cause**: Backend not generating proper redirect URL
- **Solution**: Check JWT signing and environment variables

### 5. Console Commands to Test:

```bash
# Start backend
cd backend
npm install
npm start

# Start frontend (in new terminal)
cd client
npm install
npm run dev
```

### 6. Network Tab Debugging:
1. Open browser DevTools → Network tab
2. Click "Continue with Google"
3. Look for:
   - Request to `/auth/google` (should redirect to Google)
   - Request to `/auth/google/callback` (should return with token)
   - Any failed requests or CORS errors

### 7. Environment Variable Checklist:
- [ ] `MONGODB` - MongoDB connection string
- [ ] `JWT` - Secret key for JWT signing
- [ ] `MYSECRET` - Session secret
- [ ] `CLIENTID` - Google OAuth client ID
- [ ] `CLIENTSECRET` - Google OAuth client secret

### 8. Google Cloud Console Checklist:
- [ ] OAuth 2.0 Client ID created
- [ ] Authorized redirect URIs includes: `https://ecommerce-kboc.onrender.com/auth/google/callback`
- [ ] Google+ API enabled
- [ ] OAuth consent screen configured

## If Still Not Working:

1. **Check all console logs** (both browser and backend)
2. **Verify environment variables** are set correctly
3. **Test with a simple Google OAuth app** to verify credentials work
4. **Check if backend is accessible** at `https://ecommerce-kboc.onrender.com`
5. **Verify frontend is accessible** at `https://ecommerce-nine-beige-73.vercel.app`

## Emergency Debug Mode:
If you need to see exactly what's happening, add this to your backend server.js:

```javascript
// Add this at the top of your routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})
```

This will log every request to help identify where the flow is breaking. 