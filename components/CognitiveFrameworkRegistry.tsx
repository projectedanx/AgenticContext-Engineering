import React, { useState } from 'react';
import { ContextEditorCard } from './ContextEditorCard';

const frameworks = [
    {
        name: 'ReAct (Reasoning + Acting)',
        domain: 'Agent Autonomy',
        pattern: 'Thought -> Action -> Obs -> Thought',
        description: 'Synergizes internal reasoning with external tool usage. Forms a feedback loop grounding reasoning in external reality.',
    },
    {
        name: 'CRISP-DM',
        domain: 'Data Science',
        pattern: 'BizUnd -> DataUnd -> Prep -> Model -> Eval -> Deploy',
        description: 'Sequential meta-prompt for data agents. Enforces data verification before modeling to reduce hallucinations.',
    },
    {
        name: 'OODA (Observe, Orient, Decide, Act)',
        domain: 'Strategic Control',
        pattern: 'Observe -> Orient -> Decide -> Act',
        description: 'Control loop for chaotic environments. Processes environmental information to take effective action.',
    },
    {
        name: 'PEER (Plan, Execute, Express, Review)',
        domain: 'Collaborative Writing',
        pattern: 'Plan -> Exec -> Express -> Review',
        description: 'Repetitive refinement loop effective for content generation and complex analysis. The Review step acts as a quality gate.',
    },
    {
        name: 'Tree of Thoughts (ToT)',
        domain: 'Search/Planning',
        pattern: 'Generate -> Evaluate -> Search (BFS/DFS)',
        description: 'Topological framework for non-linear exploration. Generates multiple paths, evaluates them, and searches the tree.',
    },
    {
        name: 'Reflexion',
        domain: 'Reinforcement Learning / Self-Correction',
        pattern: 'Act -> Eval -> Self-Reflect -> Memory -> Act',
        description: 'Introduces episodic memory to transform failure into a learning signal. Essential for mitigating Infinite Loops.',
    }
];

export const CognitiveFrameworkRegistry: React.FC = () => {
    const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

    return (
        <ContextEditorCard title="Cognitive Framework Registry" icon={<span>🧠</span>}>
            <div className="space-y-4">
                <p className="text-sm text-gray-600">
                    Select a Cognitive Framework to inspect its structural archetype. These named control loops enforce stepwise logic and symbolic boundaries, mitigating failure modes like Hallucination Propagation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {frameworks.map((fw) => (
                        <div
                            key={fw.name}
                            onClick={() => setSelectedFramework(fw.name)}
                            className={`p-4 border rounded cursor-pointer transition-colors ${selectedFramework === fw.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                        >
                            <h3 className="font-bold text-sm text-gray-800">{fw.name}</h3>
                            <p className="text-xs text-gray-500 mb-2 font-mono">{fw.domain}</p>

                            {selectedFramework === fw.name && (
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                    <div className="mb-2">
                                        <span className="text-xs font-semibold text-gray-700">Structural Pattern:</span>
                                        <div className="font-mono text-xs p-1 bg-gray-100 rounded mt-1 break-words">
                                            {fw.pattern}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-xs font-semibold text-gray-700">Cognitive Function:</span>
                                        <p className="text-xs text-gray-600 mt-1">{fw.description}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </ContextEditorCard>
    );
};
