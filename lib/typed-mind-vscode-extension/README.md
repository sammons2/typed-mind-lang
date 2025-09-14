# TypedMind DSL VS Code Extension

VS Code language support for TypedMind Domain Specific Language (.tmd files).

<div align="center">
  <h3>
    <a href="https://sammons2.github.io/typed-mind-lang/">🌐 Try TypedMind Online</a> • 
    <a href="https://sammons2.github.io/typed-mind-lang/#getting-started">📚 Documentation</a> • 
    <a href="https://sammons2.github.io/typed-mind-lang/#examples">🎯 Examples</a>
  </h3>
</div>

## About TypedMind

TypedMind is a domain-specific language (DSL) for describing program architecture. It helps developers:
- Document complex system architectures clearly
- Visualize component relationships and dependencies
- Validate architectural constraints
- Generate interactive documentation

[Learn more about TypedMind →](https://sammons2.github.io/typed-mind-lang/)

## Commands

This extension provides the following commands accessible via the Command Palette (Cmd/Ctrl+Shift+P):

- **TypedMind: Validate Current File** - Check the current .tmd file for errors
- **TypedMind: Preview** - Render and visualize the TypedMind architecture (opens in browser)
- **TypedMind: Toggle Syntax Format** - Toggle between shortform and longform syntax (Ctrl+Shift+Alt+F)
- **TypedMind: Show Entity Graph** - Visualize the program architecture (opens in browser)
- **TypedMind: Format Document** - Format the TypedMind file (coming soon)
- **TypedMind: Generate Documentation** - Create documentation from .tmd files (coming soon)

## Features

### Language Support
- **Syntax highlighting** for TypedMind entities
- **Real-time validation** and diagnostics via Language Server Protocol
- **IntelliSense** for entity names and operators
- **Hover information** showing entity details and relationships
- **Go to definition** for entity references (Cmd/Ctrl+Click)
- **Find all references** across your codebase (Right-click → Find All References)
- **Semantic highlighting** for consistent entity coloring
- **Quick fixes** for common validation errors

## Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions view (Ctrl+Shift+X)
3. Search for "TypedMind DSL"
4. Click Install

Or install directly from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Sammons.typed-mind).

### From Command Line
```bash
code --install-extension Sammons.typed-mind
```

### Manual Installation (VSIX)
**For Cursor IDE or other VS Code-compatible editors that may not have marketplace access:**

1. **Download the latest VSIX file:**
   - [Latest Release (v0.2.0)](https://github.com/sammons2/typed-mind-lang/releases/latest) - Download `typed-mind-0.2.0.vsix`
   - Or browse all releases: [GitHub Releases](https://github.com/sammons2/typed-mind-lang/releases)

2. **Install in VS Code/Cursor:**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Install from VSIX"
   - Select "Extensions: Install from VSIX..."
   - Choose the downloaded `.vsix` file

3. **Alternative method:**
   - Open Extensions sidebar
   - Click "..." menu → "Install from VSIX..."
   - Select the downloaded file

### Manual Installation (Development)
1. Build: `pnpm build`
2. Package: `pnpm package`
3. Install: `code --install-extension typed-mind-*.vsix`
4. Extension will activate automatically for .tmd files

## Usage

The extension activates automatically for `.tmd` files.

### Quick Start
1. Create a new file with `.tmd` extension
2. Start typing your TypedMind architecture
3. Use IntelliSense (Ctrl+Space) for suggestions
4. Run validation with Cmd/Ctrl+Shift+P → "TypedMind: Validate Current File"

### Theme Selection
The extension works with any VS Code theme.

### Common Workflows
- **Navigate code**: Cmd/Ctrl+Click on entity names to jump to definitions
- **Find usages**: Right-click → Find All References
- **View errors**: Problems panel shows all validation errors
- **Quick fixes**: Hover over errors and click the lightbulb for fixes

## Development

- `pnpm dev` - Watch mode
- `pnpm build` - Build extension
- `pnpm package` - Create .vsix

## Example Syntax

```tmd
# Define your application
TodoApp -> AppEntry "Todo list application" v1.0.0

# Entry point
AppEntry @ src/index.ts:
  <- [express, TodoController]
  -> [startServer]

# Use ClassFile fusion for controllers
TodoController #: src/controllers/todo.controller.ts
  <- [TodoService]
  => [createTodo, getTodos, updateTodo, deleteTodo]

# Service layer
TodoService #: src/services/todo.service.ts
  => [create, findAll, update, delete]

# Runtime configuration
DATABASE_URL $env "PostgreSQL connection" (required)
PORT $env "Server port"
  = "3000"

# Dependencies
express ^ "Web framework" v4.18.0
```

## License

MIT