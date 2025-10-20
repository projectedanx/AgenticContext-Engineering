import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockGenerateContent } from '@google/genai';
import { formatTools, generateResponse, summarizeDocument } from './geminiService';
import { Tool, AgentContext } from '../types';

vi.mock('@google/genai');

describe('geminiService', () => {
  beforeEach(() => {
    mockGenerateContent.mockClear();
  });

  describe('formatTools', () => {
    it('should format a single tool correctly', () => {
      const tools: Tool[] = [
        {
          id: '1',
          name: 'get_weather',
          description: 'Get the current weather',
          parameters: [
            { id: '1', name: 'location', type: 'string', description: 'The location to get the weather for', required: true },
          ],
        },
      ];
      const expected = `Tool: \`get_weather\`
Description: Get the current weather
Parameters:
- location (string, required): The location to get the weather for`;
      expect(formatTools(tools)).toBe(expected);
    });

    it('should handle multiple tools', () => {
        const tools: Tool[] = [
            {
              id: '1',
              name: 'get_weather',
              description: 'Get the current weather',
              parameters: [
                { id: '1', name: 'location', type: 'string', description: 'The location to get the weather for', required: true },
              ],
            },
            {
              id: '2',
              name: 'get_stock_price',
              description: 'Get the current stock price',
              parameters: [
                { id: '1', name: 'ticker', type: 'string', description: 'The stock ticker', required: true },
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
    })

    it('should handle tools with no parameters', () => {
        const tools: Tool[] = [
            {
              id: '1',
              name: 'get_time',
              description: 'Get the current time',
              parameters: [],
            },
          ];
          const expected = `Tool: \`get_time\`
Description: Get the current time
Parameters:
`;
          expect(formatTools(tools)).toBe(expected);
    })

    it('should handle optional parameters', () => {
        const tools: Tool[] = [
            {
              id: '1',
              name: 'get_weather',
              description: 'Get the current weather',
              parameters: [
                { id: '1', name: 'location', type: 'string', description: 'The location to get the weather for', required: false },
              ],
            },
          ];
          const expected = `Tool: \`get_weather\`
Description: Get the current weather
Parameters:
- location (string, optional): The location to get the weather for`;
          expect(formatTools(tools)).toBe(expected);
    })

    it('should return a message when no tools are available', () => {
      const tools: Tool[] = [];
      const expected = 'No tools available.';
      expect(formatTools(tools)).toBe(expected);
    });
  });

  describe('generateResponse', () => {
    it('should call the Gemini API with the correct prompt and return the response', async () => {
      const mockResponse = { text: 'This is the generated response.' };
      mockGenerateContent.mockResolvedValue(mockResponse);

      const context: AgentContext = {
        instructions: 'Test instructions',
        knowledge: 'Test knowledge',
        tools: [],
        memory: 'Test memory',
        state: '{"key": "value"}',
        query: 'Test query',
      };

      const response = await generateResponse(context);

      expect(mockGenerateContent).toHaveBeenCalledTimes(1);
      const calledWith = mockGenerateContent.mock.calls[0][0];

      expect(calledWith.model).toBe('gemini-2.5-pro');
      expect(calledWith.contents).toContain('## Core Instructions\nTest instructions');
      expect(calledWith.contents).toContain('## Knowledge Base (RAG)\n<knowledge>\nTest knowledge\n</knowledge>');
      expect(calledWith.contents).toContain('## Available Tools\nThe agent can invoke the following tools.\n<tools>\nNo tools available.\n</tools>');
      expect(calledWith.contents).toContain('## Conversation Memory (Short-Term)\n<memory>\nTest memory\n</memory>');
      expect(calledWith.contents).toContain('## Current State\nThe current state of the environment is represented by this JSON object:\n<state>\n{"key": "value"}\n</state>');
      expect(calledWith.contents).toContain('## User Query\nTest query');

      expect(response).toBe(mockResponse.text);
    });

    it('should handle API errors gracefully', async () => {
      const mockError = new Error('API Error');
      mockGenerateContent.mockRejectedValue(mockError);

      const context: AgentContext = {
        instructions: '', knowledge: '', tools: [], memory: '', state: '', query: 'test'
      };

      const response = await generateResponse(context);

      expect(response).toBe(`Error: ${mockError.message}`);
    });
  });

  describe('summarizeDocument', () => {
    it('should call the Gemini API with the correct prompt and return the summary', async () => {
      const mockResponse = { text: 'This is the summary.' };
      mockGenerateContent.mockResolvedValue(mockResponse);

      const documentText = 'This is a long document to summarize.';
      const response = await summarizeDocument(documentText);

      expect(mockGenerateContent).toHaveBeenCalledTimes(1);
      const calledWith = mockGenerateContent.mock.calls[0][0];

      expect(calledWith.model).toBe('gemini-2.5-flash');
      expect(calledWith.contents).toContain('--- DOCUMENT START ---\nThis is a long document to summarize.\n--- DOCUMENT END ---');
      expect(response).toBe(mockResponse.text);
    });

    it('should handle API errors gracefully during summarization', async () => {
        const mockError = new Error('Summarization Error');
        mockGenerateContent.mockRejectedValue(mockError);

        const documentText = 'This is a document.';

        await expect(summarizeDocument(documentText)).rejects.toThrow(`Error summarizing document: ${mockError.message}`);
      });
  });
});
