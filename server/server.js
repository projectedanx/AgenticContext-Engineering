import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config({ path: '.env.local' });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("WARNING: API_KEY or GEMINI_API_KEY environment variable not set in server.js");
}

let ai = null;
if (apiKey) {
    ai = new GoogleGenAI({ apiKey: apiKey });
}

app.post('/api/generate', async (req, res) => {
  if (!ai) {
    return res.status(500).json({ error: "API key not configured on server." });
  }

  const { context } = req.body;
  if (!context) {
      return res.status(400).json({ error: "Context is required" });
  }

  const model = "gemini-2.5-pro";

  // Format tools for server side
  const formatTools = (tools) => {
    if (!tools || tools.length === 0) return "No tools available.";
    return tools.map((tool) => {
      const params = tool.parameters
        .map((p) => {
          if (!p || !p.name) return "";
          return `- ${p.name} (${p.type}, ${p.required ? "required" : "optional"}): ${p.description || "No description provided."}`;
        })
        .filter((p) => p !== "")
        .join("\n");
      const formattedParams = params ? `\nParameters:\n${params}` : "\nParameters: None";
      return `Tool: \`${tool.name}\`\nDescription: ${tool.description || "No description provided."}${formattedParams}`;
    }).join("\n\n");
  };

  const prompt = `
--- AGENT CONTEXT START ---

## Core Instructions
${context.instructions}

## Knowledge Base (RAG)
<knowledge>
${context.knowledge || "No knowledge base provided."}
</knowledge>

## Available Tools
The agent can invoke the following tools.
<tools>
${formatTools(context.tools)}
</tools>

## Conversation Memory (Short-Term)
<memory>
${context.memory || "No conversation history."}
</memory>

## Current State
The current state of the environment is represented by this JSON object:
<state>
${context.state || "{}"}
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
    res.json({ text: response.text });
  } catch (error) {
    console.error("Error calling Gemini API in generateResponse", error);
    res.status(500).json({ error: "An error occurred while contacting the AI model. Please try again later." });
  }
});

app.post('/api/summarize', async (req, res) => {
  if (!ai) {
    return res.status(500).json({ error: "API key not configured on server." });
  }

  const { documentText } = req.body;
  if (!documentText) {
      return res.status(400).json({ error: "Document text is required" });
  }

  const model = "gemini-2.5-flash";

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
    res.json({ text: response.text });
  } catch (error) {
    console.error("Error calling Gemini API in summarizeDocument", error);
    res.status(500).json({ error: "An error occurred while summarizing the document." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
