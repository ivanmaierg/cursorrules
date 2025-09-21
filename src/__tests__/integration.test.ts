import { listAvailableRules } from '../commands';
import { getRuleTemplate } from '../templates';
import { RuleType } from '../types';
import fs from 'fs-extra';

// Mock fs-extra
jest.mock('fs-extra');

const mockFs = fs as jest.Mocked<typeof fs>;

describe('Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
