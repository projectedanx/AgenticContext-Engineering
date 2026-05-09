import React from "react";
import { ContextEditorCard } from "./ContextEditorCard";
import { BookIcon } from "./IconComponents";
import { useAutoSave } from "../hooks/useAutoSave";

/**
 * Props for the KnowledgeEditor component.
 * @property value - The current value of the knowledge editor.
 * @property onChange - A callback function to handle changes to the knowledge value.
 * @property storageKey - The key to use for storing the knowledge value in local storage.
 */
interface KnowledgeEditorProps {
  /** The Value property. */
    value: string;
  /** The On change property. */
    onChange: (value: string) => void;
  /** The Storage key property. */
    storageKey: string;
}

/**
 * A component for editing the agent's knowledge base.
 * @param {KnowledgeEditorProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered knowledge editor component.
 */
export const KnowledgeEditor: React.FC<KnowledgeEditorProps> = ({
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
      title="Knowledge (RAG)"
      icon={<BookIcon className="w-5 h-5" />}
      statusIndicator={getStatusIndicator()}
    >
      <p className="text-sm text-gray-400 mb-3">
        Provide retrieved information from external sources (documents,
        databases) to ground the agent.
      </p>
      <textarea
        value={value}
        onChange={(e) => handleValueChange(e.target.value)}
        className="w-full h-32 bg-gray-900 border border-gray-600 rounded-md p-2 text-sm text-gray-200 focus:ring-2 focus:ring-violet-500 focus:outline-none resize-y"
        placeholder="Paste relevant documents or data here..."
      />
    </ContextEditorCard>
  );
};
