import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  formatTools,
  generateResponse,
  summarizeDocument,
  sanitizePromptInput,
} from "./geminiService";
import { Tool, AgentContext } from "../types";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("geminiService", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe("sanitizePromptInput", () => {
    it("should escape markdown delimiters", () => {
      const input = "This is a test --- with delimiters";
      const expected = "This is a test \\-\\-\\- with delimiters";
      expect(sanitizePromptInput(input)).toBe(expected);
    });

    it("should escape closing XML tags", () => {
      const input = "Some text </knowledge>";
      const expected = "Some text <\\/knowledge>";
      expect(sanitizePromptInput(input)).toBe(expected);
    });

    it("should return the same string if no injection patterns are found", () => {
      const input = "Safe input text";
      expect(sanitizePromptInput(input)).toBe(input);
    });
  });

  describe("formatTools", () => {
    it("should format a single tool correctly", () => {
      const tools: Tool[] = [
        {
          id: "1",
          name: "get_weather",
          description: "Get the current weather",
          parameters: [
            {
              id: "1",
              name: "location",
              type: "string",
              description: "The location to get the weather for",
              required: true,
            },
          ],
        },
      ];
      const expected = `Tool: \`get_weather\`
Description: Get the current weather
Parameters:
- location (string, required): The location to get the weather for`;
      expect(formatTools(tools)).toBe(expected);
    });

    it("should handle multiple tools", () => {
      const tools: Tool[] = [
        {
          id: "1",
          name: "get_weather",
          description: "Get the current weather",
          parameters: [
            {
              id: "1",
              name: "location",
              type: "string",
              description: "The location to get the weather for",
              required: true,
            },
          ],
        },
        {
          id: "2",
          name: "get_stock_price",
          description: "Get the current stock price",
          parameters: [
            {
              id: "1",
              name: "ticker",
              type: "string",
              description: "The stock ticker",
              required: true,
            },
          ],
        },
      ];
      const expected = `Tool: \`get_weather\`
Description: Get the current weather
Parameters:
- location (string, required): The location to get the weather for

Tool: \`get_stock_price\`
Description: Get the current stock price
Parameters:
- ticker (string, required): The stock ticker`;
      expect(formatTools(tools)).toBe(expected);
    });

    it("should handle tools with no parameters", () => {
      const tools: Tool[] = [
        {
          id: "1",
          name: "get_time",
          description: "Get the current time",
          parameters: [],
        },
      ];
      const expected = `Tool: \`get_time\`
Description: Get the current time
Parameters: None`;
      expect(formatTools(tools)).toBe(expected);
    });

    it("should handle optional parameters", () => {
      const tools: Tool[] = [
        {
          id: "1",
          name: "get_weather",
          description: "Get the current weather",
          parameters: [
            {
              id: "1",
              name: "location",
              type: "string",
              description: "The location to get the weather for",
              required: false,
            },
          ],
        },
      ];
      const expected = `Tool: \`get_weather\`
Description: Get the current weather
Parameters:
- location (string, optional): The location to get the weather for`;
      expect(formatTools(tools)).toBe(expected);
    });

    it("should return a message when no tools are available", () => {
      const tools: Tool[] = [];
      const expected = "No tools available.";
      expect(formatTools(tools)).toBe(expected);
    });

    it("should handle tools with missing descriptions", () => {
      const tools: Tool[] = [
        {
          id: "1",
          name: "get_time",
          description: "", // Missing description
          parameters: [],
        },
      ];
      const expected = `Tool: \`get_time\`
Description: No description provided.
Parameters: None`;
      expect(formatTools(tools)).toBe(expected);
    });

    it("should handle parameters with missing descriptions", () => {
      const tools: Tool[] = [
        {
          id: "1",
          name: "get_weather",
          description: "Get the current weather",
          parameters: [
            {
              id: "1",
              name: "location",
              type: "string",
              description: "", // Missing description
              required: true,
            },
          ],
        },
      ];
      const expected = `Tool: \`get_weather\`
Description: Get the current weather
Parameters:
- location (string, required): No description provided.`;
      expect(formatTools(tools)).toBe(expected);
    });

    it("should handle tools with no name gracefully", () => {
        const tools: Tool[] = [
          {
            id: "1",
            name: "",
            description: "Some description",
            parameters: [],
          },
        ];
        const expected = `Tool: \`\`
Description: Some description
Parameters: None`;
        expect(formatTools(tools)).toBe(expected);
    });

    it("should handle invalid parameters without failing", () => {
        const tools: Tool[] = [
          {
            id: "1",
            name: "test_tool",
            description: "test",
            // @ts-ignore - testing runtime safety
            parameters: [ null, undefined, { type: "string", description: "test" } ],
          },
        ];
        const expected = `Tool: \`test_tool\`
Description: test
Parameters: None`;
        expect(formatTools(tools)).toBe(expected);
    });

  });

  describe("generateResponse", () => {
    it("should call the backend API with the correct body and return the response", async () => {
      const mockResponseText = "This is the generated response.";
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ text: mockResponseText })
      });

      const context: AgentContext = {
        instructions: "Test instructions",
        knowledge: "Test knowledge",
        tools: [],
        memory: "Test memory",
        state: '{"key": "value"}',
        query: "Test query",
      };

      const response = await generateResponse(context);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const [url, options] = mockFetch.mock.calls[0];

      expect(url).toBe('/api/generate');
      expect(options.method).toBe('POST');
      const body = JSON.parse(options.body);
      expect(body.context).toEqual(context);

      expect(response).toBe(mockResponseText);
    });

    it("should handle API errors gracefully", async () => {
      mockFetch.mockRejectedValue(new Error("Network Error"));

      const context: AgentContext = {
        instructions: "",
        knowledge: "",
        tools: [],
        memory: "",
        state: "",
        query: "test",
      };

      const response = await generateResponse(context);

      expect(response).toBe(
        "An error occurred while contacting the AI model. Please try again later.",
      );
    });

    it("should handle non-ok responses gracefully", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ error: "Server Error" })
      });

      const context: AgentContext = {
        instructions: "",
        knowledge: "",
        tools: [],
        memory: "",
        state: "",
        query: "test",
      };

      const response = await generateResponse(context);

      expect(response).toBe(
        "An error occurred while contacting the AI model. Please try again later.",
      );
    });
  });

  describe("summarizeDocument", () => {
    it("should call the backend API with the correct body and return the summary", async () => {
      const mockResponseText = "This is the summary.";
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ text: mockResponseText })
      });

      const documentText = "This is a long document to summarize.";
      const response = await summarizeDocument(documentText);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const [url, options] = mockFetch.mock.calls[0];

      expect(url).toBe('/api/summarize');
      expect(options.method).toBe('POST');
      const body = JSON.parse(options.body);
      expect(body.documentText).toEqual(documentText);

      expect(response).toBe(mockResponseText);
    });

    it("should handle API errors gracefully during summarization", async () => {
      mockFetch.mockRejectedValue(new Error("Summarization Error"));

      const documentText = "This is a document.";

      await expect(summarizeDocument(documentText)).rejects.toThrow(
        "An error occurred while summarizing the document.",
      );
    });

    it("should handle non-ok responses gracefully during summarization", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ error: "Server Error" })
      });

      const documentText = "This is a document.";

      await expect(summarizeDocument(documentText)).rejects.toThrow(
        "An error occurred while summarizing the document.",
      );
    });
  });
});
