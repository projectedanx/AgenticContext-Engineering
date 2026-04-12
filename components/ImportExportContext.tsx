import React, { useRef, useState } from 'react';
import { ContextEditorCard } from './ContextEditorCard';
import { AgentContext, Tool } from '../types';
import { safeJsonParse, isValidTools } from '../services/storageUtils';

interface ImportExportContextProps {
  instructions: string;
  setInstructions: (value: string) => void;
  knowledge: string;
  setKnowledge: (value: string) => void;
  tools: Tool[];
  setTools: (value: Tool[]) => void;
  memory: string;
  setMemory: (value: string) => void;
  state: string;
  setState: (value: string) => void;
}

export const ImportExportContext: React.FC<ImportExportContextProps> = ({
  instructions, setInstructions,
  knowledge, setKnowledge,
  tools, setTools,
  memory, setMemory,
  state, setState
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleExport = () => {
    try {
      const exportData = {
        instructions,
        knowledge,
        tools,
        memory,
        state
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

      const exportFileDefaultName = 'agent_context_export.json';

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();

      setSuccess('Context exported successfully.');
      setTimeout(() => setSuccess(null), 3000);
      setError(null);
    } catch (e) {
      setError('Failed to export context.');
      setSuccess(null);
    }
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);

        // Basic validation
        if (typeof parsedData !== 'object' || parsedData === null) {
           throw new Error("Invalid format");
        }

        if (typeof parsedData.instructions === 'string') setInstructions(parsedData.instructions);
        if (typeof parsedData.knowledge === 'string') setKnowledge(parsedData.knowledge);

        if (isValidTools(parsedData.tools)) {
             setTools(parsedData.tools);
        } else if (parsedData.tools) {
             console.warn("Imported tools were invalid format, skipping.");
        }

        if (typeof parsedData.memory === 'string') setMemory(parsedData.memory);
        if (typeof parsedData.state === 'string') setState(parsedData.state);

        setSuccess('Context imported successfully.');
        setTimeout(() => setSuccess(null), 3000);
        setError(null);

      } catch (err) {
        console.error("Import error:", err);
        setError('Failed to parse the uploaded file. Ensure it is a valid JSON export.');
        setSuccess(null);
      }

      // Reset input so the same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    reader.onerror = () => {
       setError('Failed to read the file.');
       setSuccess(null);
    };

    reader.readAsText(file);
  };

  // Simple Download/Upload icons SVG strings for inline usage
  const downloadIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  );

  const uploadIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
      </svg>
  );


  return (
    <ContextEditorCard title="Import / Export Context" icon={downloadIcon}>
       <p className="text-sm text-gray-400 mb-4">Save your current context configuration as a JSON file, or load a previously saved configuration.</p>

       <div className="flex gap-4">
           <button
                onClick={handleExport}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors text-sm"
            >
               {downloadIcon} Export Context
           </button>

           <button
                onClick={handleImportClick}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded transition-colors text-sm"
            >
               {uploadIcon} Import Context
           </button>
           <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json,application/json"
                className="hidden"
            />
       </div>

       {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
       {success && <p className="text-green-400 text-sm mt-3">{success}</p>}

    </ContextEditorCard>
  );
};
