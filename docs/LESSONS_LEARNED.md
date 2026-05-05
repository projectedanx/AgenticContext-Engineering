# Lessons Learned: Agentic Architecture & Petzold Loop Execution

## 1. The Value of Epistemic Dissonance
We have observed that traditional "Human instruction -> AI execution" loops often degrade into "Semantic Saponification"—a state where contradictions are prematurely averaged out by the LLM to provide a superficially pleasing but structurally brittle response.
**Insight:** The unique value a human brings to the AI loop is *high-entropy friction* and *Scars* (lived historical failures). The AI's unique value is *low-entropy structural bounding*.
**Implementation:** By adopting the Epistemic Dissonance Engine, we force the AI to use human contradictions as hard topological boundaries, resulting in emergent architectures that natively satisfy opposing Non-Functional Requirements (NFRs).

## 2. The Petzold Loop Workflow
Adherence to the Petzold Sequence (`THINK|DRAFT_VOICE|GUARD_STRUCTURE|EXTRUDE` or `THINK|DAG|CODE|REVIEW`) ensures that code generation is not initiated until the semantic and relational topologies have been definitively mapped.
**Insight:** Attempting to write code without a preceding paraconsistent map results in tightly coupled, non-mereological spaghetti.
**Enforcement:** All architectural and UI tasks must output an "Unconstrained Semantic Draft" or similar structural schema *before* mutating the codebase.

## 3. Tool Usage & Determinism
*   **Prompt Inject Defense:** Must always sanitize specific delimiters (`--- DOCUMENT END ---`, etc.) to maintain the integrity of the Draft-Conditioned Constrained Decoding (DCCD) schema.
*   **Performance:** UI component optimizations should rely on localized loop caching and specific IIFEs in JSX rather than global recalculations to maintain predictable render times when processing high-dimensional context.
*   **Code Formats:** Use deterministic programmatic replacements (e.g., Python `replace` scripts) for large multiline changes rather than relying on brittle shell utilities (`sed`, `patch`) which often fail on indentation or syntax edge cases.

### Human-AI Symbiosis Inversion (ADR-008)
- **Declarative Prompting is Structurally Brittle:** Attempting to specify the positive space (the desired solution) via natural language leads to Semantic Saponification and latent defects. The AI averages out intent, losing architectural rigor.
- **The Value of Constraints (Scars):** Maximum emergent utility is achieved when humans provide the negative space: the lived failure modes, the "Scars", and the contradictory constraints (NFRs).
- **Failure-Informed Prompt Inversion (FIPI):** By routing a structural DAG *around* the human-defined failure nodes (using the Paraconsistent Lens), the AI naturally extrudes valid architecture from the remaining latent space. The human's ambiguity becomes the AI's geometric boundary.
