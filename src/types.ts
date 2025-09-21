export enum RuleType {
  REACT = 'react',
  NEXTJS = 'nextjs',
  TYPESCRIPT = 'typescript',
  NODEJS = 'nodejs',
  FULLSTACK = 'fullstack',
  MINIMAL = 'minimal',
  CODE_REVIEW = 'code_review',
  CURSOR_COMMANDS = 'cursor_commands'
}

export interface RuleInfo {
  name: string;
  description: string;
  type: RuleType;
}
