import { GoogleGenAI } from "@google/genai";
import { AgentContext, Tool, ToolParameter } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Formats a list of tools into a string representation for the agent's prompt.
 * @param tools - An array of Tool objects to be formatted.
 * @returns A string describing the available tools, their descriptions, and parameters.
 */
function formatTools(tools: Tool[]): string {
  if (tools.length === 0) {
    return "No tools available.";
  }
  return tools.map(tool => {
    const params = tool.parameters.map(p => 
      `- ${p.name} (${p.type}, ${p.required ? 'required' : 'optional'}): ${p.description}`
    ).join('\n');
    return `Tool: \`${tool.name}\`
Description: ${tool.description}
Parameters:\n${params}`;
  }).join('\n\n');
}

/**
 * Generates a response from the Gemini model based on the provided agent context.
 * @param context - The agent's context, including instructions, knowledge, tools, memory, state, and the user query.
 * @returns A promise that resolves to the Gemini model's response as a string.
 */
export const generateResponse = async (context: AgentContext): Promise<string> => {
  const model = 'gemini-2.5-pro';

  const prompt = `
--- AGENT CONTEXT START ---

## Core Instructions
${context.instructions}

## Knowledge Base (RAG)
<knowledge>
${context.knowledge || 'No knowledge base provided.'}
</knowledge>

## Available Tools
The agent can invoke the following tools.
<tools>
${formatTools(context.tools)}
</tools>

## Conversation Memory (Short-Term)
<memory>
${context.memory || 'No conversation history.'}
</memory>

## Current State
The current state of the environment is represented by this JSON object:
<state>
${context.state || '{}'}
</state>

--- AGENT CONTEXT END ---

Based on the complete context above, respond to the following user query.

## User Query
${context.query}
  `;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Error: ${error.message}`;
    }
    return "An unknown error occurred while contacting the AI model.";
  }
};

/**
 * Summarizes a given document using the Gemini model.
 * @param documentText - The text of the document to be summarized.
 * @returns A promise that resolves to the summary of the document as a string.
 */
export const summarizeDocument = async (documentText: string): Promise<string> => {
  const model = 'gemini-2.5-flash';

  const prompt = `
Please provide a concise summary of the following document. Focus on the main points, key arguments, and overall conclusion.

--- DOCUMENT START ---
${documentText}
--- DOCUMENT END ---

Summary:
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API for summarization:", error);
    if (error instanceof Error) {
        throw new Error(`Error summarizing document: ${error.message}`);
    }
    throw new Error("An unknown error occurred while summarizing the document.");
  }
};
