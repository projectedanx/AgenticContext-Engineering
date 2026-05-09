import React from "react";
import { ContextEditorCard } from "./ContextEditorCard";
import { MemoryIcon } from "./IconComponents";
import { useAutoSave } from "../hooks/useAutoSave";

/**
 * Props for the MemoryEditor component.
 * @property value - The current value of the memory editor.
 * @property onChange - A callback function to handle changes to the memory value.
 * @property storageKey - The key to use for storing the memory value in local storage.
 */
interface MemoryEditorProps {
  /** The Value property. */
    value: string;
  /** The On change property. */
    onChange: (value: string) => void;
  /** The Storage key property. */
    storageKey: string;
}

/**
 * A component for editing the agent's memory.
 * @param {MemoryEditorProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered memory editor component.
 */
export const MemoryEditor: React.FC<MemoryEditorProps> = ({
  value,
  onChange,
  storageKey,
}) => {
  const { saveStatus, handleValueChange } = useAutoSave({
    value,
    onChange,
    storageKey,
  });

  const getStatusIndicator = () => {
    switch (saveStatus) {
      case "unsaved":
        return <span className="text-xs text-yellow-400">Unsaved changes</span>;
      case "saving":
        return <span className="text-xs text-blue-400">Saving...</span>;
      case "saved":
        return <span className="text-xs text-green-400">Saved</span>;
      default:
        return null;
    }
  };

  return (
    <ContextEditorCard
      title="Memory"
      icon={<MemoryIcon className="w-5 h-5" />}
      statusIndicator={getStatusIndicator()}
    >
      <p className="text-sm text-gray-400 mb-3">
        Include short-term conversation history or long-term learned facts about
        the user/project.
      </p>
      <textarea
        value={value}
        onChange={(e) => handleValueChange(e.target.value)}
        className="w-full h-24 bg-gray-900 border border-gray-600 rounded-md p-2 text-sm text-gray-200 focus:ring-2 focus:ring-violet-500 focus:outline-none resize-y"
        placeholder="e.g., User: 'What's the status?' Agent: 'I'm working on the auth feature.'"
      />
    </ContextEditorCard>
  );
};
