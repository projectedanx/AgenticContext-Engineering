# ADR 011: Cognitive Framework Orchestration & Structural Archetypes

## Hickam_Orientation
The evolution of Large Language Models has demonstrated that "Prompt Engineering" is fundamentally Cognitive Architecture Design. The transition from stochastic text generators to reasoning engines is governed by symbolic cognitive scaffolds (e.g., ReAct, PEER, Reflexion). The Workbench must transition from relying on implicit, single-turn prompting to explicitly managing multi-turn, stateful cognitive control loops. This ADR formalizes the integration of these named structural archetypes to mitigate failure modes like "Hallucination Propagation" and "Infinite Looping," enforcing rigorous agentic autonomy.

## Contrastive_Delta
*   **Previous State:** Agents rely on implicit patterns (e.g., Few-Shot) or monolithic, unconstrained reasoning blocks, leading to hallucination propagation and context degradation. Control flow is loosely defined by narrative system prompts.
*   **Proposed State:** Explicit instantiation of named Cognitive Frameworks (e.g., CRISP-DM, OODA, ToT) as deterministic control loops. Agents operate as state machines governed by defined roles, stepwise logic, and symbolic control structures (e.g., Thought/Action/Observation delimiters).
*   **Differential Impact:** Eradicates the "Infinite Loop" trap by enforcing state change validation and self-reflection. Prevents the "Domino Effect" of hallucinations through explicit evaluation nodes and topological reasoning (graphs/trees) rather than linear chains.

## Martensite_Metrics
*   **Loop Termination Certainty**: 100% (Prevention of Infinite Loop trap via explicit state validation).
*   **Hallucination Propagation Rate**: < 0.02 (Measured by error propagation across sequential reasoning steps).
*   **Framework Adherence**: 1.0 (Strict structural compliance to the selected archetype's DFA/schema).

---

## Pluriversal_Knowledge_Capsule

### 1. Taxonomy of Cognitive Architectures
We recognize three invariant requirements for a system to be classified as a framework within the Workbench:
1.  **Role Definition:** The model adopts a specific functional stance (e.g., "Critic", "Actor").
2.  **Stepwise Logic:** The interaction follows a defined sequence of operations (e.g., Plan -> Execute -> Evaluate).
3.  **Symbolic Control Structure:** The use of specific tokens or delimiters to manage state and separate internal reasoning from external output.

### 2. Core Orchestration Archetypes
The Workbench implements the following primary control loops derived from historical decision models:
*   **ReAct (Reasoning + Acting):** The standard control loop synergizing internal reasoning with external tool usage via Thought -> Action -> Observation cycles.
*   **CRISP-DM:** The sequential meta-prompt for data agents (Business Understanding -> Data Understanding -> Data Preparation -> Modeling -> Evaluation -> Deployment).
*   **OODA (Observe, Orient, Decide, Act):** The strategic control loop for chaotic environments.
*   **PEER (Plan, Execute, Express, Review):** The repetitive refinement loop for collaborative synthesis and content generation.
*   **Reflexion:** The episodic memory and self-correction loop transforming failure into a learning signal.
*   **Tree/Graph of Thoughts (ToT/GoT):** Topological reasoning frameworks for non-linear exploration of solution spaces.

### 3. Mitigation of Failure Archetypes
*   **The Infinite Loop Trap:** Addressed by integrating Reflexion's "Self-Reflector" to detect repetition and force trajectory divergence.
*   **Hallucination Propagation (The Domino Effect):** Mitigated by Tree of Thoughts (ToT) evaluation gates and Program-Aided Reasoning (PoT), offloading deterministic calculations to executable code environments.

### 4. Implementation Strategy
A new Sovereign Agent Preset, **The Cognitive Archaeologist** (Framework Orchestrator), will be introduced alongside a **CognitiveFrameworkRegistry** UI component. This enables users to dynamically select, configure, and inject these structural patterns into the agent's state, bridging the gap between raw LLM reasoning and structured, goal-directed behavior.
