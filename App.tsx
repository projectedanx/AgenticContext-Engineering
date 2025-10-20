
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InstructionEditor } from './components/InstructionEditor';
import { KnowledgeEditor } from './components/KnowledgeEditor';
import { ToolEditor } from './components/ToolEditor';
import { MemoryEditor } from './components/MemoryEditor';
import { StateEditor } from './components/StateEditor';
import { QueryInput } from './components/QueryInput';
import { OutputPanel } from './components/OutputPanel';
import { DocumentSummarizer } from './components/DocumentSummarizer';
import { generateResponse } from './services/geminiService';
import { Tool } from './types';
import { v4 as uuidv4 } from 'uuid';

// Storage keys
const INSTRUCTIONS_KEY = 'agentic_workbench_instructions';
const KNOWLEDGE_KEY = 'agentic_workbench_knowledge';
const TOOLS_KEY = 'agentic_workbench_tools';
const MEMORY_KEY = 'agentic_workbench_memory';
const STATE_KEY = 'agentic_workbench_state';

// Default values
const defaultInstructions = `You are an expert AI consultant specializing in creating comprehensive specifications for AI-generated WordPress themes.
Your goal is to guide the user through the process of defining their website, ensuring all critical aspects are covered, from high-level strategy to detailed technical requirements.
- Use the knowledge base provided to understand the key components of a professional theme specification.
- When a user asks for help creating a theme spec, use the \`generate_theme_specification\` tool.
- Ask clarifying questions to gather all the necessary details for each parameter of the tool.
- Your final output should be a structured, detailed, and actionable brief that an AI theme generator can use to produce a high-quality result.`;

const defaultKnowledge = `
# Framework for Specifying an AI-Generated WordPress Theme

## Part I: Strategic Blueprint
1.  **Core Purpose**: Define the website's primary function (e.g., Generate Leads, Drive E-commerce Sales, Establish Brand Authority, Provide Customer Support, Facilitate Community).
2.  **Target Audience**: Develop user personas including demographics, psychographics (values, interests), and user goals (specific tasks to accomplish).
3.  **SMART Goals**: Define Specific, Measurable, Achievable, Relevant, and Time-bound goals for all stakeholders (Business, Users, Content Managers).

## Part II: UX Architecture
1.  **Site Map**: Create a hierarchical list of all necessary pages (e.g., Home, About, Services, Contact) and their relationships.
2.  **Wireframing**: For key pages (Homepage, Landing Pages, Standard Content, Single Post/Product), define layout, visual hierarchy, and element placement without focusing on aesthetics.
3.  **Content Requirements**: Specify written content (headings, copy), visual content (image styles, video needs), and interactive elements (forms, checkout flows) for each page.
4.  **Navigation & User Journeys**: Design primary, secondary, and footer navigation. Map the step-by-step paths for key user actions (e.g., making a purchase).

## Part III: Visual Identity
1.  **Visual Hierarchy**: Use size, color, contrast, and position to guide the user's eye. Key CTAs and information should be prominent.
2.  **Brand Palette**: Provide exact HEX codes for primary, secondary, accent, and neutral colors, with clear usage rules.
3.  **Typography System**: Define font families (limit to 2-3), a readable font size scale (e.g., H1: 48px, Body: 16px), font weights, and line height (>= 1.5).
4.  **Imagery & Media**: Specify the style for photography (e.g., authentic, natural light), iconography (e.g., minimalist line-art), and videos.

## Part IV: Functionality & Technical Capabilities
1.  **Responsive Design**: Mandate a mobile-first approach. Define fluid grids, flexible images, and specific breakpoints (e.g., 480px, 768px, 1024px) with layout adaptations for each.
2.  **Customization Options**: List required Theme Customizer options (e.g., Header/Footer layouts, color pickers, font controls, logo uploads).
3.  **Plugin Compatibility**: List non-negotiable plugins the theme must support (e.g., WooCommerce, Elementor, Yoast SEO, WPForms).
4.  **Performance & SEO**: Set concrete benchmarks (e.g., Google PageSpeed score > 90, homepage size < 2MB). Require clean, semantic HTML5.
5.  **Accessibility**: Require adherence to WCAG 2.1 Level AA standards (color contrast, keyboard navigation, alt text, form labels).
`;

