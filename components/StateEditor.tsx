import React, { useState, useEffect } from "react";
import { ContextEditorCard } from "./ContextEditorCard";
import { ServerIcon } from "./IconComponents";
import { useAutoSave } from "../hooks/useAutoSave";

/**
 * Props for the StateEditor component.
 * @property value - The current value of the state editor.
 * @property onChange - A callback function to handle changes to the state value.
 * @property storageKey - The key to use for storing the state value in local storage.
 */
interface StateEditorProps {
  value: string;
  onChange: (value: string) => void;
  storageKey: string;
}

/**
 * A component for editing the agent's state as a JSON object.
 * @param {StateEditorProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered state editor component.
 */
export const StateEditor: React.FC<StateEditorProps> = ({
  value,
  onChange,
  storageKey,
}) => {
  const [isValidJson, setIsValidJson] = useState(true);

  const { saveStatus, handleValueChange } = useAutoSave({
    value,
    onChange,
    storageKey,
  });

  useEffect(() => {
    try {
      JSON.parse(value);
      setIsValidJson(true);
    } catch (e) {
      setIsValidJson(false);
    }
  }, [value]);

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
      title="State"
      icon={<ServerIcon className="w-5 h-5" />}
      statusIndicator={getStatusIndicator()}
    >
      <p className="text-sm text-gray-400 mb-3">
        Define the current world state (e.g., open files, user info) as a JSON
        object.
      </p>
      <textarea
        value={value}
        onChange={(e) => handleValueChange(e.target.value)}
        className={`w-full h-32 bg-gray-900 border rounded-md p-2 font-mono text-sm text-gray-200 focus:ring-2 focus:ring-violet-500 focus:outline-none resize-y ${isValidJson ? "border-gray-600" : "border-red-500"}`}
        placeholder={`{\n  "key": "value"\n}`}
      />
      {!isValidJson && (
        <p className="text-xs text-red-400 mt-1">Invalid JSON format.</p>
      )}
    </ContextEditorCard>
  );
};
