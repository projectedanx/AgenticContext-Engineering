import { AgentContext, Tool } from "../types";

/**
 * Sanitizes user input to prevent prompt injection attacks.
 * Escapes project-specific delimiters and closing XML tags.
 * @param input - The user input string.
 * @returns The sanitized string.
 */
export const sanitizePromptInput = (input: string): string => {
  if (!input) return input;
  return input
    .replace(/---/g, '\\-\\-\\-')
    .replace(/<\//g, '<\\/');
};

export function formatTools(tools: Tool[]): string {
  if (tools.length === 0) {
    return "No tools available.";
  }
  return tools
    .map((tool) => {
      const params = tool.parameters
        .map(
          (p) => {
            if (!p || !p.name) return ""; // Handle invalid parameters gracefully
            return `- ${p.name} (${p.type}, ${p.required ? "required" : "optional"}): ${p.description || "No description provided."}`;
          }
        )
        .filter((p) => p !== "")
        .join("\n");

      const formattedParams = params ? `\nParameters:\n${params}` : "\nParameters: None";

      return `Tool: \`${tool.name}\`
Description: ${tool.description || "No description provided."}${formattedParams}`;
    })
    .join("\n\n");
}

/**
 * Generates a response from the Gemini model based on the provided agent context.
 * @param context - The agent's context, including instructions, knowledge, tools, memory, state, and the user query.
 * @returns A promise that resolves to the Gemini model's response as a string.
 */
export const generateResponse = async (
  context: AgentContext,
): Promise<string> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ context }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error calling backend API in generateResponse", error);
    return "An error occurred while contacting the AI model. Please try again later.";
  }
};

/**
 * Summarizes a given document using the Gemini model.
 * @param documentText - The text of the document to be summarized.
 * @returns A promise that resolves to the summary of the document as a string.
 */
export const summarizeDocument = async (
  documentText: string,
): Promise<string> => {
  try {
    const response = await fetch('/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ documentText }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error calling backend API in summarizeDocument", error);
    throw new Error("An error occurred while summarizing the document.");
  }
};
