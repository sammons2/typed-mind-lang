# TypedMind DSL Grammar Specification

TypedMind is a Domain-Specific Language (DSL) for describing software architecture and component relationships. It supports both shortform (optimized for LLMs) and longform (verbose for humans) syntax that compile to the same Abstract Syntax Tree (AST).

## Table of Contents

1. [Entity Types](#entity-types)
2. [Syntax Variants](#syntax-variants)
3. [Operators and Symbols](#operators-and-symbols)
4. [Grammar Rules](#grammar-rules)
5. [Import System](#import-system)
6. [Comments](#comments)
7. [Validation Rules](#validation-rules)

## Entity Types

TypedMind supports 10 main entity types:

| Entity | Symbol | Purpose |
|--------|--------|---------|
| Program | `->` | Application entry points |
| File | `@` | Source code files with imports/exports |
| Function | `::` | Functions and methods with signatures |
| Class | `<:` | Classes with inheritance and methods |
| Constants | `!` | Configuration and constant values |
| DTO | `%` | Data Transfer Objects with typed fields |
| Asset | `~` | Static assets (images, HTML files, etc.) |
| UIComponent | `&` | UI components with containment relationships |
| RunParameter | `$` | Runtime configuration (env vars, IAM roles, etc.) |
| Dependency | `^` | External dependencies (npm packages, etc.) |

## Syntax Variants

### Shortform Syntax

Compact syntax optimized for LLMs and quick authoring:

```yaml
# Program
TodoApp -> AppEntry v1.0.0
TodoApp -> AppEntry "Main application" v1.0.0  # With purpose

# File
UserService @ src/services/user.ts:
  <- [Database, UserModel]  # imports
  -> [createUser, getUser]  # exports
  "User business logic"     # purpose

# Function
createUser :: (data: UserDTO) => Promise<User>
  "Creates a new user"      # description

# Class
UserController <: BaseController, IController
  => [create, read, update] # methods

# Constants
Config ! src/config.ts : ConfigSchema

# DTO
UserDTO % "User data transfer object"
  - name: string "User's full name"
  - email: string "Email address"
  - age?: number "Age in years"

# Asset
Logo ~ "Company logo SVG"

# UIComponent
App &! "Root application component"     # Root component
UserProfile & "User profile component"  # Regular component

# RunParameter
DATABASE_URL $env "PostgreSQL connection" (required)
API_KEY $env "API key" = "dev-key"

# Dependency
axios ^ "HTTP client library" v3.0.0
@types/node ^ "Node.js types" v20.0.0
```

### Longform Syntax

Verbose syntax for human readability:

```yaml
# Program
program TodoApp {
  entry: AppEntry
  version: "1.0.0"
  purpose: "Main application"
}

# File
file UserService {
  path: "src/services/user.ts"
  imports: [Database, UserModel]
  exports: [createUser, getUser]
  purpose: "User business logic"
}

# Function
function createUser {
  signature: "(data: UserDTO) => Promise<User>"
  description: "Creates a new user"
  input: UserDTO
  output: User
  calls: [validate, Database.save]
  affects: [UserList, UserProfile]
  consumes: [DATABASE_URL, API_KEY]
}

# Class
class UserController {
  extends: BaseController
  implements: [IController]
  methods: [create, read, update, delete]
  purpose: "User management controller"
}

# Constants
constants Config {
  path: "src/config.ts"
  schema: ConfigSchema
}

# DTO
dto UserDTO {
  description: "User data transfer object"
  fields: {
    name: {
      type: "string"
      description: "User's full name"
    }
    email: {
      type: "string"
      description: "Email address"
    }
    age: {
      type: "number"
      description: "Age in years"
      optional: true
    }
  }
}

# Asset
asset Logo {
  description: "Company logo SVG"
}

# UIComponent
component App {
  isRoot: true
  description: "Root application component"
  contains: [Header, MainContent, Footer]
}

# RunParameter
parameter DATABASE_URL {
  type: "env"
  description: "PostgreSQL connection"
  required: true
}

# Dependency
dependency axios {
  purpose: "HTTP client library"
  version: "3.0.0"
}
```

## Operators and Symbols

### Primary Operators

| Operator | Usage | Description |
|----------|-------|-------------|
| `->` | `Program -> Entry` | Program entry point / File exports |
| `<-` | `File <- [imports]` | File/Class imports |
| `@` | `File @ path` | File path location |
| `::` | `Function :: signature` | Function signature |
| `~>` | `Function ~> [calls]` | Function calls |
| `<:` | `Class <: Base, Interface` | Class extends/implements |
| `!` | `Constants ! path` | Constants marker |
| `=>` | `Class => [methods]` | Class methods |
| `%` | `DTO % description` | DTO marker |
| `~` | `Asset ~ description` | Asset marker |
| `&` | `Component & description` | UIComponent marker |
| `&!` | `Component &! description` | Root UIComponent marker |
| `^` | `Package ^ description` | Dependency marker |
| `$` | `Param $type description` | RunParameter type |

### Relationship Operators

| Operator | Usage | Description |
|----------|-------|-------------|
| `>` | `Component > [children]` | UIComponent contains |
| `<` | `Component < [parents]` | UIComponent contained by |
| `>>` | `Asset >> Program` | Asset contains program |
| `~` | `Function ~ [components]` | Function affects UIComponents |
| `$<` | `Function $< [params]` | Function consumes RunParameters |
| `-` | `- field: type` | DTO field definition |
| `=` | `Param = "default"` | Default value |
| `:` | `Constants : Schema` | Schema reference |

## Grammar Rules

### Program Grammar

```ebnf
program_shortform ::= identifier "->" identifier [string_literal] version
program_longform ::= "program" identifier "{" 
                       "entry:" identifier
                       "version:" string_literal
                       ["purpose:" string_literal]
                     "}"

version ::= "v" number "." number "." number
```

### File Grammar

```ebnf
file_shortform ::= identifier "@" path ":"
                     ["<-" "[" identifier_list "]"]
                     ["->" "[" identifier_list "]"]
                     [string_literal]

file_longform ::= "file" identifier "{"
                    "path:" string_literal
                    ["imports:" "[" identifier_list "]"]
                    ["exports:" "[" identifier_list "]"]
                    ["purpose:" string_literal]
                  "}"

path ::= string_literal
identifier_list ::= identifier ["," identifier]*
```

### Function Grammar

```ebnf
function_shortform ::= identifier "::" signature
                         [string_literal]
                         ["<-" identifier]
                         ["->" identifier]
                         ["~>" "[" identifier_list "]"]
                         ["~" "[" identifier_list "]"]
                         ["$<" "[" identifier_list "]"]

function_longform ::= "function" identifier "{"
                        "signature:" string_literal
                        ["description:" string_literal]
                        ["input:" identifier]
                        ["output:" identifier]
                        ["calls:" "[" identifier_list "]"]
                        ["affects:" "[" identifier_list "]"]
                        ["consumes:" "[" identifier_list "]"]
                      "}"

signature ::= "(" [parameters] ")" "=>" return_type
```

### Class Grammar

```ebnf
class_shortform ::= identifier "<:" identifier ["," identifier]*
                      ["@" path ":"]
                      ["=>" "[" identifier_list "]"]
                      [string_literal]

class_longform ::= "class" identifier "{"
                     ["extends:" identifier]
                     ["implements:" "[" identifier_list "]"]
                     ["methods:" "[" identifier_list "]"]
                     ["purpose:" string_literal]
                   "}"
```

### DTO Grammar

```ebnf
dto_shortform ::= identifier "%" string_literal
                    field_definition*

dto_longform ::= "dto" identifier "{"
                   "description:" string_literal
                   "fields:" "{"
                     field_object*
                   "}"
                 "}"

field_definition ::= "-" field_name ["?"] ":" type [string_literal]
field_object ::= field_name ":" "{"
                   "type:" string_literal
                   ["description:" string_literal]
                   ["optional:" boolean]
                 "}"
```

### UIComponent Grammar

```ebnf
component_shortform ::= identifier ("&" | "&!") string_literal
                          ["<" "[" identifier_list "]"]
                          [">" "[" identifier_list "]"]

component_longform ::= "component" identifier "{"
                         ["isRoot:" boolean]
                         "description:" string_literal
                         ["containedBy:" "[" identifier_list "]"]
                         ["contains:" "[" identifier_list "]"]
                         ["affectedBy:" "[" identifier_list "]"]
                       "}"
```

### Asset Grammar

```ebnf
asset_shortform ::= identifier "~" string_literal
                      [">>" identifier]

asset_longform ::= "asset" identifier "{"
                     "description:" string_literal
                     ["containsProgram:" identifier]
                   "}"
```

### RunParameter Grammar

```ebnf
parameter_shortform ::= identifier "$" type string_literal ["(" "required" ")"]
                          ["=" string_literal]

parameter_longform ::= "parameter" identifier "{"
                         "type:" ("env" | "iam" | "runtime" | "config")
                         "description:" string_literal
                         ["required:" boolean]
                         ["default:" string_literal]
                       "}"
```

### Dependency Grammar

```ebnf
dependency_shortform ::= identifier "^" string_literal [version]

dependency_longform ::= "dependency" identifier "{"
                          "purpose:" string_literal
                          ["version:" string_literal]
                        "}"
```

### Constants Grammar

```ebnf
constants_shortform ::= identifier "!" path [":" identifier]

constants_longform ::= "constants" identifier "{"
                         "path:" string_literal
                         ["schema:" identifier]
                       "}"
```

## Import System

### Import Syntax

```ebnf
import_statement ::= ("@import" | "import") string_literal ["as" identifier]
```

### Examples

```yaml
# Basic import
@import "./shared/auth.tmd"

# Import with alias
@import "./shared/database.tmd" as DB

# Alternative syntax
import "./utils.tmd"

# Usage in entities
MainFile @ src/main.ts:
  <- [AuthService, DB.Connection]

# Wildcard imports
ExpressSetup @ src/server.ts:
  <- [middleware/*]    # Import all middleware entities
```

## Comments

```yaml
# Line comments
TodoApp -> AppEntry v2.0  # Inline comment

UserService @ src/user.ts: # File comment
  # Multi-line comment
  # explaining the service
  -> [createUser]
```

## Validation Rules

TypedMind enforces the following validation rules:

1. **No Orphans**: Every entity must be referenced by at least one other entity
2. **Unique Paths**: File paths must be unique across the project
3. **Import/Export Validation**: Imported entities must exist and be exported
4. **Circular Dependency Detection**: Prevents circular import chains
5. **Entry Point Validation**: Programs must reference existing entry points
6. **Type Safety**: DTOs referenced in function inputs/outputs must exist
7. **Method Validation**: Class method calls must reference existing methods
8. **UI Containment**: Non-root UI components must be contained by another component
9. **RunParameter Consumption**: Parameters must be consumed by at least one function
10. **Reference Type Validation**: Entity references must be of valid types

### Bi-directional Relationships

Some relationships are automatically maintained bi-directionally:

- UIComponent `affectedBy` ↔ Function `affects`
- RunParameter `consumedBy` ↔ Function `consumes`
- UIComponent `contains` ↔ UIComponent `containedBy`

### Special Syntax Rules

1. **Optional DTO Fields**: Use `?` after field name or set `optional: true`
2. **Method Calls**: Support `Class.method` syntax in function calls
3. **Multiple Inheritance**: Classes can extend one class and implement multiple interfaces
4. **Root Components**: Use `&!` for root UI components
5. **Scoped Packages**: Dependencies support scoped npm packages (e.g., `@types/node`)

## Examples

### Complete Web Application

```yaml
# Shortform
WebApp -> ServerMain v1.0.0
ClientApp -> ClientMain v1.0.0

ServerMain @ src/server/index.ts:
  <- [express^, UserController, AuthMiddleware]
  -> [startServer]

UserController <: BaseController
  => [createUser, getUser, updateUser, deleteUser]

createUser :: (req: Request, res: Response) => Promise<void>
  <- UserDTO
  ~> [UserModel.create, sendEmail]
  ~ [UserList]
  $< [DATABASE_URL, SMTP_HOST]

UserDTO %
  - name: string
  - email: string
  - password: string

UserList & "User list component"
  < [Dashboard]
  > [UserCard]

DATABASE_URL $env "PostgreSQL connection" (required)
express ^ "Web framework" v4.18.0
```

### Desktop Application

```yaml
# Longform
program DesktopApp {
  entry: ElectronMain
  version: "2.0.0"
  purpose: "Cross-platform desktop application"
}

file ElectronMain {
  path: "src/main/index.ts"
  imports: [electron, WindowManager]
  exports: [createWindow, handleIPC]
}

component MainWindow {
  isRoot: true
  description: "Primary application window"
  contains: [TitleBar, WorkspaceArea, StatusBar]
}
```