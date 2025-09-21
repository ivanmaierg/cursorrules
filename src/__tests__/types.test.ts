import { RuleType } from '../types';

describe('types', () => {
  describe('RuleType enum', () => {
    it('should contain all expected rule types', () => {
      const expectedTypes = [
        'react',
        'nextjs',
        'typescript',
        'nodejs',
        'fullstack',
        'minimal',
        'code_review',
        'cursor_commands'
      ];

      expectedTypes.forEach(type => {
        expect(Object.values(RuleType)).toContain(type);
      });
    });

    it('should have unique values', () => {
      const values = Object.values(RuleType);
      const uniqueValues = new Set(values);
      expect(values.length).toBe(uniqueValues.size);
    });

    it('should have consistent naming convention', () => {
      Object.values(RuleType).forEach(type => {
        expect(type).toMatch(/^[a-z_]+$/);
        expect(type).not.toContain(' ');
        expect(type).not.toContain('-');
      });
    });
  });
});
