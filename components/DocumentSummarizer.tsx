
import React, { useState } from 'react';
import { summarizeDocument } from '../services/geminiService';
import { FileTextIcon } from './IconComponents';

export const DocumentSummarizer: React.FC = () => {
  const [documentText, setDocumentText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    if (!documentText.trim()) {
      setError('Please enter some text to summarize.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSummary('');
    try {
      const result = await summarizeDocument(documentText);
      setSummary(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
      <div className="flex items-center gap-3 p-4 border-b border-gray-700">
        <FileTextIcon className="w-5 h-5 text-violet-400" />
        <h2 className="text-lg font-semibold text-gray-100">Document Summarizer</h2>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <label htmlFor="document-input" className="block text-sm font-medium text-gray-300 mb-2">
            Document to Summarize
          </label>
          <textarea
            id="document-input"
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            className="w-full h-40 bg-gray-900 border border-gray-600 rounded-md p-2 text-sm text-gray-200 focus:ring-2 focus:ring-violet-500 focus:outline-none resize-y"
            placeholder="Paste a long document here..."
          />
        </div>
        <button
          onClick={handleSummarize}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-900/50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
        >
          {isLoading ? 'Summarizing...' : 'Generate Summary'}
        </button>
        {error && <div className="text-red-400 bg-red-900/20 p-3 rounded-md text-sm">{error}</div>}
        {summary && (
          <div>
            <h3 className="text-md font-semibold text-gray-200 mb-2">Summary:</h3>
            <div className="p-3 bg-gray-900/50 rounded-md border border-gray-700">
                <p className="whitespace-pre-wrap text-sm text-gray-300 font-sans">{summary}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
