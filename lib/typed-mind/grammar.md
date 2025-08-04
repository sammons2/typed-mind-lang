# TypedMind DSL Complete Guide for LLMs

## Installation and Usage

### Install the TypedMind CLI
```bash
npm install -g @sammons/typed-mind-cli
```

### Validate TypedMind Files
```bash
# Check a file for validation errors
tmd -c example.tmd
tmd --check example.tmd

# Render interactive visualization
tmd --render example.tmd

# Generate static HTML output
tmd --render example.tmd --output output.html
```

## Core Concepts

**CRITICAL**: TypedMind enforces bidirectional linking. Every entity must be:
1. Properly declared with correct syntax
2. Referenced by at least one other entity (to avoid orphaned entities)
3. Only exported by ONE file (to avoid duplicate exports)

### Entity Types Overview

| Entity | Symbol | Purpose | Must be referenced by |
|--------|--------|---------|----------------------|
| Program | `->` | Application entry point | (Root entity) |
| File | `@` | Source code file | Program or other Files |
| Function | `::` | Function with signature | Files (as export) |
| Class | `<:` | Class with inheritance | Files (as export) |
| ClassFile | `#:` | Combined class & file | Other Files or Functions |
| Constants | `!` | Configuration constants | Files or Functions |
| DTO | `:` | Data Transfer Object | Functions or Classes |
| Asset | `~` | Static assets | Files or Components |
| UIComponent | `&` | UI components (`&!` for root) | Files or other Components |
| RunParameter | `$` | Runtime parameters | Functions |
| Dependency | `^` | External npm packages | Files |

## Complete Syntax Reference

### 1. Program Declaration
**Syntax**: `ProgramName -> EntryFile [Purpose] [Version]`

```tmd
# ✅ Valid Examples
TodoApp -> AppEntry "Todo application" v1.0.0
MyAPI -> main "REST API service" v2.3.1
WebServer -> index

# ❌ Invalid - Missing entry point
TodoApp "My application"  # ERROR: No -> operator
```

### 2. File Declaration
**Syntax**: `FileName @ path/to/file.ext:`

```tmd
# ✅ Valid Examples
AppEntry @ src/index.ts:
  <- [express, dotenv]           # Imports
  -> [startServer]               # Exports
  "Main application entry point" # Description

UserController @ src/controllers/user.controller.ts:
  <- [UserService, BaseController]
  -> [UserController]

# ❌ Invalid - Missing colon
AppEntry @ src/index.ts  # ERROR: Must end with :
```

### 3. Function Declaration
**Syntax**: `functionName :: (params) => ReturnType`

```tmd
# ✅ Valid Examples
createUser :: (data: UserDTO) => Promise<User>
  "Creates a new user"
  ~> [validateUser, saveToDatabase]  # Calls these functions
  <- UserCreateDTO                   # Input DTO
  -> UserResponseDTO                 # Output DTO
  $< [DATABASE_URL]                  # Consumes parameters

getUserById :: (id: string) => Promise<User | null>
  ~> [findInDatabase]

# ❌ Invalid - Missing signature
createUser  # ERROR: No :: operator
```

### 4. Class Declaration
**Syntax**: `ClassName <: BaseClass[, Interface1, Interface2]`

```tmd
# ✅ Valid Examples
UserController <: BaseController, IUserController
  => [create, read, update, delete]  # Methods
  "Handles user-related requests"

TodoService <: BaseService
  => [createTodo, getTodos, updateTodo, deleteTodo]

# ❌ Invalid - Using wrong operator
UserController -> BaseController  # ERROR: Use <: for inheritance
```

### 5. ClassFile Declaration (New!)
**Syntax**: `ClassName #: path/to/file.ext [<: BaseClass]`

The `#:` operator creates a fusion entity that is both a class AND a file. This solves naming conflicts and reduces redundancy.

**IMPORTANT**: ClassFile entities are importable just like regular files. They automatically export themselves.

```tmd
# ✅ Valid Examples
UserController #: src/controllers/user.controller.ts <: BaseController
  <- [UserService, Logger]         # File imports
  => [create, read, update, delete] # Class methods
  # Note: ClassFile automatically exports itself, no need for -> [UserController]

TodoService #: src/services/todo.service.ts
  <- [TodoModel, ValidationService]
  => [createTodo, getTodos]

# ❌ Invalid - Duplicate naming without fusion
UserController <: BaseController     # Class declaration
UserController @ src/user.ctrl.ts:   # ERROR: Name conflict!

# ✅ Valid - Importing a ClassFile
AppEntry @ src/index.ts:
  <- [UserController]  # Can import ClassFile entities
  -> [startApp]
```

