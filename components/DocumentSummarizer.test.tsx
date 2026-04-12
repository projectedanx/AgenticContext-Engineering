import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DocumentSummarizer, chunkDocument } from './DocumentSummarizer';
import { summarizeDocument } from '../services/geminiService';

vi.mock('../services/geminiService', () => ({
  summarizeDocument: vi.fn(),
}));

describe('chunkDocument', () => {
  it('returns an empty array for empty string', () => {
    expect(chunkDocument('')).toEqual([]);
  });

  it('returns a single chunk if text is shorter than chunkSize', () => {
    const text = 'Hello world';
    const chunkSize = 20;
    expect(chunkDocument(text, chunkSize)).toEqual(['Hello world']);
  });

  it('returns a single chunk if text is exactly chunkSize', () => {
    const text = '12345';
    const chunkSize = 5;
    expect(chunkDocument(text, chunkSize)).toEqual(['12345']);
  });

  it('returns multiple chunks if text is longer than chunkSize', () => {
    const text = 'abcdefghij'; // 10 chars
    const chunkSize = 3;
    expect(chunkDocument(text, chunkSize)).toEqual(['abc', 'def', 'ghi', 'j']);
  });

  it('uses default chunkSize of 2000', () => {
    const text = 'a'.repeat(2001);
    const result = chunkDocument(text);
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveLength(2000);
    expect(result[1]).toHaveLength(1);
  });

  it('returns empty array if chunkSize is 0 or negative', () => {
    expect(chunkDocument('test', 0)).toEqual([]);
    expect(chunkDocument('test', -1)).toEqual([]);
  });
});

describe('DocumentSummarizer component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<DocumentSummarizer />);
    expect(screen.getByText('Document Summarizer')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Paste a long document here...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Generate Summary/i })).toBeInTheDocument();
  });

  it('enables the button only when text is entered', () => {
    render(<DocumentSummarizer />);
    const button = screen.getByRole('button', { name: /Generate Summary/i });
    const textarea = screen.getByPlaceholderText('Paste a long document here...');

    expect(button).toBeDisabled();

    fireEvent.change(textarea, { target: { value: 'Some text' } });
    expect(button).not.toBeDisabled();

    fireEvent.change(textarea, { target: { value: '   ' } });
    expect(button).toBeDisabled();
  });

  it('calls summarizeDocument and displays the summary', async () => {
    (summarizeDocument as vi.Mock).mockResolvedValue('This is a summary.');

    render(<DocumentSummarizer />);
    const textarea = screen.getByPlaceholderText('Paste a long document here...');
    const button = screen.getByRole('button', { name: /Generate Summary/i });

    fireEvent.change(textarea, { target: { value: 'Long document text' } });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Summarizing...');

    await waitFor(() => {
      expect(summarizeDocument).toHaveBeenCalledWith('Long document text');
    });

    expect(screen.getByText('Summary:')).toBeInTheDocument();
    expect(screen.getByText('This is a summary.')).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent('Generate Summary');
  });

  it('handles multiple chunks and joins summaries', async () => {
    (summarizeDocument as vi.Mock)
      .mockResolvedValueOnce('Summary 1')
      .mockResolvedValueOnce('Summary 2');

    // Default chunkSize is 2000. Let's provide 3000 chars.
    const longText = 'a'.repeat(3000);

    render(<DocumentSummarizer />);
    const textarea = screen.getByPlaceholderText('Paste a long document here...');
    const button = screen.getByRole('button', { name: /Generate Summary/i });

    fireEvent.change(textarea, { target: { value: longText } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(summarizeDocument).toHaveBeenCalledTimes(2);
    });

    expect(await screen.findByText(/Summary 1\s+Summary 2/i)).toBeInTheDocument();
  });

  it('displays an error message when summarization fails', async () => {
    (summarizeDocument as vi.Mock).mockRejectedValue(new Error('API Failure'));

    render(<DocumentSummarizer />);
    const textarea = screen.getByPlaceholderText('Paste a long document here...');
    const button = screen.getByRole('button', { name: /Generate Summary/i });

    fireEvent.change(textarea, { target: { value: 'Text to summarize' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('API Failure')).toBeInTheDocument();
    });
  });
});
