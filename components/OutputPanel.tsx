
import React from 'react';

/**
 * Props for the OutputPanel component.
 * @property output - The output to display from the agent.
 * @property isLoading - A boolean indicating whether the agent is currently generating a response.
 * @property error - An error message to display if an error occurred.
 */
interface OutputPanelProps {
  output: string;
  isLoading: boolean;
  error: string | null;
}

/**
 * A component for displaying the agent's response.
 * @param {OutputPanelProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered output panel component.
 */
export const OutputPanel: React.FC<OutputPanelProps> = ({ output, isLoading, error }) => {
  return (
    <div className="flex-grow flex flex-col bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-gray-100">Agent Response</h2>
      </div>
      <div className="p-4 flex-grow overflow-y-auto">
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-400"></div>
          </div>
        )}
        {error && <div className="text-red-400 bg-red-900/20 p-3 rounded-md">{error}</div>}
        {!isLoading && !error && (
          <pre className="whitespace-pre-wrap text-sm text-gray-300 font-sans">{output || 'The agent\'s response will appear here.'}</pre>
        )}
      </div>
    </div>
  );
};
