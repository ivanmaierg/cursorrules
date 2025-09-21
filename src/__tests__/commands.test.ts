import { listAvailableRules } from '../commands';
import { RuleType } from '../types';

describe('commands', () => {
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
});
