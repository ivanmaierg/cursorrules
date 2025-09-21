import { RuleType } from '../../types';

export const createMockRuleInfo = (type: RuleType, overrides: Partial<{ name: string; description: string }> = {}) => {
  return {
    name: overrides.name || `Test ${type}`,
    description: overrides.description || `Test description for ${type}`,
    type
  };
};

export const createMockFileSystem = () => {
  const files = new Map<string, string>();
  
  return {
    files,
    setFile: (path: string, content: string) => files.set(path, content),
    getFile: (path: string) => files.get(path),
    hasFile: (path: string) => files.has(path),
    deleteFile: (path: string) => files.delete(path),
    clear: () => files.clear()
  };
};

export const mockConsoleMethods = () => {
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  
  const mockLog = jest.fn();
  const mockError = jest.fn();
  const mockWarn = jest.fn();
  
  console.log = mockLog;
  console.error = mockError;
  console.warn = mockWarn;
  
  return {
    mockLog,
    mockError,
    mockWarn,
    restore: () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    }
  };
};

export const waitForAsync = (ms: number = 0): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
