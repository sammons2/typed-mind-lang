# Program Architecture DSL

## Core Syntax

### Long Form (Explicit)
```yaml
ProgramName:
  type: Program
  entry: EntryFile
  
EntryFile:
  type: File
  path: src/main.ts
  imports: [MiddlewareIndex, ConfigFile]
  exports: [MainFunc]
  
MainFunc:
  type: Function
  in: EntryFile
  sig: (req: Request, res: Response) => void
  desc: Main application entry point
```

### Short Form (Token-Efficient)
```yaml
ProgramName -> EntryFile

EntryFile @ src/main.ts:
  <- [MiddlewareIndex, ConfigFile]  # imports
  -> [MainFunc]                      # exports
  
MainFunc :: (req, res) => void
  "Main application entry point"
```

## Entity Types

### 1. Program
```yaml
# Long form
AppName:
  type: Program
  entry: MainFile
  version: 1.0.0

# Short form  
AppName -> MainFile v1.0.0
```

### 2. File
```yaml
# Long form
UserService:
  type: File
  path: src/services/user.ts
  imports: [Database, UserModel]
  exports: [createUser, getUser]

# Short form
UserService @ src/services/user.ts:
  <- [Database, UserModel]
  -> [createUser, getUser]
```

### 3. Function/Logic
```yaml
# Long form
createUser:
  type: Function
  in: UserService
  sig: (data: UserInput) => Promise<User>
  desc: Creates a new user in the database
  calls: [validateInput, Database.insert]

# Short form
createUser :: (data: UserInput) => Promise<User>
  "Creates a new user in the database"
  ~> [validateInput, Database.insert]
```

### 4. Class
```yaml
# Long form
UserController:
  type: Class
  in: ControllerFile
  extends: BaseController
  implements: [IController]
  methods: [handleCreate, handleGet]

# Short form
UserController <: BaseController, IController
  => [handleCreate, handleGet]
```

### 5. Constants/Config
```yaml
# Long form
AppConfig:
  type: Constants
  path: src/config.ts
  schema: ConfigSchema

# Short form
AppConfig ! src/config.ts : ConfigSchema
```

## Relationship Operators

- `->` : Entry point / Exports to
- `<-` : Imports from
- `@` : Located at
- `::` : Has signature
- `~>` : Calls/uses
- `<:` : Extends/implements
- `!` : Constants marker
- `=>` : Contains methods
- `#` : Comment
- `"..."` : Description/purpose

## Validation Rules

1. **No Orphans**: Every entity must be referenced by at least one other entity
2. **Path Consistency**: All file paths must be unique
3. **Import Validation**: Imported entities must exist and be exported
4. **Circular Dependency Detection**: Flag circular imports
5. **Entry Point**: Program must have exactly one entry point

## TypeScript Implementation

```typescript
interface DSLParser {
  parse(input: string): ProgramGraph
  validate(graph: ProgramGraph): ValidationResult
  render(graph: ProgramGraph): InteractiveView
}

interface ValidationResult {
  valid: boolean
  errors: DSLError[]
}

interface DSLError {
  line: number
  column: number
  message: string
  suggestion?: string
}
```

## Error Examples

```
Error at line 5, col 3: Orphaned entity 'UnusedHelper'
  Suggestion: Remove or reference this entity

Error at line 12, col 8: Import 'NonExistentModule' not found
  Did you mean 'ExistingModule'?

Error at line 18-23: Circular dependency detected
  UserService -> AuthService -> UserService
```

## Complete Example

```yaml
# Short form with mixed syntax
TodoApp -> AppEntry v2.0

AppEntry @ src/index.ts:
  <- [ExpressSetup, Routes, Database]
  -> [startServer]

ExpressSetup @ src/server.ts:
  <- [express, middleware/*]
  -> [app]

Routes @ src/routes/index.ts:
  <- [TodoRoutes, UserRoutes]
  -> [router]

TodoRoutes @ src/routes/todos.ts:
  <- [TodoController]
  -> [todoRouter]

TodoController <: BaseController
  => [create, read, update, delete]

create :: (req, res) => Promise<void>
  "Creates new todo item"
  ~> [validateTodo, TodoModel.create]

Database @ src/db/index.ts:
  <- [mongoose, ./schemas/*]
  -> [connection, models]

Config ! src/config.ts : EnvSchema
```