
export interface ToolParameter {
  id: string;
  name: string;
  type: string;
  description: string;
  required: boolean;
}

export interface Tool {
  id:string;
  name: string;
  description: string;
  parameters: ToolParameter[];
}

export interface AgentContext {
  instructions: string;
  knowledge: string;
  tools: Tool[];
  memory: string;
  state: string; // JSON as a string
  query: string;
}
