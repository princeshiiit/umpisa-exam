import api from './api';

const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      const { user, token } = response.data.data;
      const transformedUser = {
        id: user.id,
        name: user.fullName,
        email: user.email,
        role: user.role?.name || 'user',
        roleId: user.roleId,
        isActive: user.isActive
      };
      
      return {
        token: token.value,
        user: transformedUser
      };
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
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
