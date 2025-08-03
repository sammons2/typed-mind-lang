# @sammons/typed-mind-lsp

Language Server Protocol implementation for TypedMind DSL (.tmd files) - providing IDE support with syntax highlighting, validation, and intellisense.

## Installation

```bash
npm install @sammons/typed-mind-lsp
```

## Features

- Syntax validation using the @sammons/typed-mind validator
- Diagnostics for errors and warnings
- Hover information for entities
- Go to definition
- Find references
- Auto-completion for entity names and operators

## Usage

This package is primarily used by the VS Code extension. To run the LSP server standalone:

```bash
typed-mind-lsp
```

The server communicates via stdio and implements the Language Server Protocol.

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
- [@sammons/typed-mind-renderer](https://www.npmjs.com/package/@sammons/typed-mind-renderer) - HTML/D3.js renderer

## License

MIT