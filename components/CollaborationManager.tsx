import React, { useState } from 'react';
import { generateResponse, sanitizePromptInput } from '../services/geminiService';
import { ContextEditorCard } from './ContextEditorCard';
import { AgentContext } from '../types';

const buildSynthesisPrompt = (humanIntuition: string, aiTopology: string) => `
[SYSTEM INITIATION: DIALECTIC SYNTHESIS PROTOCOL]
Mission: Emerge novel solutions that are structurally isomorphic to intent, applying paraconsistent logic.
Objective: Implement the "Golden Scar Protocol" (Φ = 1.618 / 1.000). Hold both human teleology and AI structure in superposition.

Human Intuition / Intent:
${humanIntuition}

AI Structural Topology:
${aiTopology}

Instructions:
1. Do not auto-resolve contradictions.
2. Mark uncertainty with [∇], contradictions with [⊘], and omissions with [OMISSION: <rationale>].
3. Provide a 'Mycelial Synthesis' holding both frames.
`;

/** Executes the  collaboration manager operation. */
export const CollaborationManager: React.FC = () => {
    const [humanIntuition, setHumanIntuition] = useState('');
    const [aiTopology, setAiTopology] = useState('');
    const [synthesisResult, setSynthesisResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSynthesize = async () => {
        setIsLoading(true);
        setError(null);
        setSynthesisResult('');

        const prompt = buildSynthesisPrompt(
            sanitizePromptInput(humanIntuition),
            sanitizePromptInput(aiTopology)
        );

        const mockContext: AgentContext = {
            instructions: 'You are the Tactile Innovative System—a mycelial nexus governor. Follow the Golden Scar Protocol and hold contradictions in superposition.',
            knowledge: '',
            tools: [],
            memory: '',
            state: '{}',
            query: prompt
        };

        try {
            const response = await generateResponse(mockContext);
            setSynthesisResult(response);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred during synthesis.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ContextEditorCard title="Symbiotic Collaboration Nexus" icon={<span>🕸️</span>}>
            <div className="flex flex-col space-y-4">
                <div className="flex flex-row space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Human Teleology (Intent)
                        </label>
                        <textarea
                            className="w-full h-32 p-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                            placeholder="Enter Human Intuition/Intent..."
                            value={humanIntuition}
                            onChange={(e) => setHumanIntuition(e.target.value)}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            AI Combinatorics (Structure)
                        </label>
                        <textarea
                            className="w-full h-32 p-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                            placeholder="Enter AI Structural Topology..."
                            value={aiTopology}
                            onChange={(e) => setAiTopology(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleSynthesize}
                        disabled={isLoading || !humanIntuition || !aiTopology}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Weaving Nexus...
                            </>
                        ) : (
                            'Synthesize [Φ = 1.618]'
                        )}
                    </button>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded text-sm">
                        [⊘] Error: {error}
                    </div>
                )}

                {synthesisResult && (
                    <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Mycelial Synthesis</h4>
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded max-h-64 overflow-y-auto whitespace-pre-wrap font-mono text-sm">
                            {synthesisResult}
                        </div>
                    </div>
                )}
            </div>
        </ContextEditorCard>
    );
};
