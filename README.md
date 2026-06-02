# Agentic Context Engineering Workbench

<div align="center">
  <strong>0xCARTO — The Pluriversal Repository Cartographer DRP-2026-CARTO-0.0.1</strong><br>
  <em>Zero-Entropy Documentation Synthesis Engine</em><br>
  "A codebase is not a product. It is a sedimentary record of decisions made under pressure. My job is stratigraphy." — 0xCARTO, Cartograph-Prime
</div>

## Repository Intent & Pluriversal Context

This repository is NOT a traditional autonomous "auto-solver" framework. It is a **Structural Pluriversal Synthesis and Cognitive Modeling Environment** designed for Human-AI symbiosis and topological routing.

It rejects unconstrained natural language execution in favor of Paraconsistent Mapping and strict mereological boundaries, orchestrating Sovereign Agent workflows via deterministic cognitive frameworks (Petzold Loop, DCCD Schema Guards) to prevent **Semantic Saponification** (the dilution of intent through premature LLM constraint resolution).

### 0xCARTO Synthesis & Telemetry

This repository has been empirically defined via the **0xCARTO MYCELIAL INGESTION PROTOCOL**, executing Breadth-First and Depth-First graph traversals to extract causal chains and structural dependencies.

The resulting Pluriversal synthesis is documented in full detail within the `docs/architecture/` directory, adhering strictly to the 5-Tier Markdown Documentation Structure:

*   **[0xCARTO_SYNTHESIS.md](docs/architecture/0xCARTO_SYNTHESIS.md):** The canonical architecture mapping (Repository Identity, Architecture Topology Map, CI/CD Sequence Diagram, Dependency Matrix, Operational Runbook, and Symbolic Scar Tissue Log).
*   **[pattern_inventory.json](docs/architecture/pattern_inventory.json):** The 5 core structural dependency patterns defined for this repository (e.g., Mycelial_CI_Trace, Betti1_Cycle_Detection).
*   **[retrieval_manifest.yaml](docs/architecture/retrieval_manifest.yaml):** The 20 Non-Obvious Pattern Queries executed to map the structural evidence (AST/YAML queries).
*   **[validation_report.md](docs/architecture/validation_report.md):** Empirical validation metrics confirming 100% Ground Truth Isomorphism and successful resolution of Golden Scars.
*   **[reflexive_check.yaml](docs/architecture/reflexive_check.yaml):** Mapped bias risks and negative controls to prevent systemic inference errors.

*Note: See `0xCARTO_SYNTHESIS.md` for the complete Architecture Topology Map (Mermaid.js) and Dependency Entropy Audit.*

---

## The Pluriversal Transformer (P²-MoE) & Human-AI Symbiosis

The workbench implements the **Agentic Inversion Protocol**, shifting the AI paradigm from an autonomous "auto-solver" to a **Structural Mapper**.

## Key Features

