# @sammons/typed-mind-vscode-extension

VS Code extension for TypedMind DSL (.tmd files).

## Features

- Syntax highlighting for .tmd files
- Real-time validation and diagnostics
- IntelliSense for entity names and operators
- Hover information showing entity details
- Go to definition for entity references
- Find all references

## Installation

1. Build the extension: `pnpm build`
2. Package the extension: `pnpm package`
3. Install the generated .vsix file in VS Code

## File Extension

The extension registers `.tmd` as the file extension for TypedMind DSL files.

## Syntax Highlighting

The extension provides syntax highlighting for:
- Entity types: Program, File, Function, Class, Constants
- Operators: ->, <-, @, ::, ~>, <:, !, =>
- Comments starting with #
- String literals
- Import/export wildcards with *