import chalk from 'chalk';

// Mock chalk to prevent color output in tests
jest.mock('chalk', () => ({
  blue: jest.fn((text: string) => text),
  green: jest.fn((text: string) => text),
  red: jest.fn((text: string) => text),
  yellow: jest.fn((text: string) => text),
  gray: jest.fn((text: string) => text),
  bold: {
    blue: jest.fn((text: string) => text),
    green: jest.fn((text: string) => text),
    red: jest.fn((text: string) => text),
    yellow: jest.fn((text: string) => text),
  }
}));

// Mock console methods to avoid noise in tests
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

beforeEach(() => {
  console.log = jest.fn();
  console.error = jest.fn();
});

afterEach(() => {
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
});

// Global test utilities
global.createMockFile = (content: string = 'test content') => {
  return Buffer.from(content, 'utf8');
};

global.createMockPath = (...segments: string[]) => {
  return segments.join('/');
};
