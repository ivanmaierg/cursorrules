export default {
  ensureDir: jest.fn(),
  pathExists: jest.fn(),
  copy: jest.fn(),
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
  mkdirSync: jest.fn(),
  existsSync: jest.fn(),
  removeSync: jest.fn(),
  statSync: jest.fn(),
  readdirSync: jest.fn(),
};
