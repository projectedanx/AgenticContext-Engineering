
/**
 * Represents a parameter for a tool.
 * @property id - A unique identifier for the parameter.
 * @property name - The name of the parameter.
 * @property type - The data type of the parameter.
 * @property description - A description of the parameter.
 * @property required - A boolean indicating whether the parameter is required.
 */
export interface ToolParameter {
  id: string;
  name: string;
  type: string;
  description: string;
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
  id:string;
  name: string;
  description: string;
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
  instructions: string;
  knowledge: string;
  tools: Tool[];
  memory: string;
  state: string; // JSON as a string
  query: string;
}
