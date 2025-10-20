
import React from 'react';
import { WandIcon } from './IconComponents';

/**
 * Props for the QueryInput component.
 * @property value - The current value of the query input.
 * @property onChange - A callback function to handle changes to the query value.
 * @property onGenerate - A callback function to handle the generate button click.
 * @property isLoading - A boolean indicating whether the agent is currently generating a response.
 */
interface QueryInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

/**
 * A component for inputting the user's query and triggering the agent.
 * @param {QueryInputProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered query input component.
 */
export const QueryInput: React.FC<QueryInputProps> = ({ value, onChange, onGenerate, isLoading }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 flex flex-col gap-4">
       <div>
        <label htmlFor="query-input" className="block text-lg font-semibold text-gray-100 mb-2">User Query</label>
        <textarea
            id="query-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-28 bg-gray-900 border border-gray-600 rounded-md p-2 text-sm text-gray-200 focus:ring-2 focus:ring-violet-500 focus:outline-none resize-y"
            placeholder="Enter your request for the agent..."
        />
       </div>
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-900/50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
      >
        <WandIcon className="w-5 h-5" />
        {isLoading ? 'Generating...' : 'Run Agent'}
      </button>
    </div>
  );
};
