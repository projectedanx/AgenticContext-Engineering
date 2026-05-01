import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CollaborationManager } from './CollaborationManager';
import { generateResponse } from '../services/geminiService';
import { vi } from 'vitest';

// @ts-ignore
import { mockGenerateContent } from '../__mocks__/@google/genai';

vi.mock('../services/geminiService', () => ({
  generateResponse: vi.fn(),
  sanitizePromptInput: (input: string) => input,
}));

describe('CollaborationManager', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the dual input zones and synthesize button', () => {
        render(<CollaborationManager />);
        expect(screen.getByText('Symbiotic Collaboration Nexus')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter Human Intuition/Intent...')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter AI Structural Topology...')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Synthesize [Φ = 1.618]' })).toBeInTheDocument();
    });

    it('calls generateResponse with correct paraconsistent protocol on synthesize', async () => {
        (generateResponse as ReturnType<typeof vi.fn>).mockResolvedValue('Synthesis Output [⊘]');

        render(<CollaborationManager />);

        const humanInput = screen.getByPlaceholderText('Enter Human Intuition/Intent...');
        const aiInput = screen.getByPlaceholderText('Enter AI Structural Topology...');
        const button = screen.getByRole('button', { name: 'Synthesize [Φ = 1.618]' });

        fireEvent.change(humanInput, { target: { value: 'Make it fast and chaotic' } });
        fireEvent.change(aiInput, { target: { value: 'Enforce strict bounded contexts' } });
        fireEvent.click(button);

        expect(generateResponse).toHaveBeenCalled();
        const callArgs = (generateResponse as ReturnType<typeof vi.fn>).mock.calls[0][0];

        expect(callArgs.query).toContain('Make it fast and chaotic');
        expect(callArgs.query).toContain('Enforce strict bounded contexts');
        expect(callArgs.query).toContain('Golden Scar Protocol');
        expect(callArgs.query).toContain('[⊘]');
        expect(callArgs.query).toContain('[∇]');

        await waitFor(() => {
            expect(screen.getByText('Synthesis Output [⊘]')).toBeInTheDocument();
        });
    });
});
