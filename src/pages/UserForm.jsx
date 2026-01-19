import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userService from '../services/userService';
import { useForm } from '../hooks/useForm';
import { validateUserForm } from '../utils/validation';
import { getRoleId } from '../utils/constants';
import { useToast } from '../context/ToastContext';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import './UserForm.css';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [error, setError] = useState('');
  const toast = useToast();

  const { values, errors, touched, handleChange, handleBlur, setFieldValue, resetForm } = useForm(
    {
      name: '',
      email: '',
      password: '',
      role: 'user',
      status: 'active'
    },
    (vals) => validateUserForm(vals, isEditing)
  );

  useEffect(() => {
    if (isEditing) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      setInitialLoading(true);
      const userData = await userService.getUserById(id);
      setFieldValue('name', userData.name);
      setFieldValue('email', userData.email);
      setFieldValue('role', userData.role);
      setFieldValue('status', userData.status);
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('Failed to load user data');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = {
        name: values.name,
        email: values.email,
        roleId: getRoleId(values.role),
        status: values.status
      };

      if (!isEditing && values.password) {
        userData.password = values.password;
      }

      if (isEditing) {
        await userService.updateUser(id, userData);
        toast.success('User updated successfully');
      } else {
        await userService.createUser(userData);
        toast.success('User created successfully');
        resetForm();
      }

      navigate('/users');
    } catch (err) {
      const errorMessage = err.message || 'Failed to save user';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="user-form-page">
      <div className="user-form-header">
        <h1>{isEditing ? 'Edit User' : 'Create New User'}</h1>
      </div>

      <Card>
        {error && (
          <div className="alert alert-error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="user-form">
          <Input
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
            placeholder="Enter full name"
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
            placeholder="Enter email address"
            required
          />

          {!isEditing && (
            <Input
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              placeholder="Enter password"
              required
            />
          )}

          <div className="input-group">
            <label htmlFor="role" className="input-label">
              Role<span className="input-required">*</span>
            </label>
            <select
              id="role"
              name="role"
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input-field"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="status" className="input-label">
              Status<span className="input-required">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input-field"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="form-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="success"
              disabled={loading || Object.keys(errors).length > 0}
            >
              {loading ? 'Saving...' : isEditing ? 'Update User' : 'Create User'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UserForm;
