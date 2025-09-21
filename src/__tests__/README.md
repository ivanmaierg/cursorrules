# Testing Guide

This directory contains all test files for the cursor-rules-cli project.

## Test Structure

- `setup.ts` - Jest setup and global mocks
- `__mocks__/` - Manual mocks for external dependencies
- `utils/` - Test utilities and helpers
- `*.test.ts` - Unit tests for each module
- `integration.test.ts` - Integration tests

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests for CI
pnpm test:ci
```

## Test Coverage

The project maintains a minimum coverage threshold of 80% for:
- Branches
- Functions
- Lines
- Statements

## Mock Strategy

- **fs-extra**: Mocked to avoid actual file system operations
- **chalk**: Mocked to prevent color output in tests
- **console**: Methods are mocked and restored in setup

## Writing Tests

1. Follow the AAA pattern: Arrange, Act, Assert
2. Use descriptive test names
3. Test both success and error scenarios
4. Mock external dependencies
5. Clean up mocks between tests

## Test Files

- `types.test.ts` - Tests for type definitions and enums
- `templates.test.ts` - Tests for template loading functionality
- `commands.test.ts` - Tests for CLI command implementations
- `integration.test.ts` - End-to-end workflow tests