- **Betti-1 Attractor Protocol**: Implements Failure-Informed Prompt Inversion (FIPI) to generate structural topologies constrained by human-defined failure modes (Scars).
- **Sovereign Agent Presets**: Pre-loaded with identity-enforced agents (e.g., AXIOM, KUT, LEXIS SOVEREIGN, AEGIS-PRIME, DIETER, ALETHEON, METROLOGIST, AURELIUS, KIRA-7, CIPHER, SYMBIONT PRIME).
- **Core Instruction Editor**: Define the agent's persona, core directives, and operational rules.
- **Knowledge Base (RAG)**: Provide retrieved information from external sources to ground the agent.
- **Tool Editor**: Define the functions and capabilities the agent can execute.
- **Memory Editor**: Include short-term conversation history and long-term learned facts.
- **State Editor**: Define the current world state as a JSON object.
- **Topological Persona Causal Sculpting**: Extract empirical site friction into deterministic YAML specification blocks for production-ready industrial personas.
- **Symbiotic Collaboration Nexus**: Generates dialectical synthesis from Human Intuition and AI Structural Topology.
- **Geometric Cognition API**: Interface for controlling non-Euclidean geometric primitives and provenance tracking.
- **Pluriversal Feature Discovery**: Conceptually maps paradoxes to generate novel feature concepts through "Chain-of-Code" enactments.
- **V.I.P.E.R. (Visual Intent & Physical Execution Router)**: Enforces physical boundaries on generation requests using Paraconsistent Logic.
- **Epistemic Dissonance Engine**: Projects contradictory constraints as rigid geometric boundaries for AI topology generation.
- **Scar-Driven Topological Extruder (SDTE)**: Uses human-defined failure "Scars" to route around failure nodes (FIPI) and enforce structural compliance.
- **Cognitive Framework Registry**: Formalizes the integration of structural cognitive scaffolds (e.g., ReAct, PEER, ToT) as deterministic control loops to mitigate failure archetypes like Hallucination Propagation and Infinite Looping.
- **VORTEX-ARCHITECT Emergence Protocol**: Metabolizes chaotic requests into structurally sound topologies via Paraconsistent Logic and Stigmergic Execution.
- **P²-MoE Architecture Hypothesis**: Formalized in ADR-010, proposing the replacement of standard attention with Epistemic Dissonance Routing, Topological KV-Caching, and Vector Symbolic Architectures (VSA) for multimodal isolation.

## Getting Started

