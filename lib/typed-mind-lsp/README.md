# @sammons/typed-mind-lsp

Language Server Protocol implementation for TypedMind DSL (.tmd files).

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