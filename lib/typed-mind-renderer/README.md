# @sammons/typed-mind-renderer

Interactive HTML/D3.js renderer for TypedMind DSL - generates beautiful visualizations of software architectures.

## Installation

```bash
npm install @sammons/typed-mind-renderer
```

## Usage

```typescript
import { TypedMindParser } from '@sammons/typed-mind';
import { TypedMindRenderer } from '@sammons/typed-mind-renderer';

// Parse a TypedMind program
const parser = new TypedMindParser();
const program = parser.parse(typedMindSource);

// Render to HTML
const renderer = new TypedMindRenderer();
const html = renderer.renderToHtml(program);

// Save to file or serve via HTTP
```

## Features

- Interactive D3.js visualizations
- Entity relationship diagrams
- Dependency graphs
- Service architecture views
- UI component hierarchies
- Customizable styling and themes

## What is TypedMind?

TypedMind is a Domain Specific Language (DSL) for declaratively describing software architectures, including:

- Data Transfer Objects (DTOs)
- Service classes and their dependencies
- UI components and their relationships
- Asset management and routing
- Cross-cutting concerns and validation rules

## Requirements

- Node.js >= 22.0.0

## Related Packages

- [@sammons/typed-mind](https://www.npmjs.com/package/@sammons/typed-mind) - Core parser and validator
- [@sammons/typed-mind-cli](https://www.npmjs.com/package/@sammons/typed-mind-cli) - Command-line interface
- [@sammons/typed-mind-lsp](https://www.npmjs.com/package/@sammons/typed-mind-lsp) - Language Server Protocol implementation

## License

MIT