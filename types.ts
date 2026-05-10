
/**
 * Represents a parameter for a tool.
 * @property id - A unique identifier for the parameter.
 * @property name - The name of the parameter.
 * @property type - The data type of the parameter.
 * @property description - A description of the parameter.
 * @property required - A boolean indicating whether the parameter is required.
 */
export interface ToolParameter {
  /** The Id property. */
    id: string;
  /** The Name property. */
    name: string;
  /** The Type property. */
    type: string;
  /** The Description property. */
    description: string;
  /** The Required property. */
    required: boolean;
}

/**
 * Represents a tool that the agent can use.
 * @property id - A unique identifier for the tool.
 * @property name - The name of the tool.
 * @property description - A description of the tool.
 * @property parameters - An array of parameters for the tool.
 */
export interface Tool {
  /** The Id property. */
    id:string;
  /** The Name property. */
    name: string;
  /** The Description property. */
    description: string;
  /** The Parameters property. */
    parameters: ToolParameter[];
}

/**
 * Represents the context for the agent.
 * @property instructions - The core instructions for the agent.
 * @property knowledge - The knowledge base for the agent.
 * @property tools - An array of tools that the agent can use.
 * @property memory - The conversation memory for the agent.
 * @property state - The current state of the environment as a JSON string.
 * @property query - The user's query.
 */
export interface AgentContext {
  /** The Instructions property. */
    instructions: string;
  /** The Knowledge property. */
    knowledge: string;
  /** The Tools property. */
    tools: Tool[];
  /** The Memory property. */
    memory: string;
  /** The State property. */
    state: string; // JSON as a string
  /** The Query property. */
    query: string;
}

/**
 * Represents a project stakeholder with specific constraints.
 */
export interface Stakeholder {
  /** The Id property. */
    id: string;
  /** The Role property. */
    role: string;
  /** The Constraints property. */
    constraints: string[];
}

/**
 * Represents a decomposed user story.
 */
export interface UserStory {
  /** The Id property. */
    id: string;
  /** The Epic id property. */
    epicId: string;
  /** The Description property. */
    description: string;
  /** The Acceptance criteria property. */
    acceptanceCriteria: string[];
  /** The Complexity property. */
    complexity: number;
}

/**
 * Represents a high-level product epic.
 */
export interface Epic {
  /** The Id property. */
    id: string;
  /** The Name property. */
    name: string;
  /** The Description property. */
    description: string;
  /** The Status property. */
    status: 'Draft' | 'Decomposing' | 'Ready';
}
