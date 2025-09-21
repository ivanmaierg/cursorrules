import { RuleType } from './types';
import fs from 'fs-extra';
import path from 'path';

export const getRuleTemplate = (ruleType: RuleType): string => {
  // Get the path to the rule file in the package
  const ruleFilePath = path.join(__dirname, '..', '.cursor', 'rules', `${ruleType}.mdc`);
  
  try {
    // Read the rule file content
    const ruleContent = fs.readFileSync(ruleFilePath, 'utf8');
    return ruleContent;
  } catch (error) {
    throw new Error(`Failed to read rule file for ${ruleType}: ${error}`);
  }
};
