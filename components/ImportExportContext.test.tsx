import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ImportExportContext } from './ImportExportContext';

// Mock the file reader
const mockFileReader = {
  readAsText: vi.fn(),
  onload: null as ((e: any) => void) | null,
  onerror: null as (() => void) | null,
};

// @ts-ignore
window.FileReader = vi.fn(() => mockFileReader);

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => 'mock-url');

describe('ImportExportContext', () => {
  const mockProps = {
    instructions: 'Test instructions',
    setInstructions: vi.fn(),
    knowledge: 'Test knowledge',
    setKnowledge: vi.fn(),
    tools: [{ id: '1', name: 'TestTool', description: 'desc', parameters: [] }],
    setTools: vi.fn(),
    memory: 'Test memory',
    setMemory: vi.fn(),
    state: '{"test": true}',
    setState: vi.fn(),
  };

  const originalCreateElement = document.createElement.bind(document);

  beforeEach(() => {
    vi.clearAllMocks();
    mockFileReader.onload = null;
    mockFileReader.onerror = null;
  });

  it('renders the export and import buttons', () => {
    render(<ImportExportContext {...mockProps} />);
    expect(screen.getByText('Export Context')).toBeInTheDocument();
    expect(screen.getByText('Import Context')).toBeInTheDocument();
  });

  it('handles export functionality', () => {
    const mockClick = vi.fn();
    const mockSetAttribute = vi.fn();

    // Mock createElement to intercept 'a' tag creation for download
    const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      if (tagName === 'a') {
        return {
          click: mockClick,
          setAttribute: mockSetAttribute,
        } as unknown as HTMLElement;
      }
      return originalCreateElement(tagName);
    });

    render(<ImportExportContext {...mockProps} />);
    fireEvent.click(screen.getByText('Export Context'));

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockSetAttribute).toHaveBeenCalledWith('download', 'agent_context_export.json');
    expect(mockSetAttribute).toHaveBeenCalledWith('href', expect.stringContaining('data:application/json'));
    expect(mockClick).toHaveBeenCalled();
    expect(screen.getByText('Context exported successfully.')).toBeInTheDocument();

    createElementSpy.mockRestore();
  });

  it('handles valid file import', async () => {
    render(<ImportExportContext {...mockProps} />);

    // Mock the file input change
    const file = new File([JSON.stringify({
      instructions: 'Imported instructions',
      knowledge: 'Imported knowledge',
      tools: [],
      memory: 'Imported memory',
      state: '{"imported": true}'
    })], 'import.json', { type: 'application/json' });

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    // Trigger the onload event
    if (mockFileReader.onload) {
      mockFileReader.onload({ target: { result: JSON.stringify({
        instructions: 'Imported instructions',
        knowledge: 'Imported knowledge',
        tools: [],
        memory: 'Imported memory',
        state: '{"imported": true}'
      }) } });
    }

    await waitFor(() => {
        expect(mockProps.setInstructions).toHaveBeenCalledWith('Imported instructions');
    });

    expect(mockProps.setKnowledge).toHaveBeenCalledWith('Imported knowledge');
    expect(mockProps.setTools).toHaveBeenCalledWith([]);
    expect(mockProps.setMemory).toHaveBeenCalledWith('Imported memory');
    expect(mockProps.setState).toHaveBeenCalledWith('{"imported": true}');

    expect(screen.getByText('Context imported successfully.')).toBeInTheDocument();
  });

  it('displays error for invalid json import', async () => {
    render(<ImportExportContext {...mockProps} />);

    const file = new File(['invalid json data'], 'import.json', { type: 'application/json' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    if (mockFileReader.onload) {
      mockFileReader.onload({ target: { result: 'invalid json data' } });
    }

    await waitFor(() => {
        expect(screen.getByText(/Failed to parse the uploaded file/i)).toBeInTheDocument();
    });
  });
});
