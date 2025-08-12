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

## Validation Rules

### Bidirectional Consistency
TypedMind enforces bidirectional relationships:
- Function affects UIComponent → UIComponent.affectedBy includes Function
- Function consumes RunParameter → RunParameter.consumedBy includes Function
- UIComponent contains child → child.containedBy includes parent
- Asset contains Program → Program must exist

### Entity Naming Rules
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
- Circular imports are detected and prevented
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

## Best Practices

- **Use ClassFile (`#:`)** for services, controllers, repositories
- **Group by feature**: Keep related entities together
- **Mix dependencies freely**: Parser auto-categorizes them
- **DTOs for data, Classes for behavior**: Keep them separate
- **Leverage purpose fields**: Document async, generics, DI, events, etc.
- **Establish conventions**: Create project-specific semantic patterns
- **Bidirectional links**: Validator ensures consistency