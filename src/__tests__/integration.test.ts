import { listAvailableRules, installRules } from '../commands';
import { getRuleTemplate } from '../templates';
import { RuleType } from '../types';
import fs from 'fs-extra';
import path from 'path';

// Mock fs-extra
jest.mock('fs-extra');

const mockFs = fs as jest.Mocked<typeof fs>;

describe('Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(process, 'cwd').mockReturnValue('/test/project');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Rule System Integration', () => {
    it('should have consistent rule types across all modules', () => {
      const listedRules = listAvailableRules();
      const listedTypes = listedRules.map(rule => rule.type);
      
      // All enum values should be represented in listed rules
      Object.values(RuleType).forEach(type => {
        expect(listedTypes).toContain(type);
      });
      
      // All listed rule types should be valid enum values
      listedTypes.forEach(type => {
        expect(Object.values(RuleType)).toContain(type);
      });
    });

    it('should be able to get template for all listed rules', () => {
      const mockContent = '# Test Rule Content';
      mockFs.readFileSync.mockReturnValue(mockContent);
      
      const listedRules = listAvailableRules();
      
      listedRules.forEach(rule => {
        expect(() => getRuleTemplate(rule.type)).not.toThrow();
      });
    });

    it('should be able to install all listed rules', async () => {
      mockFs.pathExists.mockResolvedValue(false);
      mockFs.ensureDir.mockResolvedValue();
      mockFs.copy.mockResolvedValue();
      
      const listedRules = listAvailableRules();
      
      for (const rule of listedRules) {
        await expect(installRules(rule.type)).resolves.not.toThrow();
      }
    });
  });

  describe('File System Integration', () => {
    it('should handle complete install workflow', async () => {
      const ruleType = RuleType.REACT;
      const mockContent = '# React Rules\nSome content here.';
      
      // Mock file system responses
      mockFs.pathExists.mockResolvedValue(false);
      mockFs.ensureDir.mockResolvedValue();
      mockFs.copy.mockResolvedValue();
      mockFs.readFileSync.mockReturnValue(mockContent);
      
      // Test the complete workflow
      const rules = listAvailableRules();
      const reactRule = rules.find(rule => rule.type === ruleType);
      expect(reactRule).toBeDefined();
      
      const template = getRuleTemplate(ruleType);
      expect(template).toBe(mockContent);
      
      await installRules(ruleType);
      
      // Verify all file system operations were called
      expect(mockFs.ensureDir).toHaveBeenCalled();
      expect(mockFs.copy).toHaveBeenCalled();
      expect(mockFs.readFileSync).toHaveBeenCalled();
    });

    it('should handle error scenarios gracefully', async () => {
      const ruleType = RuleType.REACT;
      const mockError = new Error('File system error');
      
      // Mock file system error
      mockFs.pathExists.mockResolvedValue(false);
      mockFs.ensureDir.mockResolvedValue();
      mockFs.copy.mockRejectedValue(mockError);
      
      // Test error handling
      await expect(installRules(ruleType)).rejects.toThrow('File system error');
    });
  });

  describe('Rule Content Validation', () => {
    it('should validate rule file structure', () => {
      const mockRuleContent = `---
description: Test rule description
globs: ["**/*.ts"]
alwaysApply: true
---

# Test Rule

This is a test rule content.`;
      
      mockFs.readFileSync.mockReturnValue(mockRuleContent);
      
      const template = getRuleTemplate(RuleType.REACT);
      
      // Basic validation of rule content structure
      expect(template).toContain('---');
      expect(template).toContain('description:');
      expect(template).toContain('globs:');
      expect(template).toContain('alwaysApply:');
      expect(template).toContain('#');
    });
  });
});
