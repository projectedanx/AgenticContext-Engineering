import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PluriversalFeatureDiscovery } from './PluriversalFeatureDiscovery';
import { generateResponse } from '../services/geminiService';

vi.mock('../services/geminiService', () => ({
    generateResponse: vi.fn(),
}));

describe('PluriversalFeatureDiscovery', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the component with empty initial state', () => {
        render(<PluriversalFeatureDiscovery />);

        expect(screen.getByText('Pluriversal Feature Discovery (AEW)')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter your hypothesis/)).toHaveValue('');
        expect(screen.getByRole('button', { name: /Discover Pluriversal Feature/i })).toBeDisabled();
    });

    it('enables the button when hypothesis is entered', () => {
        render(<PluriversalFeatureDiscovery />);

        const input = screen.getByPlaceholderText(/Enter your hypothesis/);
        fireEvent.change(input, { target: { value: 'Test hypothesis' } });

        expect(screen.getByRole('button', { name: /Discover Pluriversal Feature/i })).not.toBeDisabled();
    });

    it('calls generateResponse and displays result when button is clicked', async () => {
        const mockResponse = 'Mocked Cognitive Contract Output';
        (generateResponse as import("vitest").Mock).mockResolvedValue(mockResponse);

        render(<PluriversalFeatureDiscovery />);

        const input = screen.getByPlaceholderText(/Enter your hypothesis/);
        fireEvent.change(input, { target: { value: 'Test hypothesis' } });

        const button = screen.getByRole('button', { name: /Discover Pluriversal Feature/i });
        fireEvent.click(button);

        expect(button).toBeDisabled();
        expect(button).toHaveTextContent(/Executing AEW Protocol/i);

        await waitFor(() => {
            expect(generateResponse).toHaveBeenCalledTimes(1);
        });

        expect(screen.getByText('Cognitive Contract Generated:')).toBeInTheDocument();
        expect(screen.getByText(mockResponse)).toBeInTheDocument();
        expect(button).not.toBeDisabled();
    });

    it('displays an error message when generateResponse fails', async () => {
        const mockError = new Error('Test API Error');
        (generateResponse as import("vitest").Mock).mockRejectedValue(mockError);

        render(<PluriversalFeatureDiscovery />);

        const input = screen.getByPlaceholderText(/Enter your hypothesis/);
        fireEvent.change(input, { target: { value: 'Test hypothesis' } });

        const button = screen.getByRole('button', { name: /Discover Pluriversal Feature/i });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText('Test API Error')).toBeInTheDocument();
        });
    });
});
