import api from './api';

// Mock data for demonstration
let mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', createdAt: '2024-01-15' },
  { id: 2, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', createdAt: '2024-02-20' },
  { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', createdAt: '2024-03-10' },
  { id: 4, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'inactive', createdAt: '2024-04-05' },
];

// PLACEHOLDER: These will be replaced with actual API calls to AdonisJS backend
const userService = {
  // Get all users
  getUsers: async (params = {}) => {
    try {
      // PLACEHOLDER: Replace with actual API call
      // const response = await api.get('/users', { params });
      
      // Mock response for now
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
      
      let filteredUsers = [...mockUsers];
      
      // Apply filters if any
      if (params.search) {
        const search = params.search.toLowerCase();
        filteredUsers = filteredUsers.filter(user => 
          user.name.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search)
        );
      }
      
      if (params.status) {
        filteredUsers = filteredUsers.filter(user => user.status === params.status);
      }
      
      return {
        data: filteredUsers,
        meta: {
          total: filteredUsers.length,
          page: params.page || 1,
          perPage: params.perPage || 10
        }
      };
    } catch (error) {
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      // PLACEHOLDER: Replace with actual API call
      // const response = await api.get(`/users/${id}`);
      
      await new Promise(resolve => setTimeout(resolve, 200));
      const user = mockUsers.find(u => u.id === parseInt(id));
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  },

  // Create new user
  createUser: async (userData) => {
    try {
      // PLACEHOLDER: Replace with actual API call
      // const response = await api.post('/users', userData);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newUser = {
        id: mockUsers.length + 1,
        ...userData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      mockUsers.push(newUser);
      return newUser;
    } catch (error) {
      throw error;
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      // PLACEHOLDER: Replace with actual API call
      // const response = await api.put(`/users/${id}`, userData);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const index = mockUsers.findIndex(u => u.id === parseInt(id));
      if (index === -1) {
        throw new Error('User not found');
      }
      
      mockUsers[index] = { ...mockUsers[index], ...userData };
      return mockUsers[index];
    } catch (error) {
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      // PLACEHOLDER: Replace with actual API call
      // await api.delete(`/users/${id}`);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const index = mockUsers.findIndex(u => u.id === parseInt(id));
      if (index === -1) {
        throw new Error('User not found');
      }
      
      mockUsers.splice(index, 1);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
};

export default userService;
