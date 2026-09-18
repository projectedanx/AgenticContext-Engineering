import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GoldenScarProtocol } from './GoldenScarProtocol';
import * as geminiService from '../services/geminiService';

vi.mock('../services/geminiService', () => ({
  generateResponse: vi.fn(),
}));

describe('GoldenScarProtocol Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<GoldenScarProtocol />);
    expect(screen.getByText('Golden Scar Protocol Enforcer')).toBeInTheDocument();
    expect(screen.getByText('Topological Derivative')).toBeInTheDocument();
    expect(screen.getByText('Epsilon-Tolerance Tech Debt')).toBeInTheDocument();
  });

  it('calculates topological derivative in dissonance mode', async () => {
    vi.mocked(geminiService.generateResponse).mockResolvedValueOnce('Derivative Result');

    render(<GoldenScarProtocol />);

    const stakeholderAInput = screen.getByPlaceholderText(/Must deliver feature X/i);
    const stakeholderBInput = screen.getByPlaceholderText(/current architecture cannot support/i);

    fireEvent.change(stakeholderAInput, { target: { value: 'Feature by Q3' } });
    fireEvent.change(stakeholderBInput, { target: { value: 'Needs rewrite to Q4' } });

    const calculateBtn = screen.getByText('[ CALCULATE TOPOLOGICAL DERIVATIVE ]');
    fireEvent.click(calculateBtn);

    expect(screen.getByText('[ CALCULATING DERIVATIVE... ]')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('INTERFERENCE FIT MAPPING')).toBeInTheDocument();
      expect(screen.getByText('Derivative Result')).toBeInTheDocument();
    });

    expect(geminiService.generateResponse).toHaveBeenCalledWith(expect.objectContaining({
      instructions: expect.stringContaining('VORTEX-ARCHITECT enforcing the Golden Scar Protocol'),
      query: expect.stringContaining('Feature by Q3')
    }));
  });

  it('evaluates epsilon-tolerance in tech debt mode', async () => {
    vi.mocked(geminiService.generateResponse).mockResolvedValueOnce('Risk Entry Result');

    render(<GoldenScarProtocol />);

    const techDebtTab = screen.getByText('Epsilon-Tolerance Tech Debt');
    fireEvent.click(techDebtTab);

    const techDebtInput = screen.getByPlaceholderText(/Authentication state is currently stored/i);
    fireEvent.change(techDebtInput, { target: { value: 'Global variable used instead of Context' } });

    const evalBtn = screen.getByText('[ GENERATE 11-RISKS-AND-TECHNICAL-DEBT.MD ENTRY ]');
    fireEvent.click(evalBtn);

    expect(screen.getByText('[ EVALUATING... ]')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('TRANSITION FIT (FLOW-MATCHING ALGORITHM)')).toBeInTheDocument();
      expect(screen.getByText('Risk Entry Result')).toBeInTheDocument();
    });

    expect(geminiService.generateResponse).toHaveBeenCalledWith(expect.objectContaining({
      instructions: expect.stringContaining('Epsilon-Tolerance Paraconsistency'),
      query: expect.stringContaining('Global variable used instead of Context')
    }));
  });
});
