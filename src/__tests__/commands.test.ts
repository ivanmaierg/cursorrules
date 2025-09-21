import { listAvailableRules, installRules } from '../commands';
import { RuleType } from '../types';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

// Mock dependencies
jest.mock('fs-extra');
jest.mock('chalk');

const mockFs = fs as jest.Mocked<typeof fs>;
const mockChalk = chalk as jest.Mocked<typeof chalk>;

describe('commands', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset process.cwd to a known value
    jest.spyOn(process, 'cwd').mockReturnValue('/test/project');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('listAvailableRules', () => {
    it('should return array of all available rules', () => {
      const rules = listAvailableRules();

      expect(Array.isArray(rules)).toBe(true);
      expect(rules.length).toBeGreaterThan(0);
    });

    it('should include all rule types', () => {
      const rules = listAvailableRules();
      const ruleTypes = rules.map(rule => rule.type);

      Object.values(RuleType).forEach(type => {
        expect(ruleTypes).toContain(type);
      });
    });

    it('should have proper structure for each rule', () => {
      const rules = listAvailableRules();

      rules.forEach(rule => {
        expect(rule).toHaveProperty('name');
        expect(rule).toHaveProperty('description');
        expect(rule).toHaveProperty('type');
        expect(typeof rule.name).toBe('string');
        expect(typeof rule.description).toBe('string');
        expect(Object.values(RuleType)).toContain(rule.type);
      });
    });

    it('should have unique rule types', () => {
      const rules = listAvailableRules();
      const types = rules.map(rule => rule.type);
      const uniqueTypes = new Set(types);

      expect(types.length).toBe(uniqueTypes.size);
    });
  });

  describe('installRules', () => {
    const mockCursorDir = '/test/project/.cursor';
    const mockRulesDir = '/test/project/.cursor/rules';
    const mockRulesFile = '/test/project/.cursor/rules/react.mdc';
    const mockSourceFile = path.join(__dirname, '..', '..', '.cursor', 'rules', 'react.mdc');

    it('should install rules successfully when file does not exist', async () => {
      mockFs.pathExists.mockResolvedValue(false);
      mockFs.ensureDir.mockResolvedValue();
      mockFs.copy.mockResolvedValue();

      await installRules(RuleType.REACT);

      expect(mockFs.ensureDir).toHaveBeenCalledWith(mockRulesDir);
      expect(mockFs.copy).toHaveBeenCalledWith(mockSourceFile, mockRulesFile);
    });

    it('should not install when file exists and force is false', async () => {
      mockFs.pathExists.mockResolvedValue(true);

      await installRules(RuleType.REACT, false);

      expect(mockFs.copy).not.toHaveBeenCalled();
      expect(mockChalk.yellow).toHaveBeenCalledWith(expect.stringContaining('⚠️'));
      expect(mockChalk.blue).toHaveBeenCalledWith(expect.stringContaining('Use --force'));
    });

    it('should install when file exists and force is true', async () => {
      mockFs.pathExists.mockResolvedValue(true);
      mockFs.ensureDir.mockResolvedValue();
      mockFs.copy.mockResolvedValue();

      await installRules(RuleType.REACT, true);

      expect(mockFs.copy).toHaveBeenCalledWith(mockSourceFile, mockRulesFile);
    });

    it('should create directory if it does not exist', async () => {
      mockFs.pathExists.mockResolvedValue(false);
      mockFs.ensureDir.mockResolvedValue();
      mockFs.copy.mockResolvedValue();

      await installRules(RuleType.REACT);

      expect(mockFs.ensureDir).toHaveBeenCalledWith(mockRulesDir);
    });

    it('should handle copy errors and throw them', async () => {
      const mockError = new Error('Copy failed');
      mockFs.pathExists.mockResolvedValue(false);
      mockFs.ensureDir.mockResolvedValue();
      mockFs.copy.mockRejectedValue(mockError);

      await expect(installRules(RuleType.REACT)).rejects.toThrow('Copy failed');
      expect(mockChalk.red).toHaveBeenCalledWith(expect.stringContaining('❌ Failed to install'));
    });

    it('should log success message when installation succeeds', async () => {
      mockFs.pathExists.mockResolvedValue(false);
      mockFs.ensureDir.mockResolvedValue();
      mockFs.copy.mockResolvedValue();

      await installRules(RuleType.REACT);

      expect(mockChalk.green).toHaveBeenCalledWith(
        expect.stringContaining('✅ Installed react cursor rules')
      );
    });

    it('should work with all rule types', async () => {
      mockFs.pathExists.mockResolvedValue(false);
      mockFs.ensureDir.mockResolvedValue();
      mockFs.copy.mockResolvedValue();

      for (const ruleType of Object.values(RuleType)) {
        await installRules(ruleType);
        expect(mockFs.copy).toHaveBeenCalled();
      }
    });
  });
});
