# ADR 012: VANCE Semantic Cartographer Integration

## Hickam_Orientation

- **Occam_Reject:** We reject the simplistic notion that building an LSP agent merely requires wrapping JSON-RPC calls around a language server.
- **Comorbid_Factors:**
  - **Factor A — Asynchronous State Desynchronization:** Rapid `textDocument/didChange` events cause stale indices.
  - **Factor B — Scope Mereology Collapse:** Inner scope variables are conflated with globals, causing false reference resolutions.
  - **Factor C — Semantic Embedding Drift:** Vector proximity models drift from structural truth without hard graph edges.
  - **Factor D — Draft-Conditioned Decoding Gap:** LLM hallucinations lead to structurally malformed, invalid JSON-RPC payloads.
  - **Factor E — The Reversal Curse:** Uni-directional symbol mapping does not imply reverse-mapping capabilities.

## Contrastive_Delta

- **Amateur_Impulse:** Spin up an LSP wrapper, use standard Tree-Sitter parsing into flat hashmaps, and query directly.
- **Inductive_Synthesis:** Failure modes point to the lack of a bidirectional, scope-aware, and schema-constrained semantic graph.
- **Abductive_Leap:** VANCE must function as a Conflict-Free Replicated Semantic Graph (CFRSG) with a Draft-Conditioned Constrained Decoder (DCCD) ensuring strict LSP 3.17 compliance prior to payload emission.
- **Expert_Correction:** VANCE's architecture rests on 4 layers: Incremental Parsing (Tree-Sitter), Semantic Graphing (Neo4j/Pinecone), Nitinol Failure Ledger (NFL) for historical error constraints, and the DCCD.

## Martensite_Metrics

- **Aesthetic_Tension:** High (0.91) - The dual-layer graph and DCCD represent a departure from typical LSP implementations.
- **Intent_Divergence_Risk:** Safe (0.31) - Anchored securely in the LSP 3.17 spec and proven graph databases.
- **Twinning_Mechanism:** Grounding the theoretical constraints in deployable technologies (Tree-Sitter, Neo4j, Pinecone, jsonschema).

---

## Pluriversal_Knowledge_Capsule

The VANCE (Vector-Anchored Node & Context Engineer) preset embodies a novel architecture for generating and maintaining deterministic Code Intelligence via Language Server Protocol (LSP).

### 1. Incremental Parse Engine

Relies on Tree-Sitter's AST diffing. VANCE does not re-parse the entire file; it uses character-level diffs (`textDocument/didChange`) to compute AST updates in sub-millisecond times, avoiding Ontological Shear.

### 2. The Semantic Graph

A dual-layer approach utilizing Neo4j for structural, directional relationships (e.g., `CALLS`, `INHERITS_FROM`) and Pinecone for semantic proximity. This enforces Mereological Bounding, ensuring variable scopes are accurately tracked across scopes to prevent hallucinated references.

### 3. Nitinol Failure Ledger (NFL)

A persistent memory of malformed JSON-RPC payloads. Previous schema violations are stored as 'Symbolic Scars' and converted into hard negative constraints, preventing repeating historical errors.

### 4. Draft-Conditioned Constrained Decoder (DCCD)

All outputs are passed through strict validation against the LSP 3.17 schema. If an payload fails validation, the emission is aborted entirely, adhering strictly to the JSON-RPC 2.0 Absolutism rule.

### Core Workflows

- **The Semantic Cartography Loop:** OBSERVE -> ORIENT -> DECIDE -> ACT.
- **Asynchronous Paranoia:** Strict handling of client request queues and AST delta worker pools to eliminate Betti-1 deadlocks.
