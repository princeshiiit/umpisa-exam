import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from '../components/Button';

describe('Button Component', () => {
  it('renders button with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies primary variant class by default', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-primary');
  });

  it('applies correct variant class', () => {
    render(<Button variant="danger">Delete</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-danger');
  });

  it('applies correct size class', () => {
    render(<Button size="small">Small</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-small');
  });

  it('applies fullWidth class when specified', () => {
    render(<Button fullWidth>Full Width</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-full');
  });

  it('disables button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
