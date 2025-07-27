# TypedMind

A domain-specific language (DSL) for describing and visualizing program architecture.

## Packages

This monorepo contains three packages:

- **@sammons/typed-mind** - Core language parser and validator
- **@sammons/typed-mind-renderer** - Interactive HTML/D3.js visualization renderer
- **@sammons/typed-mind-cli** - Command-line interface

## Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

## Usage

### CLI

```bash
# Check a DSL file for errors
typed-mind --check architecture.dsl

# Render a DSL file interactively
typed-mind --render architecture.dsl

# Generate static HTML output
typed-mind --render architecture.dsl --output output.html

# Custom port and disable auto-browser
typed-mind --render architecture.dsl --port 8080 --no-browser
```

### Programmatic API

```typescript
import { DSLChecker } from '@sammons/typed-mind';
import { TypedMindRenderer } from '@sammons/typed-mind-renderer';

// Parse and validate DSL
const checker = new DSLChecker();
const result = checker.check(dslContent);

if (result.valid) {
  // Render visualization
  const graph = checker.parse(dslContent);
  const renderer = new TypedMindRenderer();
  renderer.setProgramGraph(graph);
  await renderer.serve();
}
```

## DSL Syntax

### Short Form Example

```yaml
TodoApp -> AppEntry v2.0

AppEntry @ src/index.ts:
  <- [ExpressSetup, Routes, Database]
  -> [startServer]

Routes @ src/routes/index.ts:
  <- [TodoRoutes, UserRoutes]
  -> [router]

TodoController <: BaseController
  => [create, read, update, delete]

create :: (req, res) => Promise<void>
  "Creates new todo item"
  ~> [validateTodo, TodoModel.create]

Config ! src/config.ts : EnvSchema
```

### Entity Types

- **Program**: `AppName -> EntryFile v1.0.0`
- **File**: `FileName @ path/to/file.ts:`
- **Function**: `funcName :: (args) => ReturnType`
- **Class**: `ClassName <: BaseClass, Interface`
- **Constants**: `ConfigName ! path/to/config.ts : Schema`

### Operators

- `->` : Entry point / Exports to
- `<-` : Imports from
- `@` : Located at
- `::` : Has signature
- `~>` : Calls/uses
- `<:` : Extends/implements
- `!` : Constants marker
- `=>` : Contains methods

## Development

```bash
# Run in development mode
pnpm dev

# Lint code
pnpm lint

# Clean build artifacts
pnpm clean
```

## License

MIT