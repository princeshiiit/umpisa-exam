import api from './api';

const userService = {
  getUsers: async (params = {}) => {
    try {
      const queryParams = {};
      
      if (params.page) queryParams.page = params.page;
      if (params.limit || params.perPage) queryParams.limit = params.limit || params.perPage || 10;
      if (params.search) queryParams.search = params.search;
      
      const response = await api.get('/users/retrieve', { params: queryParams });
      
      const users = response.data.data.map(user => ({
        id: user.id,
        name: user.fullName || 'N/A',
        email: user.email,
        role: user.role?.name || (user.roleId === 1 ? 'admin' : 'user'),
        roleId: user.roleId,
        status: user.isActive ? 'active' : 'inactive',
        createdAt: new Date(user.createdAt).toISOString().split('T')[0]
      }));
      
      return {
        data: users,
        meta: response.data.meta || {
          total: users.length,
          page: params.page || 1,
          perPage: params.perPage || 10
        }
      };
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const response = await api.get('/users/retrieve');
      const user = response.data.data.find(u => u.id === parseInt(id));
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return {
        id: user.id,
        name: user.fullName || 'N/A',
        email: user.email,
        role: user.role?.name || (user.roleId === 1 ? 'admin' : 'user'),
        roleId: user.roleId,
        status: user.isActive ? 'active' : 'inactive',
        createdAt: new Date(user.createdAt).toISOString().split('T')[0]
      };
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const payload = {
        email: userData.email,
        password: userData.password,
        fullName: userData.name || userData.fullName,
        roleId: userData.roleId || 2 // Default to user role (2)
      };
      
      const response = await api.post('/users', payload);
      const user = response.data.data;
      
      return {
        id: user.id,
        name: user.fullName || 'N/A',
        email: user.email,
        role: user.role?.name || (user.roleId === 1 ? 'admin' : 'user'),
        roleId: user.roleId,
        status: user.isActive ? 'active' : 'inactive',
        createdAt: new Date(user.createdAt).toISOString().split('T')[0]
      };
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      if (error.response?.data?.errors) {
        const validationError = error.response.data.errors[0];
        throw new Error(validationError.message);
      }
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    try {
      const payload = {};
      
      if (userData.email) payload.email = userData.email;
      if (userData.password) payload.password = userData.password;
      if (userData.name || userData.fullName) payload.fullName = userData.name || userData.fullName;
      if (userData.roleId !== undefined) payload.roleId = userData.roleId;
      
      const response = await api.patch(`/users/${id}`, payload);
      const user = response.data.data;
      
      return {
        id: user.id,
        name: user.fullName || 'N/A',
        email: user.email,
        role: user.role?.name || (user.roleId === 1 ? 'admin' : 'user'),
        roleId: user.roleId,
        status: user.isActive ? 'active' : 'inactive',
        createdAt: new Date(user.createdAt).toISOString().split('T')[0]
      };
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      if (error.response?.data?.errors) {
        const validationError = error.response.data.errors[0];
        throw new Error(validationError.message);
      }
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}/deactivate`);
      return { 
        success: true,
        message: response.data.message 
      };
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  deactivateUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}/deactivate`);
      return { 
        success: true,
        message: response.data.message 
      };
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  reactivateUser: async (id) => {
    try {
      const response = await api.patch(`/users/${id}/reactivate`);
      const user = response.data.data;
      
      return {
        id: user.id,
        name: user.fullName || 'N/A',
        email: user.email,
        role: user.role?.name || (user.roleId === 1 ? 'admin' : 'user'),
        roleId: user.roleId,
        status: user.isActive ? 'active' : 'inactive',
        createdAt: new Date(user.createdAt).toISOString().split('T')[0]
      };
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  regeneratePassword: async (id) => {
    try {
      const response = await api.post(`/users/${id}/regenerate-password`);
      return {
        success: true,
        message: response.data.message,
        newPassword: response.data.data.newPassword,
        email: response.data.data.email,
        fullName: response.data.data.fullName
      };
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }
};

export default userService;
