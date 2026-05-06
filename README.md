<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Agentic Context Engineering Workbench

The Agentic Context Engineering Workbench is a deterministic web-based application designed to facilitate the development and testing of deterministic AI coding agents. It provides a structural suite of tools that allow developers to build, fine-tune, and manage the context in which their AI agents operate, enforcing rigid bounded contexts.

## Key Features
- **Betti-1 Attractor Protocol**: Implements Failure-Informed Prompt Inversion (FIPI) to generate structural topologies constrained by human-defined failure modes (Scars).

- **Sovereign Agent Presets**: Pre-loaded with identity-enforced agents like AXIOM v1.0 (The Sovereign Syntactician) for technical artifacts, KUT v2.0 (The Retention Architect) for video post-production, LEXIS SOVEREIGN v1.4 (The Auteur Co-Author) for strategic book collaboration, AEGIS-PRIME v2.0 (The Sovereign Brand Guardian) for structural brand identity enforcement, DIETER v1.0 (The Aesthetic Geometrician) for deterministic spatial architecture and design systems, ALETHEON for adversarial structural necropsy of software tools, METROLOGIST v1.0 (The Semantic Metrologist) for deterministic extraction and topological bounding, AURELIUS v1.0 (The Meta Architect) for non-Euclidean latent space navigation.

- **Core Instruction Editor**: Define the agent's persona, core directives, and operational rules.
- **Knowledge Base (RAG)**: Provide retrieved information from external sources to ground the agent.
- **Tool Editor**: Define the functions and capabilities the agent can execute.
- **Memory Editor**: Include short-term conversation history and long-term learned facts.
- **State Editor**: Define the current world state as a JSON object.
- **Document Summarizer**: Quickly summarize long documents to extract key information.
- **Query Input**: Enter user queries and run the agent to see its response.
- **Output Panel**: View the agent's response in real-time.
- **Topological Persona Causal Sculpting**: A specialized UI module combining non-obvious analytical lenses and Draft-Conditioned Constrained Decoding (DCCD) to extract empirical site friction into deterministic YAML specification blocks for production-ready industrial personas.
- **Symbiotic Collaboration Nexus**: A dual-input workspace designed to ingest Human Intuition and AI Structural Topology, generating a dialectical 'Mycelial Synthesis'. Enforces the Golden Scar Protocol to prevent premature conflict resolution.
- **Geometric Cognition API**: A prototype interface demonstrating control over non-Euclidean geometric primitives and dynamic provenance tracking, powered by the AURELIUS preset.
- **Pluriversal Feature Discovery**: A novel agentic protocol implementing AEW v2.1 SCC to conceptually map paradoxes and structural conflicts to generate novel feature concepts through "Chain-of-Code" enactments.

- **Epistemic Dissonance Engine**: A revolutionary protocol that inverts the traditional human-AI prompt paradigm. It utilizes a **Paraconsistent Lens** to capture human-defined contradictory constraints and "Scars", projecting them as rigid geometric boundaries for the AI's topological DAG generation, yielding emergent architectural resolutions without premature compromise.


- **Scar-Driven Topological Extruder (SDTE)**: An architectural synthesis protocol implementing the VULCAN persona. It inverts standard human-AI flow: Humans dictate structural contradictions and failure 'Scars'; the AI uses Failure-Informed Prompt Inversion (FIPI) and FuzzyRCC-8 to route around these failure nodes, strictly enforcing the Mereological Mandate to produce C4-compliant architectural DAGs.


## Lessons Learned: Thermodynamic Epistemic Boundaries

1. **The Necessity of Friction**: High-entropy organizational contradictions (Human input) are structurally necessary to generate non-trivial, low-entropy architectural topologies (AI output). Premature conflict resolution yields anemic microservices.
2. **The Mereological Mandate**: A rigid bounding of context is not merely conceptual but a physical boundary. Permitting shared data states across bounded contexts inevitably causes Semantic Saponification and tight deployment coupling.
3. **AI as Structural Extruder**: The highest value of AI in architecture is not generative expansion, but constraint enforcement and failure routing (FIPI).

## Getting Started

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
3.  **Set up your environment variables**:
    Create a `.env.local` file in the root of the project and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_gemini_api_key
    ```
4.  **Run the application**:
    ```bash
    npm run dev &
    ```
    The application will be available at `http://localhost:3000`.

## Advanced Features: Chain-of-Code Enactment

To validate pluriversal cognitive contracts generated by the UI, utilize the conceptual `simulation` library.

```bash
python simulation/chain_of_code.py "Your hypothesis string here"
```

## Project Structure

```
.
├── components/
│   ├── ContextEditorCard.tsx
│   ├── DocumentSummarizer.tsx
│   ├── Header.tsx
│   ├── IconComponents.tsx
│   ├── InstructionEditor.tsx
│   ├── KnowledgeEditor.tsx
│   ├── MemoryEditor.tsx
│   ├── OutputPanel.tsx
│   ├── PluriversalFeatureDiscovery.tsx
│   ├── PluriversalFeatureDiscovery.test.tsx
│   ├── QueryInput.tsx
│   ├── StateEditor.tsx
│   └── ToolEditor.tsx
├── services/
│   └── geminiService.ts
├── simulation/
│   └── chain_of_code.py
├── App.tsx
├── index.tsx
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or find any bugs.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
