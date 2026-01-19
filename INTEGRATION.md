# Frontend-Backend Integration Guide

## Overview
This document describes the integration between the React frontend (`umpisa-exam`) and the AdonisJS backend (`umpisa-exam-server`).

## Prerequisites

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd umpisa-exam-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database (if not already done):
   ```bash
   node ace migration:run
   node ace db:seed
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   
   The backend will run on `http://localhost:3333`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd umpisa-exam
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the API URL in `.env`:
   ```env
   VITE_API_URL=http://localhost:3333/api
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## API Endpoints Integration

### Authentication

#### Login
- **Endpoint**: `POST /api/login`
- **Frontend Service**: `authService.login(email, password)`
- **Request Body**:
  ```json
  {
    "email": "admin@umpisa.com",
    "password": "Test@123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "data": {
      "user": {
        "id": 1,
        "email": "admin@umpisa.com",
        "fullName": "Admin User",
        "roleId": 1,
        "isActive": true,
        "role": { "id": 1, "name": "admin" }
      },
      "token": {
        "type": "Bearer",
        "value": "oat_xxx..."
      }
    }
  }
  ```

### User Management

#### Get All Users
- **Endpoint**: `GET /api/users/retrieve`
- **Frontend Service**: `userService.getUsers(params)`
- **Query Parameters**:
  - `page` (optional): Page number for pagination
  - `limit` (optional): Items per page
  - `email` (optional): Filter by specific email
- **Authentication**: Required (Admin only)
- **Response**:
  ```json
  {
    "data": [
      {
        "id": 1,
        "email": "admin@umpisa.com",
        "fullName": "Admin User",
        "roleId": 1,
        "isActive": true,
        "role": { "id": 1, "name": "admin" }
      }
    ],
    "meta": {
      "total": 10,
      "perPage": 10,
      "currentPage": 1,
      "lastPage": 1
    }
  }
  ```

#### Create User
- **Endpoint**: `POST /api/users`
- **Frontend Service**: `userService.createUser(userData)`
- **Request Body**:
  ```json
  {
    "email": "newuser@example.com",
    "password": "SecurePass123",
    "fullName": "Jane Smith",
    "roleId": 2
  }
  ```
- **Authentication**: Required (Admin only)
- **Response**:
  ```json
  {
    "message": "User created successfully",
    "data": {
      "id": 5,
      "email": "newuser@example.com",
      "fullName": "Jane Smith",
      "roleId": 2,
      "isActive": true,
      "role": { "id": 2, "name": "user" }
    }
  }
  ```

#### Update User
- **Endpoint**: `PATCH /api/users/:id`
- **Frontend Service**: `userService.updateUser(id, userData)`
- **Request Body** (all fields optional):
  ```json
  {
    "email": "updated@example.com",
    "fullName": "Jane Doe",
    "roleId": 1
  }
  ```
- **Authentication**: Required
- **Response**:
  ```json
  {
    "message": "User updated successfully",
    "data": {
      "id": 5,
      "email": "updated@example.com",
      "fullName": "Jane Doe",
      "roleId": 1,
      "isActive": true,
      "role": { "id": 1, "name": "admin" }
    }
  }
  ```

#### Deactivate User
- **Endpoint**: `DELETE /api/users/:id/deactivate`
- **Frontend Service**: `userService.deleteUser(id)` or `userService.deactivateUser(id)`
- **Authentication**: Required (Admin only)
- **Response**:
  ```json
  {
    "message": "User deactivated successfully",
    "data": {
      "id": 5,
      "isActive": false,
      ...
    }
  }
  ```

#### Reactivate User
- **Endpoint**: `PATCH /api/users/:id/reactivate`
- **Frontend Service**: `userService.reactivateUser(id)`
- **Authentication**: Required (Admin only)
- **Response**:
  ```json
  {
    "message": "User reactivated successfully",
    "data": {
      "id": 5,
      "isActive": true,
      ...
    }
  }
  ```

## Data Transformations

The frontend automatically transforms backend data formats:

### Backend → Frontend
- `fullName` → `name`
- `isActive` → `status` ('active' | 'inactive')
- `role.name` → `role`

### Frontend → Backend
- `name` → `fullName`
- `status` → `isActive`
- `role` (string) → `roleId` (number via `getRoleId()`)

## Role Mappings

```javascript
ROLES = {
  ADMIN: { id: 1, name: 'admin' },
  USER: { id: 2, name: 'user' }
}
```

## Authentication Flow

1. User submits login credentials
2. Frontend calls `authService.login(email, password)`
3. Backend validates credentials and returns token + user data
4. Frontend stores token in localStorage
5. Frontend stores transformed user data in localStorage
6. API interceptor adds token to all subsequent requests
7. Backend validates token on protected routes

## Error Handling

All API errors are caught and transformed:

```javascript
try {
  const response = await api.post('/endpoint', data);
  // Handle success
} catch (error) {
  if (error.response?.data?.message) {
    // Backend error message
    throw new Error(error.response.data.message);
  }
  if (error.response?.data?.errors) {
    // Validation errors
    const validationError = error.response.data.errors[0];
    throw new Error(validationError.message);
  }
  throw error;
}
```

## Testing the Integration

### Login Test
```bash
# Backend should be running on http://localhost:3333
# Frontend should be running on http://localhost:5173 (or configured port)

1. Navigate to http://localhost:5173/login
2. Enter credentials:
   - Email: admin@umpisa.com
   - Password: Test@123
3. Click "Sign In"
4. You should be redirected to /users
```

### User Management Test
```bash
1. After logging in, navigate to Users page
2. You should see a list of users from the backend
3. Try creating a new user
4. Try editing an existing user
5. Try deactivating/reactivating a user
```

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure the backend CORS configuration allows requests from your frontend URL:

```typescript
// umpisa-exam-server/config/cors.ts
{
  origin: ['http://localhost:5173'], // Add your frontend URL
  credentials: true
}
```

### 401 Unauthorized
- Check that the token is being stored in localStorage
- Check that the API interceptor is adding the Authorization header
- Verify the token hasn't expired

### Network Errors
- Ensure the backend server is running
- Check that the API URL in `.env` is correct
- Verify there are no firewall/network issues

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3333/api
```

### Backend (.env)
```env
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=<your-app-key>
DB_CONNECTION=sqlite
# ... other backend configurations
```

## Demo Credentials

```
Email: admin@umpisa.com
Password: Test@123
```

This admin account is created by the backend seeder and has full access to all endpoints.
