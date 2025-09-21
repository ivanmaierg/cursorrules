import { getRuleTemplate } from '../templates';
import { RuleType } from '../types';
import fs from 'fs-extra';
import path from 'path';

// Mock fs-extra
jest.mock('fs-extra');

describe('templates', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRuleTemplate', () => {
    it('should read and return rule file content successfully', () => {
      const mockContent = '# Test Rule Content\nThis is a test rule file.';
      const ruleType = RuleType.REACT;
      const expectedPath = path.join(__dirname, '..', '..', '.cursor', 'rules', `${ruleType}.mdc`);

      mockFs.readFileSync.mockReturnValue(mockContent);

      const result = getRuleTemplate(ruleType);

      expect(mockFs.readFileSync).toHaveBeenCalledWith(expectedPath, 'utf8');
      expect(result).toBe(mockContent);
    });

    it('should throw error when file does not exist', () => {
      const ruleType = RuleType.REACT;
      const expectedPath = path.join(__dirname, '..', '..', '.cursor', 'rules', `${ruleType}.mdc`);
      const mockError = new Error('ENOENT: no such file or directory');

      mockFs.readFileSync.mockImplementation(() => {
        throw mockError;
      });

      expect(() => getRuleTemplate(ruleType)).toThrow('Failed to read rule file for react:');
      expect(mockFs.readFileSync).toHaveBeenCalledWith(expectedPath, 'utf8');
    });

    it('should handle all rule types', () => {
      const mockContent = '# Test Rule Content';
      mockFs.readFileSync.mockReturnValue(mockContent);

      Object.values(RuleType).forEach(ruleType => {
        expect(() => getRuleTemplate(ruleType)).not.toThrow();
      });
    });
  });
});
