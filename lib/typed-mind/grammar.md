# TypedMind DSL Grammar Reference

This document is auto-generated from the parser patterns.

## Note from Author
TypedMind is meant to be a DSL to represent a variety of programs and
force AI to create a cohesive program architecture with a relatively token efficient syntax.

Entities link bidirectionally, so for example it is not enough to declare a function,
the file must also be declared. The function must be exported by a file. And the function must be 
consumed by another entity to avoid dead code. The TypeMind checker will validate these scenarios.

## Table of Contents

1. [Entity Types](#entity-types)
2. [Entity Patterns](#entity-patterns)
3. [Continuation Patterns](#continuation-patterns)
4. [General Patterns](#general-patterns)
5. [Examples](#examples)

## Entity Types

TypedMind supports the following entity types:

| Entity Type | Description |
|------------|-------------|
| Program | Defines an application entry point |
| File | Defines a source code file |
| Function | Defines a function with its type signature |
| Class | Defines a class with inheritance |
| ClassFile | Combines class and file definitions in one entity - perfect for services, controllers, and modules |
| Constants | Defines a constants/configuration file |
| DTO | Defines a Data Transfer Object for data structures (config, parameters, serialization) - NO function fields allowed |
| Asset | Defines a static asset |
| UIComponent | Defines a UI component (&! for root) |
| RunParameter | Defines a runtime parameter |
| Dependency | Defines an external dependency |

## Entity Patterns

### Shortform Syntax Patterns

#### Program

**Pattern:** `Name -> EntryPoint [Purpose] [Version]`

**Example:** `TodoApp -> AppEntry "Main application" v1.0.0`

**Description:** Defines an application entry point

**Regex:** `^(\w+)\s*->\s*(\w+)(?:\s+"([^"]+)")?(?:\s+v([\d.]+))?$`

#### File

**Pattern:** `Name @ path:`

**Example:** `UserService @ src/services/user.ts:`

**Description:** Defines a source code file

**Regex:** `^(\w+)\s*@\s*([^:]+):`

#### Function

**Pattern:** `Name :: Signature`

**Example:** `createUser :: (data: UserDTO) => Promise<User>`

**Description:** Defines a function with its type signature

**Regex:** `^(\w+)\s*::\s*(.+)$`

#### Class

**Pattern:** `Name <: BaseClass[, Interface1, Interface2]`

**Example:** `UserController <: BaseController, IController`

**Description:** Defines a class with inheritance

**Regex:** `^(\w+)\s*<:\s*(.*)$`

#### Class File

**Pattern:** `Name #: path [<: BaseClass[, Interface1, Interface2]]`

**Example:** `UserController #: src/controllers/user.ts <: BaseController`

**Description:** Defines a class-file fusion entity (both class and file)

**Regex:** `^([A-Za-z][A-Za-z0-9_]*)\s*#:\s*([^\s<]+)(?:\s*<:\s*(.+))?$`

#### Constants

**Pattern:** `Name ! path [: Schema]`

**Example:** `Config ! src/config.ts : ConfigSchema`

**Description:** Defines a constants/configuration file

**Regex:** `^(\w+)\s*!\s*([^:]+)(?:\s*:\s*(\w+))?$`

#### Asset

**Pattern:** `Name ~ Description`

**Example:** `Logo ~ "Company logo SVG"`

**Description:** Defines a static asset

**Regex:** `^(\w+)\s*~\s*"([^"]+)"$`

#### Ui Component

**Pattern:** `Name & Description | Name &! Description`

**Example:** `App &! "Root application component"`

**Description:** Defines a UI component (&! for root)

**Regex:** `^(\w+)\s*(&!?)\s*"([^"]+)"$`

#### Run Parameter

**Pattern:** `Name $type Description [(required)]`

**Example:** `DATABASE_URL $env "PostgreSQL connection" (required)`

**Description:** Defines a runtime parameter

**Regex:** `^(\w+)\s*\$(\w+)\s*"([^"]+)"(?:\s*\((\w+)\))?$`

#### Dependency

**Pattern:** `Name ^ Purpose [Version]`

**Example:** `axios ^ "HTTP client library" v3.0.0`

**Description:** Defines an external dependency

**Regex:** `^([@\w\-/]+)\s*\^\s*"([^"]+)"(?:\s*v?([\d.\-\w]+))?$`

## Continuation Patterns

These patterns match continuation lines that add properties to entities:

| Pattern | Description | Example |
|---------|-------------|---------|
| Imports | Entity imports | `<- [Database, UserModel]` |
| Exports | Entity exports | `-> [createUser, getUser]` |
| Calls | Function calls | `~> [validate, save]` |
| Input | Function input DTO | `<- UserCreateDTO` |
| Output | Function output DTO | `-> UserDTO` |
| Methods | Class methods | `=> [create, read, update]` |
| Affects | Function affects UI | `~ [UserList, UserForm]` |
| Contains | UI component contains | `> [Header, Footer]` |
| Contained By | UI component parent | `< [Dashboard]` |
| Contains Program | Asset contains program | `>> ClientApp` |
| Dto Field | DTO field definition | `- name: string "User name"` |
| Comment | Comment line | `# This is a comment` |
| Description | Entity description | `"Creates a new user"` |
| Default Value | Parameter default | `= "default-value"` |
| Consumes | Function consumes params | `$< [DATABASE_URL, API_KEY]` |

## General Patterns

These patterns are used for general parsing tasks:

### Entity Declaration

**Description:** Detects any entity declaration line

**Regex:** `^[@\w\-/]+\s*(->|@|<:|#:|!|::|%|~|&|\$|\^|\s*:)`

### Longform Declaration

**Description:** Detects longform syntax declarations

**Regex:** `^(program|file|function|class|dto|component|asset|constants|parameter|import|dependency)\s+`

### Continuation

**Description:** Detects continuation lines for entity properties

**Regex:** `^\s+(->|<-|~>|=>|>>|>|<|~|"|#|-|=|\$<)`

### Import Statement

**Description:** Matches import statements (@import or import)

**Regex:** `^(?:@import|import)\s+"([^"]+)"(?:\s+as\s+(\w+))?$`

### Inline Comment

**Description:** Extracts inline comments from lines

**Regex:** `^(.+?)\s+#\s+(.+)$`

## Examples

### Complete Application Example

```tmd
# Program definition
TodoApp -> main "Main todo application" v1.0.0

# Entry file
main @ src/index.ts:
  <- [App]
  -> [startApp]
  "Application entry point"

# Start function
startApp :: () => void
  "Starts the application"
  ~ [App]
  $< [DATABASE_URL, API_KEY]

# UI Components
App &! "Root application component"
  > [TodoList, AddTodoForm]

TodoList & "Displays list of todos"
  < [App]

AddTodoForm & "Form to add new todos"
  < [App]

# Class-file fusion example
UserController #: src/controllers/user.ts <: BaseController
  <- [UserService, ValidationService]
  => [createUser, getUser, updateUser, deleteUser]

BaseController #: src/controllers/base.ts
  => [handleError, authenticate]

# Runtime parameters
DATABASE_URL $env "PostgreSQL connection string" (required)
API_KEY $env "API authentication key"
  = "default-key"

# Dependencies
react ^ "UI library" v18.0.0
typescript ^ "TypeScript compiler" v5.0.0
```

## Best Practices

### Separate Data from Behavior: DTOs vs Classes

**Key Principle**: DTOs are for data structures only, Classes are for behavior.

#### What are DTOs?
DTOs (Data Transfer Objects) represent pure data structures with no behavior:
- Configuration objects
- API request/response payloads
- Database records
- Function parameters
- Any data that needs to be serialized/deserialized

**Important**: DTOs cannot have fields of type `Function` or contain function names. The TypedMind validator will reject DTOs with function fields.

#### Classes vs DTOs
- **DTOs**: Only data fields (string, number, boolean, arrays, objects, other DTOs)
- **Classes**: Contain behavior (methods) and can use DTOs for their data

```tmd
# ✅ Good: DTOs contain only data
CreateUserDTO : "Data for creating a user"
  - name: string "User's full name"
  - email: string "User's email address"
  - password: string "Hashed password"

ConfigDTO : "Application configuration"
  - databaseUrl: string "Database connection"
  - port: number "Server port"
  - logLevel: string "Logging level"

# ✅ Good: Classes contain DTOs and behavior
UserService <: BaseService
  <- CreateUserDTO, UserResponseDTO  # Uses DTOs for data
  => [createUser, getUsers, updateUser]  # Contains behavior

# ❌ Bad: DTOs with function references
UserServiceDTO : "Service with functions"
  - createFunction: string "Name of create function"  # NO! This is behavior, not data
```

### Use ClassFile for Services and Controllers

ClassFile entities (`#:`) are a powerful fusion that combines both class and file definitions in a single entity.

#### When to use ClassFile
Use ClassFile when you have a class that is the primary export of a file:
- Service classes (UserService, AuthService)
- Controller classes (UserController, ProductController)
- Utility classes (Logger, Validator)
- Any class that "owns" its file

#### Benefits of ClassFile
1. **Eliminates redundancy**: No need to declare both a Class and a File
2. **Clear ownership**: The class and file are explicitly linked
3. **Supports all features**: Can have imports, exports, methods, and inheritance
4. **Better for refactoring**: Moving the class automatically moves the file reference

```tmd
# ✅ Good: ClassFile combines file and class
UserController #: src/controllers/user.controller.ts <: BaseController
  <- [UserService, ValidationMiddleware]  # File imports
  => [create, read, update, delete]  # Class methods
  -> [userRouter]  # File exports

# ❌ Avoid: Separate class and file for the same entity
UserController <: BaseController
  => [create, read, update, delete]

UserControllerFile @ src/controllers/user.controller.ts:
  <- [UserService, ValidationMiddleware]
  -> [UserController, userRouter]
```