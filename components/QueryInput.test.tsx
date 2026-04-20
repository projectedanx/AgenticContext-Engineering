import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QueryInput } from './QueryInput';

describe('QueryInput', () => {
  it('renders correctly with default props', () => {
    render(<QueryInput value="" onChange={() => {}} onGenerate={() => {}} isLoading={false} />);
    expect(screen.getByLabelText('User Query')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your request for the agent...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Run Agent/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Run Agent/i })).not.toBeDisabled();
  });

  it('displays the provided value', () => {
    render(<QueryInput value="Test query" onChange={() => {}} onGenerate={() => {}} isLoading={false} />);
    expect(screen.getByDisplayValue('Test query')).toBeInTheDocument();
  });

  it('calls onChange when the input changes', () => {
    const handleChange = vi.fn();
    render(<QueryInput value="" onChange={handleChange} onGenerate={() => {}} isLoading={false} />);

    const input = screen.getByLabelText('User Query');
    fireEvent.change(input, { target: { value: 'New query' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('New query');
  });

  it('calls onGenerate when the button is clicked', () => {
    const handleGenerate = vi.fn();
    render(<QueryInput value="" onChange={() => {}} onGenerate={handleGenerate} isLoading={false} />);

    const button = screen.getByRole('button', { name: /Run Agent/i });
    fireEvent.click(button);

    expect(handleGenerate).toHaveBeenCalledTimes(1);
  });

  it('disables the button and shows "Generating..." when isLoading is true', () => {
    render(<QueryInput value="" onChange={() => {}} onGenerate={() => {}} isLoading={true} />);

    const button = screen.getByRole('button', { name: /Generating\.\.\./i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
