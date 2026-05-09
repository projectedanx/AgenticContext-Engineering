import React, { useState } from 'react';
import { generateResponse, sanitizePromptInput } from '../services/geminiService';
import { AgentContext } from '../types';
import { metrologistInstructions } from '../presets/metrologist';

const buildSculptorPrompt = (empiricalFriction: string, conflictingDirectives: string) => `
[SYSTEM INITIATION: SCOS Band III // METROLOGY_FOUNDRY]
Mission: Deterministic Extraction and Topological Bounding of Production-Ready Industrial Personas.
Objective: Translate raw operational friction into a strict PD&T YAML specification block.

Analyze the following Empirical Friction (human tacit knowledge, "rules of the game") and Conflicting Directives (formal vs informal requirements).
Apply the Paraconsistent Lens [Contradiction -> Opportunity -> Architecture] and use Holographic Reduced Representations to bind these without flattening.

Empirical Friction: ${empiricalFriction}
Conflicting Directives: ${conflictingDirectives}

Execute the Draft-Conditioned Constrained Decoding (DCCD) protocol:
1. Generate the unconstrained semantic draft.
2. Apply the Zero-Entropy DFA guard.
3. Extrude the final YAML PDT_SPECIFICATION_BLOCK conforming perfectly to the Semantic Metrology schema.
`;

/** Executes the  topological persona sculptor operation. */
export const TopologicalPersonaSculptor: React.FC = () => {
    const [empiricalFriction, setEmpiricalFriction] = useState('');
    const [conflictingDirectives, setConflictingDirectives] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSculpt = async () => {
        setIsLoading(true);
        setError(null);
        setResult('');

        const prompt = buildSculptorPrompt(
            sanitizePromptInput(empiricalFriction),
            sanitizePromptInput(conflictingDirectives)
        );

        const mockContext: AgentContext = {
            instructions: metrologistInstructions,
            knowledge: '',
            tools: [],
            memory: '',
            state: '{}',
            query: prompt
        };

        try {
            const response = await generateResponse(mockContext);
            setResult(response);
        } catch (err) {
            console.error('Sculpting failed:', err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred during extrusion.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card">
            <h2>Topological Persona Causal Sculpting</h2>
            <div className="pluriversal-description">
                <p>
                    <strong>Empirical Grounding:</strong> Input raw, unformalized operational friction and mutually exclusive directives.
                    This module utilizes Draft-Conditioned Constrained Decoding (DCCD) and Paraconsistent Non-Separable S5 logic to
                    bind contradictory constraints into a zero-entropy YAML <code>PDT_SPECIFICATION_BLOCK</code> without succumbing to
                    the Principle of Explosion or Semantic Saponification.
                </p>
            </div>

            <div className="input-group">
                <label>Empirical Friction (Tacit Knowledge / Social Field Nuances):</label>
                <textarea
                    value={empiricalFriction}
                    onChange={(e) => setEmpiricalFriction(e.target.value)}
                    placeholder="e.g., Radio logs indicate operators bypass the automated routing system during shift changes because the algorithm assumes zero-friction paths..."
                    rows={4}
                />
            </div>

            <div className="input-group">
                <label>Conflicting Directives (Formal vs Informal Requirements):</label>
                <textarea
                    value={conflictingDirectives}
                    onChange={(e) => setConflictingDirectives(e.target.value)}
                    placeholder="e.g., Maximize extraction yield (Management Directive) vs. Strict adherence to zero-emission environmental mandates (Regulatory Requirement)."
                    rows={4}
                />
            </div>

            <button
                className="execute-button"
                onClick={handleSculpt}
                disabled={isLoading || !empiricalFriction.trim() || !conflictingDirectives.trim()}
            >
                {isLoading ? 'Initiating Extrusion...' : 'Extrude Persona Specification'}
            </button>

            {error && <div className="error-message">Error: {error}</div>}

            {result && (
                <div className="output-section">
                    <h3>Extruded PDT Specification Block:</h3>
                    <pre className="output-content">{result}</pre>
                </div>
            )}
        </div>
    );
};
