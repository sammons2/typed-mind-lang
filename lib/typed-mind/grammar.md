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
5. [Quick Reference Example](#quick-reference-example)
6. [Comprehensive Examples](#comprehensive-examples)
7. [Key Features](#key-features)
8. [DTO Field Syntax](#dto-field-syntax)
9. [Method Call Syntax](#method-call-syntax)
10. [Function Auto-Distribution Details](#function-auto-distribution-details)
11. [Entity Naming Rules](#entity-naming-rules)
12. [Validation Rules](#validation-rules)
13. [Best Practices](#best-practices)

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

| Entity | Pattern | Example | Regex |
|--------|---------|---------|-------|
| **Program** | `Name -> EntryPoint [Purpose] [Version]` | `TodoApp -> AppEntry "Main application" v1.0.0` | `^(\w+)\s*->\s*(\w+)(?:\s+"([^"]+)")?(?:\s+v([\d.]+))?$` |
| **File** | `Name @ path:` | `UserService @ src/services/user.ts:` | `^(\w+)\s*@\s*([^:]+):` |
| **Function** | `Name :: Signature` | `createUser :: (data: UserDTO) => Promise<User>` | `^(\w+)\s*::\s*(.+)$` |
| **Class** | `Name <: BaseClass[, Interface1, Interface2]` | `UserController <: BaseController, IController` | `^(\w+)\s*<:\s*(.*)$` |
| **Class File** | `Name #: path [<: BaseClass[, Interface1, Interface2]]` | `UserController #: src/controllers/user.ts <: BaseController` | `^([A-Za-z][A-Za-z0-9_]*)\s*#:\s*([^\s<]+)(?:\s*<:\s*(.+))?$` |
| **Constants** | `Name ! path [: Schema]` | `Config ! src/config.ts : ConfigSchema` | `^(\w+)\s*!\s*([^:]+)(?:\s*:\s*(\w+))?$` |
| **Asset** | `Name ~ Description` | `Logo ~ "Company logo SVG"` | `^(\w+)\s*~\s*"([^"]+)"$` |
| **Ui Component** | `Name & Description | Name &! Description` | `App &! "Root application component"` | `^(\w+)\s*(&!?)\s*"([^"]+)"$` |
| **Run Parameter** | `Name $type Description [(required)]` | `DATABASE_URL $env "PostgreSQL connection" (required)` | `^(\w+)\s*\$(\w+)\s*"([^"]+)"(?:\s*\((\w+)\))?$` |
| **Dependency** | `Name ^ Purpose [Version]` | `axios ^ "HTTP client library" v3.0.0` | `^([@\w\-/]+)\s*\^\s*"([^"]+)"(?:\s*v?([\d.\-\w]+))?$` |

**Note:** Version format - The parser strips the 'v' prefix from versions. Both `v1.0.0` and `1.0.0` are stored as `1.0.0`.

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

## Quick Reference Example

```tmd
TodoApp -> main v1.0.0                      # Program
main @ src/index.ts:                        # File
  <- [UserService]
  -> [startApp]

UserService #: src/services/user.ts         # ClassFile (fusion)
  <- [UserDTO]
  => [createUser, findUser]

startApp :: () => void                      # Function
  ~> [createUser]

createUser :: (data: UserDTO) => UserDTO    # Function
  <- UserDTO                                # Input DTO
  -> UserDTO                                # Output DTO

UserDTO %                                    # DTO
  - name: string "User name"
  - email: string "Email"

# Example showing other entity types:
App &! "Root component"                     # UIComponent (root)
DATABASE_URL $env "DB connection" (required) # RunParameter
Config ! src/config.ts                      # Constants
Logo ~ "Company logo"                       # Asset
react ^ "UI library" v18.0.0                # Dependency
```

## Comprehensive Examples

### Complete Application Example
```tmd
# Program definition
TodoApp -> main "Todo application" v1.0.0

# Entry file
main @ src/index.ts:
  <- [TodoService, AuthService]
  -> [startApp]

# Start function with auto-distribution
startApp :: () => Promise<void>
  "Starts the application with all dependencies"
  <- [ConfigDTO, initializeDatabase, AuthService, TodoApp, DATABASE_URL]
  # Auto-distributed to:
  # input: ConfigDTO
  # calls: [initializeDatabase, AuthService]
  # affects: [TodoApp]
  # consumes: [DATABASE_URL]

# ClassFile fusion - combines class and file
TodoService #: src/services/todo.ts <: BaseService
  <- [TodoDTO, CreateTodoDTO, Database, Logger]
  => [createTodo, getTodos, updateTodo, deleteTodo]
  -> [todoHelper]  # Additional export

# Function with method calls
createTodo :: (data: CreateTodoDTO) => Promise<TodoDTO>
  <- CreateTodoDTO  # Input DTO
  -> TodoDTO        # Output DTO
  ~> [validateTodo, Database.insert, Logger.info]  # Method calls
  ~ [TodoList]      # Affects UI

# DTOs with comprehensive field syntax
CreateTodoDTO % "Data for creating a todo"
  - title: string "Todo title"
  - description?: string "Optional description"
  - dueDate: Date "Due date" (optional)
  - priority: number "Priority level (1-5)"
  - tags: string[] "Associated tags"
  - metadata: object "Additional metadata"

TodoDTO % "Complete todo object"
  - id: string "Unique identifier"
  - title: string "Todo title"
  - description: string "Description" (optional)
  - completed: boolean "Completion status"
  - dueDate: Date "Due date" (optional)
  - createdAt: Date "Creation timestamp"
  - updatedAt: Date "Last update timestamp"

# UI Components with containment
TodoApp &! "Root todo application"
  > [Header, TodoList, CreateForm, Footer]

TodoList & "List of todos"
  < [TodoApp]
  > [TodoItem]

# Runtime parameters
DATABASE_URL $env "PostgreSQL connection string" (required)
API_KEY $env "External API key"
  = "default-dev-key"

# External dependencies
react ^ "React framework" v18.0.0
express ^ "Web framework" v4.18.0
```

## Key Features

### ClassFile Fusion (`#:`)
Combines Class and File into one entity - perfect for services/controllers:
```tmd
UserService #: src/services/user.ts <: BaseService
  <- [Database, Logger]       # File imports
  => [create, update, delete] # Class methods
  -> [userHelper]             # Additional exports
```

### Function Auto-Distribution
The `<- [...]` syntax intelligently categorizes mixed dependencies:
```tmd
processOrder :: (order: OrderDTO) => void
  <- [OrderDTO, validateOrder, Database, OrderUI, API_KEY]
  # Auto-distributed: input (DTO), calls (Functions/Classes),
  # affects (UI), consumes (RunParams/Assets/Constants)
```

#### Distribution Rules

| Entity Type | Distributed To | Description |
|-------------|----------------|-------------|
| Function | `calls` | Function calls another function |
| Class/ClassFile | `calls` | Function calls class methods |
| UIComponent | `affects` | Function modifies UI state |
| RunParameter | `consumes` | Function uses runtime parameter |
| Asset | `consumes` | Function uses static asset |
| Constants | `consumes` | Function uses configuration |
| Dependency | `consumes` | Function uses external library |
| DTO (single) | `input` | Function takes DTO as parameter |
| DTO (multiple) | ignored | Use explicit `<- DTOName` for input |

#### Auto-Distribution Examples
```tmd
# Mixed dependencies before auto-distribution
processPayment :: (payment: PaymentDTO) => Receipt
  <- [PaymentDTO, validateCard, PaymentGateway, PaymentUI, STRIPE_KEY, stripe]

# After auto-distribution:
# input: PaymentDTO
# calls: [validateCard, PaymentGateway]
# affects: [PaymentUI]
# consumes: [STRIPE_KEY, stripe]
```

### Method Call Syntax

Functions can call other functions and class methods using the `~>` operator:

#### Basic Function Calls
```tmd
processData :: () => void
  ~> [validateInput, transform, saveResult]
```

#### Class Method Calls
```tmd
# Calling methods on Classes/ClassFiles
createUser :: (data: UserDTO) => void
  ~> [UserService.create, Logger.info]

# Recursive/self-referencing calls are allowed
fibonacci :: (n: number) => number
  ~> [fibonacci]  # Recursive call to itself
```

#### Method Call Rules
- Direct function names: `functionName`
- Class methods: `ClassName.methodName`
- ClassFile methods: `ClassFileName.methodName`
- Called methods must be defined in the entity's `=> [...]` list
- Circular function calls are detected and reported as errors
- Self-referencing (recursive) calls are allowed

## Validation Rules

### Bidirectional Consistency
TypedMind automatically maintains bidirectional relationships:
- Function affects UIComponent → UIComponent.affectedBy includes Function
- Function consumes RunParameter → RunParameter.consumedBy includes Function
- UIComponent contains child → child.containedBy includes parent
- Asset contains Program → Program must exist

### Entity Naming Rules

#### Valid Entity Names
- Must start with letter (a-z, A-Z) or underscore (_)
- Can contain letters, numbers, underscores
- Case-sensitive (UserService ≠ userService)
- Unicode letters supported (e.g., 名前)

#### Invalid Entity Names
- Cannot start with numbers: `123Name` ❌
- Cannot contain spaces: `User Service` ❌
- Cannot use kebab-case: `user-service` ❌
- Cannot be reserved keywords (varies by implementation)

#### Naming Examples
```tmd
# Valid names
UserService      # PascalCase
userService      # camelCase
user_service     # snake_case
_privateService  # underscore prefix
Service2         # numbers allowed (not first)
名前Service      # Unicode letters

# Invalid names
123Service       # starts with number
"User Service"   # contains spaces
user-service     # kebab-case
```

#### Uniqueness Rules
- Names must be unique across ALL entity types
- Exception: ClassFile can replace separate Class + File with same name
- The validator will suggest using ClassFile fusion when detecting Class/File name conflicts

### Reference Type Validation
Each reference type has specific allowed source and target entity types:

| Reference | From Entities | To Entities |
|-----------|---------------|-------------|
| imports | File, Class, ClassFile | Function, Class, Constants, DTO, etc. |
| exports | File, ClassFile | Function, Class, Constants, DTO, etc. |
| calls | Function | Function, Class (for methods) |
| extends | Class, ClassFile | Class, ClassFile |
| affects | Function | UIComponent |
| consumes | Function | RunParameter, Asset, Constants |

## Parser Intelligence

### Context-Aware Parsing
The parser uses look-ahead to determine entity types:
- `Name @ path:` followed by `=> [methods]` → Class entity
- `Name @ path:` without methods → File entity
- Inline comments (`# comment`) are extracted and stored separately
- Mixed shortform/longform syntax is supported in the same file

### Import Resolution
- Circular imports are detected and reported as errors
- Aliased imports prefix all imported entities: `@import "./auth.tmd" as Auth`
- Nested imports are resolved recursively
- Import paths can be relative or absolute

## Operator Quick Reference

```
->  Entry point (Program) or Exports (File/Function)
<-  Imports or Dependencies
@   File path location
#:  ClassFile fusion (class + file)
::  Function signature
<:  Class inheritance
!   Constants marker
%   DTO marker
~   Asset description or Function affects UI
&   UIComponent (&! for root)
$   RunParameter ($env, $iam, etc.)
^   External dependency
~>  Function calls
=>  Class methods
>>  Asset contains program
>   UIComponent contains
<   UIComponent contained by
$<  Function consumes parameters
:   Constants schema
=   Parameter default value
```

### DTOs vs Classes
**DTOs**: Pure data structures (NO functions allowed)
**Classes**: Behavior and business logic (have methods)
```tmd
UserDTO %                            # DTO: data only
  - name: string "User name"
  - email: string

UserService #: src/services/user.ts # Class: behavior
  => [createUser, findUser]         # Has methods
```

### DTO Field Syntax

DTOs support rich type definitions for fields:

#### Basic Field Syntax
```tmd
UserDTO %
  - name: string "User full name"           # Required field
  - email: string                           # No description
  - age?: number "Optional age"             # Optional field with ?
  - nickname: string "Nickname" (optional)  # Optional with annotation
```

#### Supported Field Types
- **Primitives**: `string`, `number`, `boolean`, `any`, `void`, `null`, `undefined`
- **Arrays**: `string[]`, `number[]`, `UserDTO[]`, `any[][]` (multi-dimensional)
- **Objects**: `object`, `{ key: string, value: number }` (inline objects)
- **Unions**: `string | number`, `"active" | "inactive" | "pending"`
- **Tuples**: `[string, number]`, `[boolean, string, number]`
- **DTO References**: `UserDTO`, `AddressDTO` (must be defined entities)
- **Complex Types**: `Record<string, any>`, `Map<string, number>`, `Date`

#### Complex Field Examples
```tmd
ComplexDTO % "Advanced field types"
  - id: string "Unique identifier"
  - metadata?: object "Optional metadata"
  - tags: string[] "Array of tags"
  - status: "draft" | "published" | "archived" "Union type"
  - coordinates: [number, number] "Tuple for lat/lng"
  - config: { apiUrl: string, timeout: number } "Inline object"
  - matrix: number[][] "2D array"
  - user: UserDTO "Reference to another DTO"
  - children?: ComplexDTO[] "Self-referencing array"
```

#### Field Validation Rules
- Field names must be valid identifiers (no spaces, start with letter/underscore)
- Field types cannot be `Function` or contain function types
- Optional fields can use either `?` suffix or `(optional)` annotation
- Referenced DTOs must exist in the same scope

## Advanced Patterns via Purpose Fields

The purpose field can capture advanced programming patterns that TypedMind structure alone cannot represent:

### Pattern Examples
```tmd
# Example patterns - showing syntax only (not complete programs)
# Async/Concurrent
processWorker :: (jobs: Channel<Job>) => void "ASYNC: Goroutine worker"
DataChannel % "CHANNEL: MPSC unbounded"

# Generics/Templates
Container<T> <: Base "GENERIC<T: Display>: Type-parameterized"

# Dependency Injection
UserService #: src/service.ts "@Injectable @Scope(singleton)"

# Event-Driven
Button & "Component" "EVENTS: onClick, onHover, onFocus"
DataEmitter <: EventEmitter "EMITS: data, error, close"

# Resource Management
FileReader :: (path: string) => string "RAII: auto-closes handle"
Connection % "Context manager: auto-commit on scope exit"

# Build Configuration
DebugLogger ! src/debug.ts "BUILD: #ifdef DEBUG only"

# Pattern Matching
handleOption :: (val: Option<T>) => string "MATCH: Some(x) | None"

# Middleware/Pipeline
AuthMiddleware :: (req, res, next) => void "MIDDLEWARE: JWT validation"
Pipeline @ src/pipeline.ts: "PIPELINE: cors -> auth -> router"
```

### Semantic Conventions
Establish project-specific conventions in purpose fields:
- **ASYNC/AWAIT**: Async functions and promises
- **GENERIC<T>**: Generic type parameters
- **@Decorator**: Decorators and annotations
- **EVENTS**: Event emitters and handlers
- **CHANNEL**: Concurrent communication
- **RAII/Context**: Resource management
- **BUILD**: Conditional compilation
- **PIPELINE**: Middleware chains

## Entity Capability Matrix

| Entity | Can Import | Can Export | Has Methods | Can Extend | Has Path |
|--------|------------|------------|-------------|------------|----------|
| File | ✅ | ✅ | ❌ | ❌ | ✅ |
| Class | ❌ | ❌ | ✅ | ✅ | ❌ |
| ClassFile | ✅ | ✅ | ✅ | ✅ | ✅ |
| Function | ❌ | ❌ | ❌ | ❌ | ❌ |
| DTO | ❌ | ❌ | ❌ | ❌ | ❌ |
| Constants | ❌ | ❌ | ❌ | ❌ | ✅ |
| Asset | ❌ | ❌ | ❌ | ❌ | ❌ |
| UIComponent | ❌ | ❌ | ❌ | ❌ | ❌ |
| RunParameter | ❌ | ❌ | ❌ | ❌ | ❌ |
| Dependency | ❌ | ❌ | ❌ | ❌ | ❌ |

## Valid RunParameter Types

RunParameters use `$type` syntax with these valid types:
- **$env**: Environment variable
- **$iam**: IAM role or permission
- **$runtime**: Runtime configuration
- **$config**: Configuration parameter

Example: `DATABASE_URL $env "Connection string" (required)`

## Export Rules

### What Files and ClassFiles Can Export
✅ **Can Export:**
- Functions
- Classes
- Constants
- DTOs

❌ **Cannot Export:**
- Assets (static files, not code)
- UIComponents (UI structure, not modules)
- RunParameters (runtime config, not code)
- Dependencies (external packages)

### ClassFile Auto-Export
ClassFiles automatically export themselves. Manual export creates duplication:
```tmd
UserService #: src/user.ts
  -> [helper]  # ✅ Exports helper
  # -> [UserService]  # ❌ Redundant - auto-exported
```

## Common Pitfalls

### ❌ Don't Import Class Methods Directly
```tmd
# Wrong
File @ src/app.ts:
  <- [UserService.createUser]  # Can't import methods

# Right
File @ src/app.ts:
  <- [UserService]  # Import the ClassFile
  # Now createUser method is available
```

### ❌ Don't Call ClassFiles Directly
```tmd
# Wrong
processData :: () => void
  ~> [DataProcessor]  # Can't call ClassFile

# Right
processData :: () => void
  ~> [process]  # Call the method, not the ClassFile
```

### ❌ Don't Give Classes Import/Export
```tmd
# Wrong - Classes can't import
MyClass <: Base
  <- [Logger]  # Classes don't support imports!

# Right - Use ClassFile for import capability
MyClass #: src/my-class.ts <: Base
  <- [Logger]  # ClassFiles can import
```

### ❌ Don't Confuse Entity Capabilities
```tmd
# Wrong - Mixed capabilities
DataFile @ src/data.ts:
  => [processData]  # Files can't have methods!

DataClass <: Base
  @ src/data.ts:  # Classes can't have paths!
```

## DTO Field Syntax

DTOs support comprehensive field definitions with types, descriptions, and optionality:

### Field Patterns

```tmd
UserDTO %
  - name: string "User full name"           # Required field
  - email?: string "Email address"            # Optional field (? syntax)
  - age: number "User age" (optional)        # Optional field (parentheses)
  - tags: string[] "User tags"                # Array type
  - metadata: object "Additional data"        # Generic object type
  - createdAt: Date "Account creation"        # Built-in types
  - profile: ProfileDTO "User profile"       # Reference to other DTO
```

### Supported Types
- **Primitives**: `string`, `number`, `boolean`, `Date`
- **Collections**: `string[]`, `number[]`, `Type[]`
- **Generic**: `object`, `any`
- **DTO References**: `OtherDTO` (must be defined elsewhere)
- **Complex Types**: `Promise<Type>`, `Optional<Type>`, custom types

### Field Rules
- Field names must be valid identifiers (alphanumeric + underscore)
- Types cannot be `Function` or reference function names
- Descriptions are optional but recommended for clarity
- Optional fields can use `?` suffix or `(optional)` annotation

## Method Call Syntax

Functions can call other functions, class methods, or static methods using the `~>` operator:

### Call Patterns

```tmd
# Function calls
processUser :: (data: UserDTO) => void
  ~> [validateInput, createUser, sendNotification]

# Class method calls (ClassName.methodName)
handleRequest :: (req: Request) => Response
  ~> [UserService.findById, OrderService.create]

# Mixed calls
complexProcess :: () => void
  ~> [validateAuth, Database.connect, UserService.update, logEvent]
```

### Method Call Rules
- Function names: Direct references to other Function entities
- Class methods: `ClassName.methodName` where ClassName exists and has method
- Static calls: `ModuleName.staticMethod` for utility functions
- All called entities must be defined in the program
- Circular function calls are detected and reported as warnings

## Function Auto-Distribution Details

The `<- [...]` syntax intelligently categorizes mixed dependencies based on entity types:

### Distribution Rules

| Entity Type | Distributed To | Description |
|-------------|----------------|-------------|
| Function, Class, ClassFile | `calls` (`~>`) | Function calls another function or class method |
| UIComponent | `affects` (`~`) | Function modifies UI component state |
| RunParameter, Asset, Constants, Dependency | `consumes` (`$<`) | Function uses external resources |
| DTO (single) | `input` (`<-`) | Function takes DTO as input parameter |
| DTO (multiple) | Error | Functions can only have one input DTO |

### Distribution Examples

```tmd
# Mixed dependency list
processOrder :: (order: OrderDTO) => Promise<Receipt>
  <- [OrderDTO, validateOrder, PaymentService, OrderUI, STRIPE_KEY, Database]

# Automatically distributed to:
# input: OrderDTO
# calls: [validateOrder, PaymentService, Database]
# affects: [OrderUI]
# consumes: [STRIPE_KEY]
```

### Auto-Distribution Benefits
- **Concise syntax**: Single list instead of multiple continuation lines
- **Type safety**: Parser validates entity types and relationships
- **Bidirectional links**: All relationships are automatically maintained
- **Error detection**: Invalid entity types or missing entities are caught

## Entity Naming Rules

### Naming Requirements
- **Global uniqueness**: Entity names must be unique across ALL entity types
- **Valid identifiers**: Must start with letter, can contain letters, numbers, underscores
- **Case sensitive**: `UserService` and `userservice` are different entities
- **Reserved names**: Cannot use TypedMind keywords or operators as names

### ClassFile Fusion Exception
ClassFile entities can replace separate Class + File pairs:

```tmd
# ❌ Naming conflict: separate Class and File
UserService <: BaseService
  => [createUser, findUser]

UserService @ src/services/user.ts:  # ERROR: Name conflict!
  -> [UserService]

# ✅ Solution: Use ClassFile fusion
UserService #: src/services/user.ts <: BaseService
  => [createUser, findUser]                 # Class methods
  <- [Database, Logger]                     # File imports
  # UserService is auto-exported from file
```

### Name Validation Errors
Common naming validation errors:
- **Duplicate names**: Two entities with the same name
- **Invalid characters**: Names with spaces, hyphens, or special characters
- **Reserved keywords**: Using TypedMind operators as entity names
- **Empty names**: Missing or empty entity names

## Best Practices

- **Use ClassFile (`#:`)** for services, controllers, repositories
- **Group by feature**: Keep related entities together
- **Mix dependencies freely**: Parser auto-categorizes them
- **DTOs for data, Classes for behavior**: Keep them separate
- **Leverage purpose fields**: Document async, generics, DI, events, etc.
- **Establish conventions**: Create project-specific semantic patterns
- **Bidirectional links**: Automatically maintained by the parser
- **Check capability matrix**: Ensure entities have the right capabilities
- **Name entities clearly**: Use descriptive, unique names across all types
- **Document field types**: Include descriptions for all DTO fields
- **Use method calls correctly**: Reference methods as `ClassName.methodName`