import { describe, it, expect, vi } from 'vitest';
import { safeJsonParse, isValidTools } from './storageUtils';

describe('storageUtils', () => {
  describe('isValidTools', () => {
    it('should return true for valid tools', () => {
      const validTools = [
        {
          id: '1',
          name: 'test_tool',
          description: 'A test tool',
          parameters: [
            {
              id: 'p1',
              name: 'param1',
              type: 'string',
              description: 'parameter 1',
              required: true,
            },
          ],
        },
      ];
      expect(isValidTools(validTools)).toBe(true);
    });

    it('should return false for invalid tools structure', () => {
      expect(isValidTools('not an array')).toBe(false);
      expect(isValidTools([{ id: '1' }])).toBe(false); // Missing fields
      expect(isValidTools([{ id: '1', name: 'tool', description: 'desc', parameters: 'not an array' }])).toBe(false);
    });

    it('should return false if parameters are invalid', () => {
      const invalidTools = [
        {
          id: '1',
          name: 'test_tool',
          description: 'A test tool',
          parameters: [
            {
              id: 'p1',
              name: 'param1',
              // type is missing
              description: 'parameter 1',
              required: true,
            },
          ],
        },
      ];
      expect(isValidTools(invalidTools)).toBe(false);
    });
  });

  describe('safeJsonParse', () => {
    const defaultValue = [{ id: 'default', name: 'default', description: 'default', parameters: [] }];
    const validator = isValidTools;

    it('should return parsed data if valid', () => {
      const validTools = [{ id: '1', name: 'tool', description: 'desc', parameters: [] }];
      const json = JSON.stringify(validTools);
      expect(safeJsonParse(json, defaultValue, validator)).toEqual(validTools);
    });

    it('should return default value if json is null', () => {
      expect(safeJsonParse(null, defaultValue, validator)).toEqual(defaultValue);
    });

    it('should return default value if json is invalid JSON', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      expect(safeJsonParse('invalid-json', defaultValue, validator)).toEqual(defaultValue);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should return default value if parsed data fails validation', () => {
      const invalidData = [{ id: '1' }]; // Missing fields
      const json = JSON.stringify(invalidData);
      expect(safeJsonParse(json, defaultValue, validator)).toEqual(defaultValue);
    });
  });
});
