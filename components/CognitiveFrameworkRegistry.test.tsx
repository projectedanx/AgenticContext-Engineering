import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CognitiveFrameworkRegistry } from './CognitiveFrameworkRegistry';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('CognitiveFrameworkRegistry', () => {
    it('renders the component title and description', () => {
        render(<CognitiveFrameworkRegistry />);
        expect(screen.getByText('Cognitive Framework Registry')).toBeInTheDocument();
        expect(screen.getByText(/Select a Cognitive Framework to inspect/i)).toBeInTheDocument();
    });

    it('renders the list of frameworks', () => {
        render(<CognitiveFrameworkRegistry />);
        expect(screen.getByText('ReAct (Reasoning + Acting)')).toBeInTheDocument();
        expect(screen.getByText('CRISP-DM')).toBeInTheDocument();
        expect(screen.getByText('OODA (Observe, Orient, Decide, Act)')).toBeInTheDocument();
        expect(screen.getByText('PEER (Plan, Execute, Express, Review)')).toBeInTheDocument();
        expect(screen.getByText('Tree of Thoughts (ToT)')).toBeInTheDocument();
        expect(screen.getByText('Reflexion')).toBeInTheDocument();
    });

    it('displays framework details when clicked', () => {
        render(<CognitiveFrameworkRegistry />);

        // Ensure details are not initially visible
        expect(screen.queryByText('BizUnd -> DataUnd -> Prep -> Model -> Eval -> Deploy')).not.toBeInTheDocument();

        // Click the CRISP-DM framework
        const crispDmCard = screen.getByText('CRISP-DM');
        fireEvent.click(crispDmCard);

        // Verify details are now visible
        expect(screen.getByText('BizUnd -> DataUnd -> Prep -> Model -> Eval -> Deploy')).toBeInTheDocument();
        expect(screen.getByText(/Sequential meta-prompt for data agents/i)).toBeInTheDocument();
    });
});
