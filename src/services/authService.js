import api from './api';

// PLACEHOLDER: These will be replaced with actual API calls to AdonisJS backend
const authService = {
  // Login user
  login: async (email, password) => {
    try {
      // PLACEHOLDER: Replace with actual API call
      // const response = await api.post('/auth/login', { email, password });
      
      // Mock response for now
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      if (email === 'admin@example.com' && password === 'password') {
        const mockResponse = {
          data: {
            token: 'mock-jwt-token-' + Date.now(),
            user: {
              id: 1,
              name: 'Admin User',
              email: 'admin@example.com',
              role: 'admin'
            }
          }
        };
        return mockResponse.data;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      // PLACEHOLDER: Replace with actual API call
      // await api.post('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      // Even if API fails, clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      // PLACEHOLDER: Replace with actual API call
      // const response = await api.get('/auth/me');
      
      // Mock response for now
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        return JSON.parse(storedUser);
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
};

export default authService;
