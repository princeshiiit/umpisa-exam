import { useState, useEffect } from 'react';

/**
 * Custom hook for form validation
 * @param {Object} initialValues - Initial form values
 * @param {Function} validate - Validation function that returns errors object
 * @returns {Object} Form state and handlers
 */
export const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
    }
  }, [values, validate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  const setFieldValue = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    setFieldValue,
    isValid: Object.keys(errors).length === 0
  };
};
