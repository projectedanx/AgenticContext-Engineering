import re

file_path = 'README.md'
with open(file_path, 'r') as f:
    content = f.read()

# Make the Getting Started section more comprehensive
setup_replacement = """## Getting Started

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

*Note: Use the `--run` flag to execute tests in non-watch mode, which is particularly useful in CI/CD pipelines.*"""

# Replace the existing Getting Started section with our expanded version
new_content = re.sub(
    r"## Getting Started.*?## Advanced Configuration: Sovereign Agent Presets",
    setup_replacement + "\n\n## Advanced Configuration: Sovereign Agent Presets",
    content,
    flags=re.DOTALL
)

with open(file_path, 'w') as f:
    f.write(new_content)

print("Updated README.md")
