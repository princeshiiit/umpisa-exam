# User Management System

A full-featured user management CRUD application built with React, featuring authentication, proper routing, state management, reusable components, and comprehensive testing.

## Features

- 🔐 **Authentication System**: Secure login/logout functionality
- 👥 **User Management**: Complete CRUD operations for users
- 🎨 **Reusable Components**: Modular and maintainable component architecture
- 🧪 **Unit Tests**: Comprehensive test coverage with Vitest
- 🎯 **Proper Routing**: React Router implementation with protected routes
- 📱 **Responsive Design**: Mobile-friendly interface
- 🔍 **Search & Filter**: User list with search and status filtering
- ⚡ **Modern Stack**: React 19, Vite, Axios

## Application Screens

1. **Login Page**: User authentication
2. **Dashboard**: Overview and quick actions
3. **User List**: View all users with search and filter
4. **User Detail**: View individual user information
5. **Create User**: Add new users to the system
6. **Edit User**: Update existing user information

## Prerequisites

- Node.js (v20.19.0 or higher recommended)
- npm (v10.x or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd umpisa-exam
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

## Testing

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

## Project Structure

```
umpisa-exam/
├── src/
│   ├── __tests__/          # Unit tests
│   │   ├── Button.test.jsx
│   │   ├── Input.test.jsx
│   │   ├── Login.test.jsx
│   │   ├── validation.test.js
│   │   └── setup.js
│   ├── components/         # Reusable components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Layout.jsx
│   │   ├── Loader.jsx
│   │   ├── Modal.jsx
│   │   └── PrivateRoute.jsx
│   ├── context/           # React context providers
│   │   └── AuthContext.jsx
│   ├── hooks/             # Custom hooks
│   │   └── useForm.js
│   ├── pages/             # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── UserDetail.jsx
│   │   ├── UserForm.jsx
│   │   └── UserList.jsx
│   ├── services/          # API service layer
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── userService.js
│   ├── utils/             # Utility functions
│   │   └── validation.js
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── package.json
├── vite.config.js
├── vitest.config.js
└── README.md
```

## Demo Credentials

**Email**: admin@example.com  
**Password**: password

## API Integration

The application is currently using **placeholder/mock data** in the service layer. The API service is structured to easily integrate with an AdonisJS + PostgreSQL backend.

### Service Layer Structure

- `src/services/api.js`: Axios configuration with interceptors
- `src/services/authService.js`: Authentication endpoints (placeholder)
- `src/services/userService.js`: User CRUD endpoints (placeholder)

### Integrating Real Backend

1. Set the API base URL in `.env`:
```
VITE_API_URL=http://localhost:3333/api
```

2. Update the service methods in:
   - `src/services/authService.js`
   - `src/services/userService.js`

Replace the mock implementations with actual API calls (commented as `PLACEHOLDER`).

## Code Standards & Best Practices

### Component Design
- **Reusability**: All UI components are designed to be reusable
- **Props Validation**: Components use proper prop typing
- **Separation of Concerns**: Logic separated from presentation

### State Management
- **Context API**: Used for global auth state
- **Custom Hooks**: Form handling with `useForm` hook
- **Local State**: Component-level state with React hooks

### Routing
- **React Router v6**: Modern routing implementation
- **Protected Routes**: Authentication-based route protection
- **Nested Routes**: Proper route hierarchy

### Testing
- **Unit Tests**: Component and utility function tests
- **Testing Library**: React Testing Library for component tests
- **Vitest**: Fast unit test runner
- **Coverage**: Tests cover critical functionality

### Code Organization
- Clear folder structure
- Modular components
- Centralized API services
- Utility functions for common operations

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run unit tests |
| `npm run test:ui` | Run tests with UI |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Run ESLint |

## Technology Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.x
- **Routing**: React Router DOM 7.x
- **HTTP Client**: Axios 1.x
- **Testing**: Vitest + React Testing Library
- **Styling**: CSS Modules
- **State Management**: React Context API

## Features Implementation

### Authentication
- Login with email/password
- JWT token management
- Session persistence (localStorage)
- Protected routes
- Auto-redirect on unauthorized access

### User Management
- **Create**: Add new users with validation
- **Read**: View user list and individual details
- **Update**: Edit user information
- **Delete**: Remove users with confirmation
- **Search**: Filter users by name/email
- **Status Filter**: Filter by active/inactive status

## Future Enhancements

- [ ] Password reset functionality
- [ ] User profile editing
- [ ] Role-based access control
- [ ] Pagination for user list
- [ ] Advanced filtering options
- [ ] Export user data
- [ ] Integration with AdonisJS backend
- [ ] E2E testing with Playwright/Cypress

## License

This project is for examination purposes.

## Author

Developed as part of UMPISA technical examination.

