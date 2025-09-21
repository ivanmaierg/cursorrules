export default {
  ensureDir: jest.fn().mockResolvedValue(undefined),
  pathExists: jest.fn().mockResolvedValue(false),
  copy: jest.fn().mockResolvedValue(undefined),
  readFileSync: jest.fn().mockReturnValue(''),
  writeFileSync: jest.fn(),
  mkdirSync: jest.fn(),
  existsSync: jest.fn().mockReturnValue(false),
  removeSync: jest.fn(),
  statSync: jest.fn(),
  readdirSync: jest.fn(),
};