### 6. Constants Declaration
**Syntax**: `ConstantName ! path/to/config.ext [: SchemaType]`

```tmd
# ✅ Valid Examples
Config ! src/config.ts : ConfigSchema
  "Application configuration"

DatabaseConfig ! src/db/config.ts
  -> [connectionString, poolSize]

# ❌ Invalid - Using @ instead of !
Config @ src/config.ts  # ERROR: Use ! for constants
```

### 7. DTO Declaration
**Syntax**: `DTOName : "Description"`

```tmd
# ✅ Valid Examples
UserCreateDTO : "Data for creating a user"
  - name: string "User's full name"
  - email: string "User's email address"
  - password: string "Hashed password"

UserResponseDTO : "User data returned to client"
  - id: string "User ID"
  - name: string
  - email: string
  - createdAt: Date

# ❌ Invalid - Missing description
UserDTO  # ERROR: DTOs need : "description"
```

### 8. UI Component Declaration
**Syntax**: `ComponentName & "Description"` or `RootComponent &! "Description"`

```tmd
# ✅ Valid Examples
App &! "Root application component"      # Root component
  > [Header, MainContent, Footer]        # Contains

TodoList & "Displays todo items"
  < [MainContent]                        # Contained by
  ~> [getTodos, deleteTodo]              # Calls functions

# ❌ Invalid - Multiple root components
App &! "Root app"
Dashboard &! "Another root"  # ERROR: Only one &! allowed
```

### 9. Runtime Parameter Declaration
**Syntax**: `PARAM_NAME $type "Description" [(required)]`

```tmd
# ✅ Valid Examples
DATABASE_URL $env "PostgreSQL connection string" (required)
API_KEY $env "External API key"
  = "default-key-12345"  # Default value

PORT $env "Server port"
  = "3000"

# ❌ Invalid - Wrong format
database_url $env  # ERROR: Needs description in quotes
```

### 10. Dependency Declaration
**Syntax**: `package-name ^ "Purpose" [version]`

```tmd
# ✅ Valid Examples
express ^ "Web framework" v4.18.0
@types/node ^ "Node.js types" v20.0.0
react ^ "UI library"

# ❌ Invalid - Missing purpose
express ^ v4.18.0  # ERROR: Needs purpose in quotes
```

## Continuation Patterns

### Import/Export Operators

| Operator | Usage | Example |
|----------|-------|---------|
| `<-` | Imports from | `<- [Module1, Module2]` |
| `->` | Exports to | `-> [export1, export2]` |
| `~>` | Calls/uses | `~> [function1, function2]` |
| `=>` | Contains methods | `=> [method1, method2]` |
| `$<` | Consumes parameters | `$< [PARAM1, PARAM2]` |

### UI Component Operators

| Operator | Usage | Example |
|----------|-------|---------|
| `>` | Contains components | `> [Child1, Child2]` |
| `<` | Contained by | `< [ParentComponent]` |
| `~` | Affects UI | `~ [Component1, Component2]` |

## Common Validation Errors and Solutions

### 1. Orphaned Entity Error
```tmd
# ❌ Invalid - Function never exported
saveUser :: (user: User) => Promise<void>
  "Saves user to database"

# ✅ Valid - Function exported by a file
UserService @ src/services/user.service.ts:
  -> [saveUser]

saveUser :: (user: User) => Promise<void>
  "Saves user to database"
```

### 2. Duplicate Export Error
```tmd
# ❌ Invalid - createUser exported by multiple files
FileA @ src/a.ts:
  -> [createUser]

FileB @ src/b.ts:
  -> [createUser]  # ERROR: Already exported by FileA

# ✅ Valid - Each entity exported once
UserService @ src/services/user.service.ts:
  -> [createUser]

UserController @ src/controllers/user.controller.ts:
  <- [createUser]  # Imports it instead
```

