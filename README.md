# Cursor Rules CLI

A powerful CLI tool to easily install different cursor rules for various project types. Get started with AI-assisted coding using Cursor with pre-configured rules for React, Next.js, TypeScript, Node.js, and more. Rules are installed in the modern `.cursor/rules/` directory structure with `.mdc` files.

## 🚀 Quick Start

### Installation

```bash
# Install globally using pnpm
pnpm add -g cursor-rules-cli

# Or use directly with npx (recommended)
npx cursor-rules-cli install
```

### Usage

```bash
# Interactive installation
npx cursor-rules-cli install

# Install specific rule type
npx cursor-rules-cli install --type react

# List all available rule sets
npx cursor-rules-cli list

# Preview a rule set without installing
npx cursor-rules-cli preview react

# Force overwrite existing .cursorrules
npx cursor-rules-cli install --type nextjs --force
```

## 📋 Available Rule Sets

### React
Comprehensive rules for React development with hooks, components, and best practices.
- Functional components with hooks
- TypeScript integration
- Performance optimization
- Testing strategies
- Accessibility features

### Next.js
Full-stack Next.js rules including SSR, API routes, and App Router patterns.
- App Router patterns
- Server and Client Components
- Data fetching strategies
- SEO optimization
- Performance monitoring

### TypeScript
TypeScript-focused rules with strict typing and modern patterns.
- Strict TypeScript configuration
- Advanced type definitions
- Generic types and utility types
- Error handling patterns
- Performance optimizations

### Node.js
Backend Node.js rules for APIs, servers, and backend development.
- API development patterns
- Database integration
- Security best practices
- Performance optimization
- Testing strategies

### Full-Stack
Complete full-stack development rules covering frontend and backend.
- End-to-end architecture
- API design patterns
- Database design
- Testing strategies
- Deployment practices

### Minimal
Lightweight rules for quick setup and basic AI assistance.
- Essential coding principles
- Clean code practices
- Basic error handling
- Simple and effective

## 🛠️ Commands

### `install`
Install cursor rules interactively or with specific type.

**Options:**
- `-t, --type <type>` - Specify rule type directly
- `-f, --force` - Overwrite existing .cursorrules file

**Examples:**
```bash
# Interactive installation
npx cursor-rules-cli install

# Install React rules
npx cursor-rules-cli install --type react

# Force overwrite
npx cursor-rules-cli install --type nextjs --force
```

### `list`
List all available cursor rule sets with descriptions.

```bash
npx cursor-rules-cli list
```

### `preview <type>`
Preview a cursor rule set without installing it.

```bash
npx cursor-rules-cli preview react
npx cursor-rules-cli preview nextjs
```

## 🔧 Development

### Prerequisites
- Node.js 16.0.0 or higher
- pnpm (recommended) or npm

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd cursor-rules-cli

# Install dependencies
pnpm install

# Build the project
pnpm build

# Run in development mode
pnpm dev
```

### Project Structure
```
cursor-rules-cli/
├── src/
│   ├── index.ts          # CLI entry point
│   ├── commands.ts       # Command implementations
│   ├── templates.ts      # Rule templates
│   └── types.ts          # TypeScript types
├── templates/            # Template files (if needed)
├── package.json
├── tsconfig.json
└── README.md
```

## 📦 Publishing

To publish this package to npm:

```bash
# Build the project
pnpm build

# Publish to npm
pnpm publish
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- Built for the Cursor AI coding assistant
- Inspired by the need for consistent coding standards
- Thanks to the open-source community for inspiration

---

**Happy Coding! 🎉**

For more information about Cursor, visit [cursor.sh](https://cursor.sh)
