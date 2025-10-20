import { vi } from 'vitest';

const mockGenerateContent = vi.fn();

const GoogleGenAI = vi.fn().mockImplementation(() => ({
  models: {
    generateContent: mockGenerateContent,
  },
}));

export { GoogleGenAI, mockGenerateContent };
