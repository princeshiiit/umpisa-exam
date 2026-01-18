import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../components/Input';

describe('Input Component', () => {
  it('renders input with label', () => {
    render(
      <Input
        label="Email"
        name="email"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows required asterisk when required', () => {
    render(
      <Input
        label="Email"
        name="email"
        value=""
        onChange={() => {}}
        required
      />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message when touched and has error', () => {
    render(
      <Input
        label="Email"
        name="email"
        value=""
        onChange={() => {}}
        error="Email is required"
        touched={true}
      />
    );
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('does not display error when not touched', () => {
    render(
      <Input
        label="Email"
        name="email"
        value=""
        onChange={() => {}}
        error="Email is required"
        touched={false}
      />
    );
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
  });

  it('calls onChange handler when value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(
      <Input
        label="Email"
        name="email"
        value=""
        onChange={handleChange}
      />
    );
    
    const input = screen.getByLabelText('Email');
    await user.type(input, 'test');
    
    expect(handleChange).toHaveBeenCalled();
  });
});
