#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { installRules, listAvailableRules } from './commands';
import { getRuleTemplate } from './templates';
import { RuleType } from './types';

const program = new Command();

program
  .name('cursor-rules')
  .description('Install cursor rules for different project types')
  .version('1.0.0');

program
  .command('list')
  .description('List all available cursor rule sets')
  .action(async () => {
    console.log(chalk.blue.bold('\n📋 Available Cursor Rule Sets:\n'));
    const rules = listAvailableRules();
    rules.forEach((rule, index) => {
      console.log(chalk.green(`${index + 1}. ${rule.name}`));
      console.log(chalk.gray(`   ${rule.description}\n`));
    });
  });

program
  .command('install')
  .description('Install cursor rules interactively')
  .option('-t, --type <type>', 'Specify rule type directly')
  .option('-f, --force', 'Overwrite existing .cursorrules file')
  .action(async (options) => {
    try {
      let ruleType: RuleType;
      
      if (options.type) {
        ruleType = options.type as RuleType;
        if (!Object.values(RuleType).includes(ruleType)) {
          console.error(chalk.red(`❌ Invalid rule type: ${ruleType}`));
          console.log(chalk.yellow('Available types:'), Object.values(RuleType).join(', '));
          process.exit(1);
        }
      } else {
        const { selectedRule } = await inquirer.prompt([
          {
            type: 'list',
            name: 'selectedRule',
            message: 'Select a cursor rule set to install:',
            choices: Object.values(RuleType).map(rule => ({
              name: rule,
              value: rule
            }))
          }
        ]);
        ruleType = selectedRule;
      }

      await installRules(ruleType, options.force);
      console.log(chalk.green.bold('\n✅ Cursor rules installed successfully!'));
      console.log(chalk.blue('Rules are now available in .cursor/rules/ directory.'));
      console.log(chalk.gray('You can now use Cursor with your new rules.'));
    } catch (error) {
      console.error(chalk.red('❌ Error installing cursor rules:'), error);
      process.exit(1);
    }
  });

program
  .command('preview <type>')
  .description('Preview a cursor rule set without installing')
  .action((type) => {
    try {
      const template = getRuleTemplate(type as RuleType);
      console.log(chalk.blue.bold(`\n📄 Preview of ${type} cursor rules:\n`));
      console.log(chalk.gray('─'.repeat(50)));
      console.log(template);
      console.log(chalk.gray('─'.repeat(50)));
    } catch (error) {
      console.error(chalk.red('❌ Error previewing cursor rules:'), error);
      process.exit(1);
    }
  });

program.parse();
