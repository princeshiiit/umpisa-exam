/**
 * Validation utilities
 */

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return !!(password && password.length >= 6);
};

export const validateRequired = (value) => {
  return !!(value && value.trim().length > 0);
};

/**
 * Login form validation
 */
export const validateLoginForm = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(values.password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

/**
 * User form validation
 */
export const validateUserForm = (values, isEditing = false) => {
  const errors = {};

  if (!values.name || !validateRequired(values.name)) {
    errors.name = 'Name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!isEditing) {
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(values.password)) {
      errors.password = 'Password must be at least 6 characters';
    }
  }

  if (!values.role) {
    errors.role = 'Role is required';
  }

  return errors;
};
