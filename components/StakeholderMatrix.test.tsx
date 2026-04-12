import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StakeholderMatrix } from './StakeholderMatrix';
import { generateResponse } from '../services/geminiService';

vi.mock('../services/geminiService');

describe('StakeholderMatrix Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders initial state correctly', () => {
    render(<StakeholderMatrix />);
    expect(screen.getByText('Stakeholder & Requirement Topology')).toBeInTheDocument();
    expect(screen.getByDisplayValue('User')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Business')).toBeInTheDocument();
    expect(screen.getByText('Initial MVP Core')).toBeInTheDocument();
  });

  it('adds a new stakeholder', () => {
    render(<StakeholderMatrix />);
    const addButton = screen.getByText('+ Add');
    fireEvent.click(addButton);
    const roleInputs = screen.getAllByPlaceholderText('Role (e.g., Security)');
    expect(roleInputs.length).toBe(3);
  });

  it('analyzes tension correctly', async () => {
    const mockResponse = 'Simulated tension analysis result.';
    vi.mocked(generateResponse).mockResolvedValueOnce(mockResponse);

    render(<StakeholderMatrix />);
    const analyzeButton = screen.getByText('Analyze Tension');

    fireEvent.click(analyzeButton);

    expect(screen.getByText('Analyze Tension')).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText('=== TENSION ANALYSIS ===')).toBeInTheDocument();
      expect(screen.getByText(mockResponse)).toBeInTheDocument();
    });
  });

  it('decomposes epic correctly', async () => {
     const mockResponse = JSON.stringify([
         {
             description: "Test Story 1",
             acceptanceCriteria: ["Criteria 1"],
             complexity: 3
         }
     ]);
     vi.mocked(generateResponse).mockResolvedValueOnce(mockResponse);

     render(<StakeholderMatrix />);
     const decomposeButton = screen.getByText('Decompose');

     fireEvent.click(decomposeButton);

     await waitFor(() => {
         expect(screen.getByText('Story: Test Story 1 (Complexity: 3)')).toBeInTheDocument();
         expect(screen.getByText('Criteria 1')).toBeInTheDocument();
     });
  });
});
