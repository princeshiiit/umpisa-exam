import { describe, it, expect } from 'vitest';
import { validateEmail, validatePassword, validateRequired, validateLoginForm, validateUserForm } from '../utils/validation';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('validates correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('invalidates incorrect email', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('validates password with minimum length', () => {
      expect(validatePassword('password')).toBe(true);
      expect(validatePassword('123456')).toBe(true);
    });

    it('invalidates short password', () => {
      expect(validatePassword('12345')).toBe(false);
      expect(validatePassword('')).toBe(false);
    });
  });

  describe('validateRequired', () => {
    it('validates non-empty value', () => {
      expect(validateRequired('value')).toBe(true);
    });

    it('invalidates empty value', () => {
      expect(validateRequired('')).toBe(false);
      expect(validateRequired('   ')).toBe(false);
    });
  });

  describe('validateLoginForm', () => {
    it('returns no errors for valid form', () => {
      const values = {
        email: 'test@example.com',
        password: 'password123'
      };
      const errors = validateLoginForm(values);
      expect(Object.keys(errors).length).toBe(0);
    });

    it('returns errors for invalid form', () => {
      const values = {
        email: 'invalid-email',
        password: '123'
      };
      const errors = validateLoginForm(values);
      expect(errors.email).toBeDefined();
      expect(errors.password).toBeDefined();
    });
  });

  describe('validateUserForm', () => {
    it('returns no errors for valid form', () => {
      const values = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user'
      };
      const errors = validateUserForm(values);
      expect(Object.keys(errors).length).toBe(0);
    });

    it('returns errors for empty name', () => {
      const values = {
        name: '',
        email: 'john@example.com',
        password: 'password123',
        role: 'user'
      };
      const errors = validateUserForm(values);
      expect(errors.name).toBeDefined();
    });

    it('does not require password when editing', () => {
      const values = {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user'
      };
      const errors = validateUserForm(values, true);
      expect(errors.password).toBeUndefined();
    });
  });
});
