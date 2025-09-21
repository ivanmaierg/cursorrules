import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { RuleType, RuleInfo } from './types';

export const listAvailableRules = (): RuleInfo[] => {
  return [
    {
      name: 'React',
      description: 'Comprehensive rules for React development with hooks, components, and best practices',
      type: RuleType.REACT
    },
    {
      name: 'Next.js',
      description: 'Full-stack Next.js rules including SSR, API routes, and App Router patterns',
      type: RuleType.NEXTJS
    },
    {
      name: 'TypeScript',
      description: 'TypeScript-focused rules with strict typing and modern patterns',
      type: RuleType.TYPESCRIPT
    },
    {
      name: 'Node.js',
      description: 'Backend Node.js rules for APIs, servers, and backend development',
      type: RuleType.NODEJS
    },
    {
      name: 'Full-Stack',
      description: 'Complete full-stack development rules covering frontend and backend',
      type: RuleType.FULLSTACK
    },
    {
      name: 'Minimal',
      description: 'Lightweight rules for quick setup and basic AI assistance',
      type: RuleType.MINIMAL
    },
    {
      name: 'Code Review',
      description: 'Comprehensive code review guidelines for quality assurance and best practices',
      type: RuleType.CODE_REVIEW
    },
    {
      name: 'Cursor Commands',
      description: 'Rules for generating effective cursor commands and AI prompts',
      type: RuleType.CURSOR_COMMANDS
    }
  ];
};

export const installRules = async (ruleType: RuleType, force: boolean = false): Promise<void> => {
  const cursorDir = path.join(process.cwd(), '.cursor');
  const rulesDir = path.join(cursorDir, 'rules');
  const rulesFile = path.join(rulesDir, `${ruleType}.mdc`);
  
  // Create .cursor/rules directory if it doesn't exist
  await fs.ensureDir(rulesDir);
  
  // Check if rule file already exists
  if (await fs.pathExists(rulesFile) && !force) {
    console.log(chalk.yellow(`⚠️  ${ruleType}.mdc file already exists!`));
    console.log(chalk.blue('Use --force flag to overwrite it.'));
    return;
  }

  // Get the path to the source rule file in the package
  const sourceRuleFile = path.join(__dirname, '..', '.cursor', 'rules', `${ruleType}.mdc`);
  
  try {
    // Copy the rule file from package to project
    await fs.copy(sourceRuleFile, rulesFile);
    console.log(chalk.green(`✅ Installed ${ruleType} cursor rules to .cursor/rules/${ruleType}.mdc`));
  } catch (error) {
    console.error(chalk.red(`❌ Failed to install ${ruleType} rules:`), error);
    throw error;
  }
};
