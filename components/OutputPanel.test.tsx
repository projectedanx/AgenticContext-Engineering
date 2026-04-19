import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OutputPanel } from './OutputPanel';

describe('OutputPanel', () => {
  it('renders the default placeholder when no output, loading, or error is present', () => {
    render(<OutputPanel output="" isLoading={false} error={null} />);

    expect(screen.getByText('Agent Response')).toBeInTheDocument();
    expect(screen.getByText("The agent's response will appear here.")).toBeInTheDocument();
  });

  it('renders the provided output text', () => {
    const testOutput = "This is a test output from the agent.";
    render(<OutputPanel output={testOutput} isLoading={false} error={null} />);

    expect(screen.getByText(testOutput)).toBeInTheDocument();
    expect(screen.queryByText("The agent's response will appear here.")).not.toBeInTheDocument();
  });

  it('renders a loading spinner when isLoading is true', () => {
    // The spinner is identified by its class names as there isn't a specific accessible role/text
    const { container } = render(<OutputPanel output="" isLoading={true} error={null} />);

    // Check for the spinner element by class name
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();

    // Output text should not be rendered when loading
    expect(screen.queryByText("The agent's response will appear here.")).not.toBeInTheDocument();
  });

  it('renders an error message when error is provided', () => {
    const errorMessage = "An error occurred during processing.";
    render(<OutputPanel output="" isLoading={false} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();

    // Output text should not be rendered when there is an error
    expect(screen.queryByText("The agent's response will appear here.")).not.toBeInTheDocument();
  });

  it('prioritizes loading and error states over output', () => {
    const testOutput = "Some output text";
    const errorMessage = "An error occurred";

    // Both loading and error, loading spinner and error message should be displayed, output shouldn't
    const { container } = render(<OutputPanel output={testOutput} isLoading={true} error={errorMessage} />);

    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByText(testOutput)).not.toBeInTheDocument();
  });
});