### 3. Undefined Reference Error
```tmd
# ❌ Invalid - References non-existent entity
AppEntry @ src/index.ts:
  <- [NonExistentModule]  # ERROR: Not defined

# ✅ Valid - All references exist
UserModule @ src/modules/user.module.ts:
  -> [userRouter]

AppEntry @ src/index.ts:
  <- [UserModule]
```

### 4. Missing Entry File Error
```tmd
# ❌ Invalid - Program points to non-existent file
MyApp -> MainEntry  # ERROR: MainEntry not defined

# ✅ Valid - Entry file exists
MyApp -> AppEntry

AppEntry @ src/index.ts:
  -> [startApp]
```

### 5. Circular Dependency Error
```tmd
# ❌ Invalid - Circular imports
FileA @ src/a.ts:
  <- [FileB]

FileB @ src/b.ts:
  <- [FileA]  # ERROR: Circular dependency

# ✅ Valid - Use dependency injection or interfaces
IUserService : "User service interface"

UserService @ src/services/user.service.ts:
  -> [IUserService]

UserController @ src/controllers/user.controller.ts:
  <- [IUserService]  # Depends on interface, not implementation
```

### 6. Naming Conflict Error
```tmd
# ❌ Invalid - Same name for different entity types
UserService <: BaseService

UserService @ src/user.service.ts:  # ERROR: Name conflict

# ✅ Valid - Use ClassFile fusion
UserService #: src/services/user.service.ts <: BaseService
  <- [UserModel, Logger]
  => [createUser, getUser]
```

## Best Practices

### 1. Structure Your Program Hierarchically
```tmd
# Start with the program
TodoApp -> main v1.0.0

# Define the entry file
main @ src/index.ts:
  <- [App, DatabaseConfig]
  -> [startApp]

# Define your components
App &! "Root React component"
  > [TodoList, AddTodoForm]

# Define your services
TodoService #: src/services/todo.service.ts
  <- [TodoModel]
  => [createTodo, getTodos, updateTodo, deleteTodo]
```

### 2. Use ClassFile for Controllers and Services
```tmd
# Good practice - Reduces redundancy
UserController #: src/controllers/user.controller.ts <: BaseController
  <- [UserService, ValidationMiddleware]
  => [create, read, update, delete]
  -> [userRouter]

# Instead of separate declarations
UserController <: BaseController
UserControllerFile @ src/controllers/user.controller.ts:
```

### 3. Define Clear DTO Contracts
```tmd
# Input DTOs
CreateTodoDTO : "Data for creating a todo"
  - title: string "Todo title (required)"
  - description: string "Optional description"
  - dueDate?: Date "Optional due date"

# Output DTOs  
TodoResponseDTO : "Todo data sent to client"
  - id: string "Unique identifier"
  - title: string
  - completed: boolean
  - createdAt: Date
```

### 4. Document Runtime Requirements
```tmd
# Required parameters
DATABASE_URL $env "PostgreSQL connection" (required)
JWT_SECRET $env "Secret for JWT signing" (required)

# Optional with defaults
PORT $env "Server port"
  = "3000"
LOG_LEVEL $env "Logging verbosity"
  = "info"
```

## Complete Examples

### Example 1: Simple Todo Application
```tmd
# Program definition
TodoApp -> AppEntry "Todo list application" v1.0.0

# Entry point
AppEntry @ src/index.ts:
  <- [express, TodoController]
  -> [startServer]
  "Application entry point"

# Functions
startServer :: () => Promise<void>
  "Starts the Express server"
  $< [PORT, DATABASE_URL]

# Controller using ClassFile fusion
TodoController #: src/controllers/todo.controller.ts
  <- [TodoService]
  => [createTodo, getTodos, updateTodo, deleteTodo]
  "Handles todo-related HTTP requests"

# Service layer
TodoService #: src/services/todo.service.ts
  => [create, findAll, update, delete]
  "Business logic for todos"

# DTOs
CreateTodoDTO : "Input for creating todo"
  - title: string "Todo title"
  - description?: string "Optional description"

TodoDTO : "Todo response format"
  - id: string "Unique ID"
  - title: string "Todo title"
  - completed: boolean "Completion status"

# Runtime parameters
DATABASE_URL $env "PostgreSQL connection" (required)
PORT $env "Server port"
  = "3000"

# Dependencies
express ^ "Web framework" v4.18.0
```

