import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ToolEditor } from './ToolEditor';
import { useState } from 'react';
import { Tool } from '../types';

const ToolEditorWrapper = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  return <ToolEditor tools={tools} setTools={setTools} />;
};

describe('ToolEditor', () => {
  it('renders initial empty state with add button', () => {
    render(<ToolEditorWrapper />);
    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('+ Add Tool')).toBeInTheDocument();
  });

  it('adds a new tool', () => {
    render(<ToolEditorWrapper />);
    fireEvent.click(screen.getByText('+ Add Tool'));
    expect(screen.getByPlaceholderText('Tool Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
  });

  it('validates tool name with invalid characters', () => {
    render(<ToolEditorWrapper />);
    fireEvent.click(screen.getByText('+ Add Tool'));

    const nameInput = screen.getByPlaceholderText('Tool Name');
    fireEvent.change(nameInput, { target: { value: 'invalid-name!' } });

    expect(screen.getByText('Tool name can only contain letters, numbers, and underscores')).toBeInTheDocument();
  });

  it('validates empty tool name', () => {
    render(<ToolEditorWrapper />);
    fireEvent.click(screen.getByText('+ Add Tool'));

    const nameInput = screen.getByPlaceholderText('Tool Name');
    fireEvent.change(nameInput, { target: { value: 'valid_name' } }); // first valid
    fireEvent.change(nameInput, { target: { value: '' } }); // then empty

    expect(screen.getByText('Tool name is required')).toBeInTheDocument();
  });

  it('removes a tool', () => {
    render(<ToolEditorWrapper />);
    fireEvent.click(screen.getByText('+ Add Tool'));
    expect(screen.getByPlaceholderText('Tool Name')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Remove Tool'));
    expect(screen.queryByPlaceholderText('Tool Name')).not.toBeInTheDocument();
  });

  it('adds a parameter to a tool', () => {
    render(<ToolEditorWrapper />);
    fireEvent.click(screen.getByText('+ Add Tool'));

    fireEvent.click(screen.getByText('+ Add Parameter'));
    expect(screen.getByPlaceholderText('Param Name')).toBeInTheDocument();

    // There are 2 "Description" placeholders now, one for tool, one for param.
    // The second one should be the param description based on DOM order.
    const descriptionInputs = screen.getAllByPlaceholderText('Description');
    expect(descriptionInputs).toHaveLength(2);
  });

  it('updates parameter properties', () => {
    render(<ToolEditorWrapper />);
    fireEvent.click(screen.getByText('+ Add Tool'));
    fireEvent.click(screen.getByText('+ Add Parameter'));

    const paramNameInput = screen.getByPlaceholderText('Param Name');
    fireEvent.change(paramNameInput, { target: { value: 'testParam' } });
    expect(paramNameInput).toHaveValue('testParam');

    const descriptionInputs = screen.getAllByPlaceholderText('Description');
    const paramDescInput = descriptionInputs[1];
    fireEvent.change(paramDescInput, { target: { value: 'param description' } });
    expect(paramDescInput).toHaveValue('param description');

    const reqCheckbox = screen.getByLabelText('Req');
    expect(reqCheckbox).toBeChecked(); // default is true
    fireEvent.click(reqCheckbox);
    expect(reqCheckbox).not.toBeChecked();
  });

  it('removes a parameter', () => {
    render(<ToolEditorWrapper />);
    fireEvent.click(screen.getByText('+ Add Tool'));
    fireEvent.click(screen.getByText('+ Add Parameter'));
    expect(screen.getByPlaceholderText('Param Name')).toBeInTheDocument();

    fireEvent.click(screen.getByText('×')); // the &times; button
    expect(screen.queryByPlaceholderText('Param Name')).not.toBeInTheDocument();
  });
});
