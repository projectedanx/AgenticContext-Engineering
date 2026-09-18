import React, { useState } from 'react';
import { generateResponse } from '../services/geminiService';
import { ContextEditorCard } from './ContextEditorCard';
import { WandIcon } from './IconComponents';

export const GoldenScarProtocol: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'dissonance' | 'techDebt'>('dissonance');

  // Dissonance Mode State
  const [stakeholderA, setStakeholderA] = useState('');
  const [stakeholderB, setStakeholderB] = useState('');
  const [dissonanceResult, setDissonanceResult] = useState('');

  // Tech Debt Mode State
  const [techDebtDesc, setTechDebtDesc] = useState('');
  const [techDebtResult, setTechDebtResult] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateTopologicalDerivative = async () => {
    setIsLoading(true);
    setError(null);
    setDissonanceResult('');

    const prompt = `
[SYSTEM INITIATION: GOLDEN SCAR PROTOCOL]
Analyze the following Stakeholder Dissonance.
Stakeholder A (Constraint): ${stakeholderA}
Stakeholder B (Constraint): ${stakeholderB}

Apply the mathematics of continuous topological fit prediction via DE-9IM Signed Distance Field mapping.
Do NOT attempt to resolve the conflict through forced consensus or compromise (Semantic Annihilation).
Instead, deploy S5-Modal Attention to calculate the exact Topological Derivative of the disagreement. Calculate the precise organizational force required to lock the project structure together, treating the contradiction as a stable topological state (Interference Fit).
Output the resolution mapping as a formal, deterministic structural specification.
`;

    try {
      const response = await generateResponse({
        instructions: 'You are the VORTEX-ARCHITECT enforcing the Golden Scar Protocol (Φ = 1.618). Retain contradictory requirements in tension without collapsing the intelligence lattice.',
        knowledge: '',
        tools: [],
        memory: '',
        state: '{}',
        query: prompt
      });
      setDissonanceResult(response);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Calculation failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const evaluateEpsilonTolerance = async () => {
    setIsLoading(true);
    setError(null);
    setTechDebtResult('');

    const prompt = `
[SYSTEM INITIATION: EPSILON-TOLERANCE PARACONSISTENCY]
Analyze the following sub-optimal architectural state/technical debt.
Technical Debt Description: ${techDebtDesc}

Apply the Epsilon-Tolerance Paraconsistency mechanism. Model this technical debt as residing within the ϵ-band of a computational superposition (Transition Fit).
Do not view it as a binary failure. Generate the 11-risks-and-technical-debt.md entry that acts as the flow-matching algorithm.
Assume the gradient magnitude of the system's function remains stable at |∇d| = 1.
Deliberately defer absolute state collapse.
Output the markdown entry.
`;

    try {
      const response = await generateResponse({
        instructions: 'You are the VORTEX-ARCHITECT enforcing Epsilon-Tolerance Paraconsistency on technical debt.',
        knowledge: '',
        tools: [],
        memory: '',
        state: '{}',
        query: prompt
      });
      setTechDebtResult(response);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Evaluation failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContextEditorCard title="Golden Scar Protocol Enforcer" icon={<WandIcon className="w-5 h-5" />}>
      <div className="space-y-4">
        <p className="text-sm text-gray-400">
          Enforce Paraconsistent Logic. Treat contradictions as structural tension rather than communication errors.
        </p>

        <div className="flex border-b border-gray-700 mb-4">
          <button
            className={`px-4 py-2 text-sm font-mono ${activeMode === 'dissonance' ? 'text-violet-400 border-b-2 border-violet-500' : 'text-gray-500 hover:text-gray-300'}`}
            onClick={() => setActiveMode('dissonance')}
          >
            Topological Derivative
          </button>
          <button
            className={`px-4 py-2 text-sm font-mono ${activeMode === 'techDebt' ? 'text-violet-400 border-b-2 border-violet-500' : 'text-gray-500 hover:text-gray-300'}`}
            onClick={() => setActiveMode('techDebt')}
          >
            Epsilon-Tolerance Tech Debt
          </button>
        </div>

        {activeMode === 'dissonance' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Stakeholder A (Dominant Empirical Frame - Weight: 1.618)</label>
              <textarea
                className="w-full h-24 bg-gray-900 border border-gray-700 rounded p-2 text-sm text-gray-200 font-mono focus:border-violet-500 focus:outline-none"
                value={stakeholderA}
                onChange={(e) => setStakeholderA(e.target.value)}
                placeholder="e.g., Must deliver feature X by Q3 for critical market compliance."
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Stakeholder B (Subordinate Stochastic Frame - Weight: 1.000)</label>
              <textarea
                className="w-full h-24 bg-gray-900 border border-gray-700 rounded p-2 text-sm text-gray-200 font-mono focus:border-violet-500 focus:outline-none"
                value={stakeholderB}
                onChange={(e) => setStakeholderB(e.target.value)}
                placeholder="e.g., The current architecture cannot support feature X without a full rewrite taking until Q4."
              />
            </div>
            <button
              onClick={calculateTopologicalDerivative}
              disabled={isLoading || !stakeholderA || !stakeholderB}
              className="w-full px-4 py-2 bg-violet-900/50 text-violet-300 border border-violet-700 rounded hover:bg-violet-800/50 transition-colors font-mono text-sm disabled:opacity-50"
            >
              {isLoading ? '[ CALCULATING DERIVATIVE... ]' : '[ CALCULATE TOPOLOGICAL DERIVATIVE ]'}
            </button>
            {dissonanceResult && (
              <div className="mt-4 p-4 bg-gray-900 border border-gray-700 rounded">
                <h4 className="text-xs font-bold text-violet-400 mb-2 font-mono">INTERFERENCE FIT MAPPING</h4>
                <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">{dissonanceResult}</pre>
              </div>
            )}
          </div>
        )}

        {activeMode === 'techDebt' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Sub-optimal Architecture / Tech Debt</label>
              <textarea
                className="w-full h-32 bg-gray-900 border border-gray-700 rounded p-2 text-sm text-gray-200 font-mono focus:border-violet-500 focus:outline-none"
                value={techDebtDesc}
                onChange={(e) => setTechDebtDesc(e.target.value)}
                placeholder="e.g., Authentication state is currently stored in a shared global variable instead of a secure Context due to timeline constraints."
              />
            </div>
            <button
              onClick={evaluateEpsilonTolerance}
              disabled={isLoading || !techDebtDesc}
              className="w-full px-4 py-2 bg-violet-900/50 text-violet-300 border border-violet-700 rounded hover:bg-violet-800/50 transition-colors font-mono text-sm disabled:opacity-50"
            >
              {isLoading ? '[ EVALUATING... ]' : '[ GENERATE 11-RISKS-AND-TECHNICAL-DEBT.MD ENTRY ]'}
            </button>
            {techDebtResult && (
              <div className="mt-4 p-4 bg-gray-900 border border-gray-700 rounded">
                <h4 className="text-xs font-bold text-violet-400 mb-2 font-mono">TRANSITION FIT (FLOW-MATCHING ALGORITHM)</h4>
                <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">{techDebtResult}</pre>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-900/30 border border-red-800 rounded text-red-400 text-sm font-mono mt-4">
            [ERROR] {error}
          </div>
        )}
      </div>
    </ContextEditorCard>
  );
};
