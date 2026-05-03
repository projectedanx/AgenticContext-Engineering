import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TopologicalPersonaSculptor } from './TopologicalPersonaSculptor';
import { generateResponse } from '../services/geminiService';
import '@testing-library/jest-dom';

// Mock the geminiService
vi.mock('../services/geminiService', () => ({
  generateResponse: vi.fn(),
  sanitizePromptInput: vi.fn((input) => input),
}));

describe('TopologicalPersonaSculptor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with inputs and button', () => {
    render(<TopologicalPersonaSculptor />);

    expect(screen.getByText('Topological Persona Causal Sculpting')).toBeInTheDocument();
    expect(screen.getByText(/Empirical Friction/i)).toBeInTheDocument();
    expect(screen.getByText(/Conflicting Directives/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Extrude Persona Specification/i })).toBeInTheDocument();
  });

  it('button is disabled when inputs are empty', () => {
    render(<TopologicalPersonaSculptor />);
    const button = screen.getByRole('button', { name: /Extrude Persona Specification/i });
    expect(button).toBeDisabled();
  });

  it('button is enabled when both inputs have text', () => {
    render(<TopologicalPersonaSculptor />);

    const frictionInput = screen.getByPlaceholderText(/Radio logs indicate/i);
    const directivesInput = screen.getByPlaceholderText(/Maximize extraction yield/i);
    const button = screen.getByRole('button', { name: /Extrude Persona Specification/i });

    fireEvent.change(frictionInput, { target: { value: 'Test friction' } });
    fireEvent.change(directivesInput, { target: { value: 'Test directive' } });

    expect(button).not.toBeDisabled();
  });

  it('calls generateResponse on button click and displays result', async () => {
    (generateResponse as jest.Mock).mockResolvedValue('Mocked YAML Output');

    render(<TopologicalPersonaSculptor />);

    const frictionInput = screen.getByPlaceholderText(/Radio logs indicate/i);
    const directivesInput = screen.getByPlaceholderText(/Maximize extraction yield/i);
    const button = screen.getByRole('button', { name: /Extrude Persona Specification/i });

    fireEvent.change(frictionInput, { target: { value: 'Test friction' } });
    fireEvent.change(directivesInput, { target: { value: 'Test directive' } });
    fireEvent.click(button);

    expect(button).toHaveTextContent(/Initiating Extrusion/i);
    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(generateResponse).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText('Extruded PDT Specification Block:')).toBeInTheDocument();
    expect(screen.getByText('Mocked YAML Output')).toBeInTheDocument();
    expect(button).toHaveTextContent(/Extrude Persona Specification/i);
  });

  it('displays error message if generation fails', async () => {
    (generateResponse as jest.Mock).mockRejectedValue(new Error('Generation failed'));

    render(<TopologicalPersonaSculptor />);

    const frictionInput = screen.getByPlaceholderText(/Radio logs indicate/i);
    const directivesInput = screen.getByPlaceholderText(/Maximize extraction yield/i);
    const button = screen.getByRole('button', { name: /Extrude Persona Specification/i });

    fireEvent.change(frictionInput, { target: { value: 'Test friction' } });
    fireEvent.change(directivesInput, { target: { value: 'Test directive' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Error: Generation failed')).toBeInTheDocument();
    });
  });
});