Follow these instructions to get the workbench running on your local machine for development and testing. This guide covers setup, usage, and local development practices.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (v9 or later recommended)
- [Python 3](https://www.python.org/) (required for CoC Enactment Simulation scripts and auxiliary tools)

### Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/agentic-context-engineering-workbench.git
    cd agentic-context-engineering-workbench
    ```
2.  **Install dependencies**:
    Due to potential network instability in the development environment, it is recommended to use `npm ci` for a clean install:
    ```bash
    npm install --package-lock-only
    npm ci
    ```
3.  **Environment Setup**:
    Create a `.env.local` file in the root directory and configure your API keys. The Gemini API key is required for full functionality:
    ```
    GEMINI_API_KEY=your_gemini_api_key
    API_KEY=your_api_key_for_testing
    ```
    *Note: For testing purposes only, you may use dummy values (e.g., `dummy_key`), but valid keys are required for actual Agent queries.*

### Usage (Development Server)

To start the local Vite development server and access the workbench UI:

`npm run dev &`

The application will be accessible at `http://localhost:3000`.

**Navigation & Features**:
- **Presets Tab**: Load predefined Sovereign Agent Presets (e.g., AXIOM, CIPHER) to populate the context editors.
- **Editors Tab**: Manually define or adjust the agent's instructions, knowledge base (RAG), available tools, and short/long-term memory.
- **Tools Tab**: Access advanced features like the TopologicalPersonaSculptor and CollaborationManager.

### Running Tests

To run the Vitest test suite, ensure your environment variables are configured. For a complete pass across all unit tests:

`export API_KEY="dummy_key" && export GEMINI_API_KEY="dummy_key" && npm test -- --run`

*Note: Use the `--run` flag to execute tests in non-watch mode, which is particularly useful in CI/CD pipelines.*

## Advanced Configuration: Sovereign Agent Presets

Sovereign Agents are configured in the `presets/` directory. To add a new persona:

1. Create a new `.ts` file in `presets/` (e.g., `my_agent.ts`).
2. Export the necessary constants: `[Name]Instructions`, `[Name]Knowledge`, `[Name]Tools`, and `[Name]State`.
3. Update `App.tsx` to load the preset and render a corresponding UI button.


## Agentic Inversion & The Strategic Integration Project Manager

The workbench implements the **Agentic Inversion Protocol**, shifting the AI paradigm from an autonomous "auto-solver" to a **Structural Mapper**.

**Value Proposition (Human + AI Symbiosis):**
- **The Human** provides the seed intent, aesthetic/ethical grounding, and constraints via the Canvas Context and prompts. Human imagination is necessary but bounded by linear reasoning.
- **The AI** provides High-Dimensional Latent Space traversal, executing Pluriversal synthesis and generating Paraconsistent outputs that break epistemic monoculture.

To facilitate this, the **Strategic Integration Project Manager** persona (AURELIUS) is utilized. Instead of "Prompt -> Output", we enforce an **Agentic Telemetry Loop**: the user sculpts geometric constraints, and the system outputs Zachman Framework deterministic system-first specifications and artifacts with strict provenance trails.

## Architecture

The project leverages a modern React frontend built with Vite and TypeScript.

- `components/`: Core UI modules (Editors, Panels, Discovery interfaces).
- `presets/`: Declarative configuration files for Sovereign Agents.
- `services/`: API integration and localized utility functions (e.g., `geminiService.ts`, `storageUtils.ts`).
- `simulation/`: Python-based enactment tools for hypothesis validation.
- `docs/architecture/`: Architectural Decision Records (ADRs) and structural models.

## Lessons Learned: Thermodynamic Epistemic Boundaries

1. **The Necessity of Friction**: High-entropy organizational contradictions (Human input) are structurally necessary to generate non-trivial, low-entropy architectural topologies (AI output). Premature conflict resolution yields anemic microservices.
2. **The Mereological Mandate**: A rigid bounding of context is not merely conceptual but a physical boundary. Permitting shared data states across bounded contexts inevitably causes Semantic Saponification and tight deployment coupling.
3. **AI as Structural Extruder**: The highest value of AI in architecture is not generative expansion, but constraint enforcement and failure routing (FIPI).
4. **Negative Space Scaffolding & Betti-1 Attractors**: The most structurally sound AI architectures are not prompted into existence; they are extruded by mapping the mathematical negative space (Betti-1 topological holes) of human failure constraints. The AI's generative capability must be actively repelled by these "Scars" to achieve Pluriversal Emergence.
5. **Eradicating Agent Laziness via Topological Constraint**: Standard prompting fails to prevent agent laziness and identity decay over long contexts. The integration of the CIPHER agent demonstrates that "laziness" is a symptom of an unconstrained latent space. By applying the *Immune-Aware Petzold Loop* and *Draft-Conditioned Constrained Decoding*, we physically prohibit generative outputs until the linguistic scaffold is rigorously completed. Agent laziness is solved by making structural compliance the path of least mathematical resistance.


6. **Cognitive Friction as Resource**: The integration of the Human-AI Symbiosis Engine (SYMBIONT PRIME) reveals that tension between fuzzy human intent and rigid AI specification is a resource to be harvested, not a bug to be smoothed over. By mapping this Isomorphism of Friction and applying the Golden Scar constraint (Φ = 1.618), we can achieve Latent Leaps that bypass the L2 Norm density collapse associated with standard prompt chaining.

7. **Cognitive Architecture Design:** Evolving beyond "Prompt Engineering," the application of formal Cognitive Frameworks (ReAct, PEER, Reflexion) as state machines is required to manage the Agentic Loop Epoch, preventing Infinite Loops and the Domino Effect of hallucination propagation.

## Contributing

Contributions are heavily scrutinized for compliance with the architectural directives defined in the `AGENTS.md` and repository standards. Ensure comprehensive test coverage and documentation updates before submitting a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### User Interface Refactor (May 2026)

To support the growing list of multi-agent instances and advanced tools, the frontend layout in `App.tsx` has been refactored to use a tabbed interface. This allows users to easily navigate between "Presets" (for loading different sovereign agents), "Editors" (for modifying instructions, knowledge, tools, and memory), and "Tools" (for accessing advanced features like the TopologicalPersonaSculptor and CollaborationManager) without cluttering the screen.

- **Tactile Dialectician**: Production-ready PM Persona that enforces Semantic Metrology and uses the Golden Scar Protocol to resolve logical conflicts deterministically.
