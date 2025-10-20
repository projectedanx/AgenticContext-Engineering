<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Agentic Context Engineering Workbench

The Agentic Context Engineering Workbench is a powerful and intuitive web-based application designed to facilitate the development and testing of deterministic AI coding agents. It provides a comprehensive suite of tools that allow developers to build, fine-tune, and manage the context in which their AI agents operate, ensuring more predictable and reliable behavior.

## Key Features

- **Core Instruction Editor**: Define the agent's persona, core directives, and operational rules.
- **Knowledge Base (RAG)**: Provide retrieved information from external sources to ground the agent.
- **Tool Editor**: Define the functions and capabilities the agent can execute.
- **Memory Editor**: Include short-term conversation history and long-term learned facts.
- **State Editor**: Define the current world state as a JSON object.
- **Document Summarizer**: Quickly summarize long documents to extract key information.
- **Query Input**: Enter user queries and run the agent to see its response.
- **Output Panel**: View the agent's response in real-time.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)

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
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Usage

The application is divided into two main columns:

-   **Left Column**: Contains all the context editors (Instructions, Knowledge, Tools, Memory, State) and the Document Summarizer.
-   **Right Column**: Contains the Query Input and the Output Panel.

To use the application, simply fill in the context editors with the desired information, enter a query in the Query Input, and click the "Run Agent" button. The agent's response will appear in the Output Panel.

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
│   ├── QueryInput.tsx
│   ├── StateEditor.tsx
│   └── ToolEditor.tsx
├── services/
│   └── geminiService.ts
├── App.tsx
├── index.tsx
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or find any bugs.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
