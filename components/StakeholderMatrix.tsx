import React, { useState } from 'react';
import { ContextEditorCard } from './ContextEditorCard';
import { UsersIcon } from './IconComponents';
import { Stakeholder, Epic, UserStory } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { generateResponse } from '../services/geminiService';

export const StakeholderMatrix: React.FC = () => {
    const [stakeholders, setStakeholders] = useState<Stakeholder[]>([
        { id: uuidv4(), role: 'User', constraints: ['Usability', 'Speed'] },
        { id: uuidv4(), role: 'Business', constraints: ['Monetization', 'Retention'] }
    ]);
    const [epics, setEpics] = useState<Epic[]>([
        { id: uuidv4(), name: 'Initial MVP Core', description: 'Basic functionality for launch', status: 'Draft' }
    ]);
    const [stories, setStories] = useState<UserStory[]>([]);
    const [isDecomposing, setIsDecomposing] = useState(false);
    const [tensionAnalysis, setTensionAnalysis] = useState<string>('');

    const handleAddStakeholder = () => {
        setStakeholders([...stakeholders, { id: uuidv4(), role: '', constraints: [] }]);
    };

    const updateStakeholder = (id: string, field: 'role' | 'constraints', value: string | string[]) => {
        setStakeholders(stakeholders.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleAnalyzeTension = async () => {
        setIsDecomposing(true);
        const prompt = `
[SYSTEM INITIATION: AEW v2.1 SCC PROTOCOL]
Analyze the following Stakeholder Topology for structural tension.
Stakeholders: ${JSON.stringify(stakeholders)}

Calculate the inter-stakeholder tension and generate a Contrastive Delta (Amateur vs Expert view on how to balance these).
Format the output as a brief, punchy analysis.
`;
        try {
            const response = await generateResponse({
                instructions: 'You are the Antifragile Epistemic Weaver (AEW) analyzing stakeholder topologies.',
                knowledge: '', tools: [], memory: '', state: '{}', query: prompt
            });
            setTensionAnalysis(response);
        } catch (e) {
             setTensionAnalysis(e instanceof Error ? e.message : 'Analysis failed.');
        } finally {
            setIsDecomposing(false);
        }
    };

    const handleDecomposeEpic = async (epic: Epic) => {
         setIsDecomposing(true);
         const prompt = `
Decompose the following Epic into User Stories, considering the current Stakeholder constraints.
Epic: ${JSON.stringify(epic)}
Stakeholders: ${JSON.stringify(stakeholders)}

Return a JSON array of UserStory objects. Each object should have:
- description (string)
- acceptanceCriteria (array of strings)
- complexity (number 1-5)
Ensure the stories explicitly address the tension between different stakeholder constraints.
Do not wrap in markdown code blocks. Output ONLY valid JSON.
`;
         try {
             const response = await generateResponse({
                 instructions: 'You are an advanced Product Planning Agent enhanced with stakeholder analysis and requirement decomposition techniques. Output raw JSON only.',
                 knowledge: '', tools: [], memory: '', state: '{}', query: prompt
             });

             // Clean potential markdown wrapping
             const cleanedResponse = response.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();

             const parsedStories = JSON.parse(cleanedResponse);

             if(Array.isArray(parsedStories)) {
                 const newStories: UserStory[] = parsedStories.map(s => ({
                     id: uuidv4(),
                     epicId: epic.id,
                     description: s.description,
                     acceptanceCriteria: s.acceptanceCriteria,
                     complexity: s.complexity
                 }));
                 setStories([...stories, ...newStories]);
                 setEpics(epics.map(e => e.id === epic.id ? { ...e, status: 'Decomposing' } : e));
             } else {
                 throw new Error("Invalid response format");
             }

         } catch (e) {
             console.error("Decomposition failed:", e);
         } finally {
             setIsDecomposing(false);
         }
    };

    return (
        <ContextEditorCard title="Stakeholder & Requirement Topology" icon={<UsersIcon className="w-5 h-5" />}>
             <div className="space-y-6">
                <div>
                    <h3 className="text-sm font-semibold mb-2 text-violet-300">Stakeholder Matrix</h3>
                    <div className="space-y-2">
                        {stakeholders.map(s => (
                            <div key={s.id} className="flex gap-2 items-start">
                                <input
                                    className="bg-gray-800 border border-gray-700 rounded p-1 text-sm w-1/3"
                                    value={s.role}
                                    onChange={(e) => updateStakeholder(s.id, 'role', e.target.value)}
                                    placeholder="Role (e.g., Security)"
                                />
                                <input
                                    className="bg-gray-800 border border-gray-700 rounded p-1 text-sm w-2/3"
                                    value={s.constraints.join(', ')}
                                    onChange={(e) => updateStakeholder(s.id, 'constraints', e.target.value.split(',').map(c=>c.trim()))}
                                    placeholder="Constraints (comma separated)"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                        <button onClick={handleAddStakeholder} className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded">+ Add</button>
                        <button onClick={handleAnalyzeTension} disabled={isDecomposing} className="text-xs bg-violet-600/30 text-violet-300 hover:bg-violet-600/50 px-2 py-1 rounded border border-violet-500/50">Analyze Tension</button>
                    </div>
                </div>

                {tensionAnalysis && (
                     <div className="bg-gray-800/80 p-3 rounded text-xs text-gray-300 whitespace-pre-wrap font-mono border border-gray-700">
                        <span className="text-yellow-400 block mb-1">=== TENSION ANALYSIS ===</span>
                        {tensionAnalysis}
                     </div>
                )}

                <div>
                     <h3 className="text-sm font-semibold mb-2 text-violet-300">Epic Decomposition</h3>
                     <div className="space-y-4">
                         {epics.map(epic => (
                             <div key={epic.id} className="bg-gray-800 p-3 rounded border border-gray-700">
                                 <div className="flex justify-between items-center mb-2">
                                     <span className="font-semibold text-sm">{epic.name}</span>
                                     <button onClick={() => handleDecomposeEpic(epic)} disabled={isDecomposing} className="text-xs bg-blue-600/30 text-blue-300 hover:bg-blue-600/50 px-2 py-1 rounded border border-blue-500/50">
                                         {isDecomposing ? 'Processing...' : 'Decompose'}
                                     </button>
                                 </div>
                                 <p className="text-xs text-gray-400 mb-2">{epic.description}</p>

                                 {stories.filter(s => s.epicId === epic.id).length > 0 && (
                                     <div className="mt-3 pl-2 border-l border-gray-600 space-y-2">
                                         {stories.filter(s => s.epicId === epic.id).map(story => (
                                             <div key={story.id} className="bg-gray-900 p-2 rounded text-xs">
                                                 <span className="font-bold text-gray-300 block mb-1">Story: {story.description} (Complexity: {story.complexity})</span>
                                                 <ul className="list-disc pl-4 text-gray-400">
                                                     {story.acceptanceCriteria.map((ac, i) => <li key={i}>{ac}</li>)}
                                                 </ul>
                                             </div>
                                         ))}
                                     </div>
                                 )}
                             </div>
                         ))}
                     </div>
                </div>
             </div>
        </ContextEditorCard>
    );
};
