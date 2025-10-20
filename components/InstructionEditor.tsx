import React, { useState, useEffect, useRef } from 'react';
import { ContextEditorCard } from './ContextEditorCard';
import { BrainCircuitIcon } from './IconComponents';

/**
 * Props for the InstructionEditor component.
 * @property value - The current value of the instruction editor.
 * @property onChange - A callback function to handle changes to the instruction value.
 * @property storageKey - The key to use for storing the instruction value in local storage.
 */
interface InstructionEditorProps {
  value: string;
  onChange: (value: string) => void;
  storageKey: string;
}

/**
 * A component for editing the agent's core instructions.
 * @param {InstructionEditorProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered instruction editor component.
 */
export const InstructionEditor: React.FC<InstructionEditorProps> = ({ value, onChange, storageKey }) => {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'unsaved' | 'saving' | 'saved'>('idle');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (saveStatus === 'unsaved') {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setSaveStatus('saving');
      timerRef.current = window.setTimeout(() => {
        localStorage.setItem(storageKey, value);
        setSaveStatus('saved');
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, storageKey]);
  
  useEffect(() => {
      if (saveStatus === 'saved') {
          const timer = setTimeout(() => setSaveStatus('idle'), 2000);
          return () => clearTimeout(timer);
      }
  }, [saveStatus]);

  const handleValueChange = (newValue: string) => {
    setSaveStatus('unsaved');
    onChange(newValue);
  };
  
  const getStatusIndicator = () => {
    switch(saveStatus) {
      case 'unsaved':
        return <span className="text-xs text-yellow-400">Unsaved changes</span>;
      case 'saving':
        return <span className="text-xs text-blue-400">Saving...</span>;
      case 'saved':
        return <span className="text-xs text-green-400">Saved</span>;
      default:
        return null;
    }
  };

  return (
    <ContextEditorCard title="Core Instructions" icon={<BrainCircuitIcon className="w-5 h-5" />} statusIndicator={getStatusIndicator()}>
      <p className="text-sm text-gray-400 mb-3">Define the agent's persona, core directives, and operational rules.</p>
      <textarea
        value={value}
        onChange={(e) => handleValueChange(e.target.value)}
        className="w-full h-48 bg-gray-900 border border-gray-600 rounded-md p-2 text-sm text-gray-200 focus:ring-2 focus:ring-violet-500 focus:outline-none resize-y"
        placeholder="e.g., You are an expert AI coding agent..."
      />
    </ContextEditorCard>
  );
};