import { Tool, ToolParameter } from '../types';

/**
 * Type guard to check if a value is a ToolParameter.
 */
function isValidToolParameter(param: any): param is ToolParameter {
  return (
    typeof param === 'object' &&
    param !== null &&
    typeof param.id === 'string' &&
    typeof param.name === 'string' &&
    typeof param.type === 'string' &&
    typeof param.description === 'string' &&
    typeof param.required === 'boolean'
  );
}

/**
 * Type guard to check if a value is a Tool.
 */
function isValidTool(tool: any): tool is Tool {
  return (
    typeof tool === 'object' &&
    tool !== null &&
    typeof tool.id === 'string' &&
    typeof tool.name === 'string' &&
    typeof tool.description === 'string' &&
    Array.isArray(tool.parameters) &&
    tool.parameters.every(isValidToolParameter)
  );
}

/**
 * Type guard to check if a value is an array of Tools.
 */
export function isValidTools(tools: any): tools is Tool[] {
  return Array.isArray(tools) && tools.every(isValidTool);
}

/**
 * Safely parses a JSON string and validates the result.
 * If parsing fails or validation fails, returns the default value.
 *
 * @param json - The JSON string to parse.
 * @param defaultValue - The value to return if parsing or validation fails.
 * @param validator - A type guard function to validate the parsed data.
 * @returns The parsed and validated data, or the default value.
 */
export function safeJsonParse<T>(
  json: string | null,
  defaultValue: T,
  validator: (data: any) => data is T
): T {
  if (json === null) {
    return defaultValue;
  }

  try {
    const parsed = JSON.parse(json);
    if (validator(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.error('Failed to parse JSON from storage:', error);
  }

  return defaultValue;
}