### Example 2: React Web App with API
```tmd
# Program
FullStackApp -> ServerEntry "Full-stack web application" v2.0.0

# Backend entry
ServerEntry @ backend/src/index.ts:
  <- [APIServer, Config]
  -> [startServer]

# API Server setup
APIServer @ backend/src/server.ts:
  <- [express, cors, userRouter, authRouter]
  -> [app, setupMiddleware]

# Frontend entry
ClientEntry @ frontend/src/index.tsx:
  <- [React, ReactDOM, App]
  -> [renderApp]

# React root component
App &! "Root React component"
  > [Navigation, RouterOutlet]
  "Main application shell"

# Page components
Dashboard & "Dashboard page"
  < [RouterOutlet]
  > [UserList, Statistics]
  ~> [fetchUsers, fetchStats]

UserList & "User list component"
  < [Dashboard]
  ~> [getUsers, deleteUser]

# Controllers with ClassFile
UserController #: backend/src/controllers/user.controller.ts <: BaseController
  <- [UserService, authenticate, validate]
  => [register, login, getProfile, updateProfile]
  -> [userRouter]

AuthController #: backend/src/controllers/auth.controller.ts <: BaseController
  <- [AuthService, TokenService]
  => [login, logout, refresh]
  -> [authRouter]

# Services
UserService #: backend/src/services/user.service.ts
  <- [UserRepository, PasswordHasher]
  => [createUser, findByEmail, updateUser]

TokenService #: backend/src/services/token.service.ts
  <- [jsonwebtoken]
  => [generateToken, verifyToken, refreshToken]

# API Functions
getUsers :: (req: Request, res: Response) => Promise<void>
  "Fetches all users"
  <- UserQueryDTO
  -> UserListDTO
  ~> [UserService.findAll]

createUser :: (data: CreateUserDTO) => Promise<User>
  "Creates new user"
  <- CreateUserDTO
  -> UserDTO
  ~> [validateEmail, hashPassword, UserRepository.save]

# Frontend API calls
fetchUsers :: () => Promise<User[]>
  "Fetches users from API"
  ~> [apiClient.get]
  ~ [UserList]

# DTOs
CreateUserDTO : "User registration data"
  - email: string "Valid email address"
  - password: string "Min 8 characters"
  - name: string "Full name"

UserDTO : "Public user data"
  - id: string "UUID"
  - email: string
  - name: string
  - role: string
  - createdAt: Date

# Parameters
DATABASE_URL $env "PostgreSQL URL" (required)
JWT_SECRET $env "JWT secret key" (required)
REDIS_URL $env "Redis connection"
  = "redis://localhost:6379"
API_URL $env "Backend API URL"
  = "http://localhost:3000"

# Dependencies
express ^ "Web server" v4.18.0
react ^ "UI library" v18.2.0
typescript ^ "Type safety" v5.0.0
@types/node ^ "Node types" v20.0.0
```

## Troubleshooting

### "Cannot find module" errors
Ensure all imported entities are defined and exported properly:
```bash
tmd --check myfile.tmd
```

### "Orphaned entity" warnings
Every entity (except Program) must be referenced by another entity. Check that:
- Functions are exported by files
- Classes are exported by files or used in ClassFile
- Components are contained by parent components

### "Circular dependency" errors
Break cycles by:
- Using interfaces/DTOs instead of direct imports
- Restructuring to use dependency injection
- Moving shared code to separate modules

### Validation still failing?
1. Check for typos in entity names
2. Ensure all paths use forward slashes (/)
3. Verify continuation lines are properly indented
4. Make sure string values are in quotes
5. Confirm operators are correct (-> not => for exports)
6. For inline comments, use spaces around # (e.g., `Entity @ file.ts # comment`, not `Entity#:file.ts`)

## Summary for LLMs

When writing TypedMind:
1. **Install CLI**: `npm install -g @sammons/typed-mind-cli`
2. **Validate**: `tmd -c yourfile.tmd`
3. **Every entity must be declared AND referenced**
4. **Use ClassFile (#:) for controller/service files**
5. **Files export entities, not other files**
6. **Only one root UI component (&!)**
7. **All strings need quotes**
8. **Paths use forward slashes**
9. **Check validation errors carefully**

This guide provides everything needed to write valid TypedMind DSL code. Follow the examples and avoid the shown error patterns for successful validation.