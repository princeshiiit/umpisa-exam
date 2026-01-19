# Password Regeneration Feature

## Overview
This feature allows admin users to regenerate passwords for any user in the system. The generated password is displayed only once and includes a copy-to-clipboard functionality.

## Features
- ✅ Secure 12-character password generation
- ✅ Admin-only access
- ✅ One-time password display
- ✅ Copy to clipboard functionality
- ✅ Visual feedback on copy
- ✅ User details shown in modal

## Backend Implementation

### Controller: `regenerate_password_controller.ts`
Located at: `umpisa-exam-server/app/controllers/regenerate_password_controller.ts`

**Endpoint:** `POST /api/users/:id/regenerate-password`

**Authentication:** Bearer Token (Admin only)

**Password Generation:**
- Length: 12 characters
- Includes: Uppercase, lowercase, numbers, special characters (!@#$%^&*)
- Random and shuffled for security

**Response:**
```json
{
  "message": "Password regenerated successfully",
  "data": {
    "newPassword": "Abc123!@#Xyz",
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

### Route Configuration
Added to `start/routes.ts` in admin-only group:
```typescript
router.post('/users/:id/regenerate-password', '#controllers/regenerate_password_controller.handle')
```

## Frontend Implementation

### Service: `userService.js`
New method added:
```javascript
regeneratePassword: async (id) => {
  const response = await api.post(`/users/${id}/regenerate-password`);
  return {
    success: true,
    message: response.data.message,
    newPassword: response.data.data.newPassword,
    email: response.data.data.email,
    fullName: response.data.data.fullName
  };
}
```

### UI: `UserList.jsx`
**New Button:** "Reset Password" (warning variant)
- Only visible to admin users
- Positioned between Edit and Deactivate/Reactivate buttons
- Calls `handleRegeneratePassword()` on click

**Password Modal:**
- Displays user details (name, email)
- Shows generated password in large, highlighted format
- Warning message: "This password will only be shown once"
- Copy button with visual feedback
- Closes after copying (but password can still be copied before closing)

### Styling
**Button.css:**
- Added `.btn-warning` variant (yellow/amber color)

**UserList.css:**
- `.password-modal-content` - Container styling
- `.password-warning` - Yellow alert box for important message
- `.password-details` - User information display
- `.password-display` - Blue bordered box for password
- `.password-value` - Large, bold password text
- `.password-instruction` - Helper text at bottom

## User Flow

1. **Admin** navigates to User List page
2. Clicks **"Reset Password"** button for any user
3. System generates new password on backend
4. **Modal appears** with:
   - Warning message (password shown only once)
   - User details (name, email)
   - Generated password in large display
   - "Copy Password" button
   - "Close" button
5. Admin clicks **"Copy Password"**
   - Password copied to clipboard
   - Button changes to "✓ Copied!"
   - Toast notification: "Password copied to clipboard"
6. Admin can close modal
7. Admin shares password with user securely

## Security Considerations

✅ **Admin-only access:** Route protected by auth + admin middleware
✅ **One-time display:** Password never stored in frontend state after modal closes
✅ **Secure generation:** Random, complex password with mixed character types
✅ **Hashed storage:** Password hashed with bcrypt before saving to database
✅ **No retrieval:** Once modal closes, password cannot be retrieved again

## Testing Instructions

### Start Both Servers
```bash
# Terminal 1 - Backend
cd umpisa-exam-server
npm run dev

# Terminal 2 - Frontend
cd umpisa-exam
npm run dev
```

### Test the Feature
1. Login as admin: `admin@umpisa.com` / `Test@123`
2. Navigate to User List
3. Find any user and click "Reset Password"
4. Verify modal appears with password
5. Click "Copy Password" and verify:
   - Button text changes to "✓ Copied!"
   - Toast notification appears
   - Password is in clipboard (paste to verify)
6. Close modal
7. Try to reopen - should generate NEW password (previous one is gone)

### Verify Security
- Try accessing as non-admin user → Should not see button
- Check network request → Password returned only in response
- Verify database → Password should be hashed

## API Documentation

### Regenerate Password Endpoint

**URL:** `/api/users/:id/regenerate-password`
**Method:** `POST`
**Auth:** Required (Admin only)

**Request:**
```bash
curl -X POST \
  http://localhost:3333/api/users/2/regenerate-password \
  -H 'Authorization: Bearer YOUR_TOKEN'
```

**Success Response (200):**
```json
{
  "message": "Password regenerated successfully",
  "data": {
    "newPassword": "Xy7z@9K#mP2q",
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

**Error Responses:**

**404 - User Not Found:**
```json
{
  "message": "User not found"
}
```

**403 - Forbidden:**
```json
{
  "message": "Forbidden"
}
```

**401 - Unauthorized:**
```json
{
  "message": "Unauthorized access"
}
```

## Files Changed

### Backend
1. **NEW:** `app/controllers/regenerate_password_controller.ts`
2. **MODIFIED:** `start/routes.ts`

### Frontend
1. **MODIFIED:** `src/services/userService.js`
2. **MODIFIED:** `src/pages/UserList.jsx`
3. **MODIFIED:** `src/pages/UserList.css`
4. **MODIFIED:** `src/components/Button.css`

## Future Enhancements

- [ ] Email the new password directly to the user
- [ ] Password expiration on first login (force change)
- [ ] Password history to prevent reuse
- [ ] Audit log of password regenerations
- [ ] Customizable password length/complexity
- [ ] Bulk password regeneration