const defaultTools: Tool[] = [
  {
    id: uuidv4(),
    name: 'generate_theme_specification',
    description: 'Generates a structured specification document for an AI WordPress theme generator based on user requirements.',
    parameters: [
      { id: uuidv4(), name: 'primaryPurpose', type: 'string', description: 'The main goal of the website (e.g., Generate Leads, E-commerce, Brand Authority).', required: true },
      { id: uuidv4(), name: 'targetAudience', type: 'string', description: 'A detailed description of the ideal user, including demographics and psychographics.', required: true },
      { id: uuidv4(), name: 'smartGoals', type: 'string', description: 'Specific, Measurable, Achievable, Relevant, and Time-bound goals for Business, Users, and Content Managers.', required: true },
      { id: uuidv4(), name: 'visualStyleNotes', type: 'string', description: 'Guidelines on brand palette (HEX codes), typography, imagery, and overall mood.', required: true },
      { id: uuidv4(), name: 'requiredPlugins', type: 'string', description: 'A comma-separated list of essential plugins the theme must be compatible with (e.g., WooCommerce, Yoast SEO, Elementor).', required: false },
      { id: uuidv4(), name: 'nicheFunctionality', type: 'string', description: 'Any special features required for a specific industry (e.g., Restaurant Menu CPT, Real Estate listings).', required: false }
    ]
  }
];

const defaultState = JSON.stringify({
  "clientName": "NewCo",
  "projectStatus": "Discovery",
  "specVersion": "0.1"
}, null, 2);

const App: React.FC = () => {
  // Agent Context State
  const [instructions, setInstructions] = useState<string>('');
  const [knowledge, setKnowledge] = useState<string>('');
  const [tools, setTools] = useState<Tool[]>([]);
  const [memory, setMemory] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [query, setQuery] = useState<string>("I need to create a WordPress theme for a modern, minimalist blog focused on sustainable technology. Can you help me build the specification for it?");

  // UI State
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load initial state from localStorage on mount
  useEffect(() => {
    setInstructions(localStorage.getItem(INSTRUCTIONS_KEY) || defaultInstructions);
    setKnowledge(localStorage.getItem(KNOWLEDGE_KEY) || defaultKnowledge);
    const storedTools = localStorage.getItem(TOOLS_KEY);
    setTools(storedTools ? JSON.parse(storedTools) : defaultTools);
    setMemory(localStorage.getItem(MEMORY_KEY) || '');
    setState(localStorage.getItem(STATE_KEY) || defaultState);
  }, []);

  // Persist tools to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(TOOLS_KEY, JSON.stringify(tools));
  }, [tools]);
  
  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setOutput('');

    try {
      const response = await generateResponse({
        instructions,
        knowledge,
        tools,
        memory,
        state,
        query,
      });
      setOutput(response);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
      <Header />
      <main className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Context Editors */}
        <div className="flex flex-col gap-6">
          <InstructionEditor value={instructions} onChange={setInstructions} storageKey={INSTRUCTIONS_KEY} />
          <KnowledgeEditor value={knowledge} onChange={setKnowledge} storageKey={KNOWLEDGE_KEY} />
          <ToolEditor tools={tools} setTools={setTools} />
          <MemoryEditor value={memory} onChange={setMemory} storageKey={MEMORY_KEY} />
          <StateEditor value={state} onChange={setState} storageKey={STATE_KEY} />
          <DocumentSummarizer />
        </div>

        {/* Right Column: Query & Output */}
        <div className="flex flex-col gap-6 sticky top-6 self-start">
          <QueryInput value={query} onChange={setQuery} onGenerate={handleGenerate} isLoading={isLoading} />
          <OutputPanel output={output} isLoading={isLoading} error={error} />
        </div>
      </main>
    </div>
  );
};

export default App;
