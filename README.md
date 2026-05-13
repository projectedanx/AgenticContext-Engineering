<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Agentic Context Engineering Workbench

The Agentic Context Engineering Workbench is a deterministic web-based application designed to facilitate the development and testing of deterministic AI coding agents. It provides a structural suite of tools that allow developers to build, fine-tune, and manage the context in which their AI agents operate, enforcing rigid bounded contexts.

## Purpose

The primary goal of this workbench is to eliminate "Semantic Saponification" (the tendency for AI outputs to degrade into vague, agreeable averages) by enforcing strict structural boundaries anchored in **Pluriversal Epistemology** and **Paraconsistent Cognition**. It empowers developers to define specific failure modes, operational constraints, and architectural imperatives via "Sovereign Agent Presets," allowing for precise control over the generative process.

This repository also serves as the theoretical and empirical testing ground for next-generation AI architectures, notably the **Pluriversal Paraconsistent Mixture of Experts (P²-MoE)**, which replaces homogeneous softmax routing with structurally rigid Epistemic Dissonance Routers (EDR) to prevent mode collapse during cross-domain synthesis.

## Key Features

- **Betti-1 Attractor Protocol**: Implements Failure-Informed Prompt Inversion (FIPI) to generate structural topologies constrained by human-defined failure modes (Scars).
- **Sovereign Agent Presets**: Pre-loaded with identity-enforced agents (e.g., AXIOM, KUT, LEXIS SOVEREIGN, AEGIS-PRIME, DIETER, ALETHEON, METROLOGIST, AURELIUS, KIRA-7, CIPHER).
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
- **VORTEX-ARCHITECT Emergence Protocol**: Metabolizes chaotic requests into structurally sound topologies via Paraconsistent Logic and Stigmergic Execution.
- **P²-MoE Architecture Hypothesis**: Formalized in ADR-010, proposing the replacement of standard attention with Epistemic Dissonance Routing, Topological KV-Caching, and Vector Symbolic Architectures (VSA) for multimodal isolation.

## Getting Started

Follow these instructions to get the workbench running on your local machine for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)
- [Python 3](https://www.python.org/) (for CoC Enactment Simulation scripts)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/agentic-context-engineering-workbench.git
    cd agentic-context-engineering-workbench
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Setup**:
    Create a `.env.local` file in the root directory and configure your API keys:
    ```
    GEMINI_API_KEY=your_gemini_api_key
    API_KEY=your_api_key_for_testing
    ```

### Usage (Development Server)

To start the local development server and access the workbench UI:

`npm run dev &`

The application will be accessible at `http://localhost:3000`. From here, you can load Sovereign Agent Presets, define strict Betti-1 bounding constraints in the Instruction Editor, and initiate Pluriversal Feature Discovery enactments.

### Running Tests

To run the Vitest test suite:

`npm test`

*Note: Ensure your environment variables are configured before running tests. For basic verification, you can run `export API_KEY="dummy_key" && export GEMINI_API_KEY="dummy_key" && npm test`.*

## Advanced Configuration: Sovereign Agent Presets

Sovereign Agents are configured in the `presets/` directory. To add a new persona:

1. Create a new `.ts` file in `presets/` (e.g., `my_agent.ts`).
2. Export the necessary constants: `[Name]Instructions`, `[Name]Knowledge`, `[Name]Tools`, and `[Name]State`.
3. Update `App.tsx` to load the preset and render a corresponding UI button.

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

## Contributing

Contributions are heavily scrutinized for compliance with the architectural directives defined in the `AGENTS.md` and repository standards. Ensure comprehensive test coverage and documentation updates before submitting a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
