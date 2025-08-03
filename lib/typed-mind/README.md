# @sammons/typed-mind

Core language parser and validator for TypedMind DSL - a declarative language for building software architectures.

## Installation

```bash
npm install @sammons/typed-mind
```

## Usage

```typescript
import { TypedMindParser, TypedMindValidator } from '@sammons/typed-mind';

// Parse TypedMind source code
const parser = new TypedMindParser();
const program = parser.parse(source);

// Validate the parsed program
const validator = new TypedMindValidator();
const validationResult = validator.validate(program);

if (validationResult.isValid) {
  console.log('Program is valid!');
} else {
  console.log('Validation errors:', validationResult.errors);
}
```

## What is TypedMind?

TypedMind is a Domain Specific Language (DSL) for declaratively describing software architectures, including:

- **Data Transfer Objects (DTOs)** - Define data structures and their validation rules
- **Service classes** - Specify business logic and their dependencies
- **UI components** - Describe user interface elements and their relationships
- **Asset management** - Define static assets and routing configuration
- **Cross-cutting concerns** - Handle validation, security, and other system-wide concerns

## Features

- **Declarative syntax** - Focus on what your system does, not how it's implemented
- **Strong validation** - Catch architectural issues before they become problems
- **Dependency tracking** - Understand relationships between components
- **Import system** - Modular architecture with file-based organization
- **Type safety** - Comprehensive validation of all language constructs

## Example

```typedmind
program "User Management System"

dto UserDto {
  id: string
  email: string
  name: string
  createdAt: date
}

service UserService {
  method createUser(email: string, name: string): UserDto
  method getUserById(id: string): UserDto
  depends on DatabaseService
}

ui UserListComponent {
  displays UserDto[]
  triggers UserService.createUser
}
```

## Grammar

The complete TypedMind grammar is documented in [grammar.md](./grammar.md) and available in EBNF format in [grammar.ebnf](./grammar.ebnf).

## Requirements

- Node.js >= 22.0.0

## Related Packages

- [@sammons/typed-mind-cli](https://www.npmjs.com/package/@sammons/typed-mind-cli) - Command-line interface
- [@sammons/typed-mind-lsp](https://www.npmjs.com/package/@sammons/typed-mind-lsp) - Language Server Protocol implementation
- [@sammons/typed-mind-renderer](https://www.npmjs.com/package/@sammons/typed-mind-renderer) - HTML/D3.js renderer

## License

MIT