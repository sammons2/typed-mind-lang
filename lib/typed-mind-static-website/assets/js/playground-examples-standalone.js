// Playground Examples (Standalone)
window.PLAYGROUND_EXAMPLES = {
  'todo-app': {
    longform: `# Longform syntax is for humans
program TodoApp {
  entryPoint: models
  version: "1.0.0"
}

# Data Models
file models {
  path: "models.ts"
  exports: [Todo, CreateTodoInput]
}

dto Todo {
  description: "Todo entity"
  fields: [
    { name: "id", type: "string", description: "Unique identifier" },
    { name: "title", type: "string", description: "Todo title" },
    { name: "completed", type: "boolean", description: "Completion status" },
    { name: "createdAt", type: "Date", description: "Creation timestamp" }
  ]
}

dto CreateTodoInput {
  description: "Input for creating todos"
  fields: [
    { name: "title", type: "string", description: "Todo title" },
    { name: "completed", type: "boolean", description: "Initial completion status" }
  ]
}

# Service Layer
file todoService {
  path: "services/todo.service.ts"
  imports: [Todo, CreateTodoInput]
  exports: [TodoService]
}

class TodoService {
  extends: BaseService
  methods: [create, findAll, findById, update, delete]
}

function create {
  signature: (input: CreateTodoInput) => Todo
  description: "Creates a new todo"
  input: CreateTodoInput
  output: Todo
  affects: [TodoList]
}

function findAll {
  signature: () => Todo[]
  description: "Retrieves all todos"
  output: Todo
}

function findById {
  signature: (id: string) => Todo
  description: "Finds todo by ID"
  output: Todo
}

function update {
  signature: (id: string, input: CreateTodoInput) => Todo
  description: "Updates existing todo"
  input: CreateTodoInput
  output: Todo
  affects: [TodoItem]
}

function delete {
  signature: (id: string) => void
  description: "Deletes a todo"
  affects: [TodoList]
}

# UI Components
component TodoApp {
  description: "Root todo application"
  root: true
  contains: [TodoList, TodoForm]
}

component TodoList {
  description: "List of todos"
  containedBy: [TodoApp]
  contains: [TodoItem]
}

component TodoItem {
  description: "Individual todo display"
  containedBy: [TodoList]
}

component TodoForm {
  description: "Form for creating todos"
  containedBy: [TodoApp]
}`,
    
    shortform: `# Shortform syntax is for LLMs
TodoApp -> models v1.0.0

# Data Models
models @ models.ts:
  -> [Todo, CreateTodoInput]

Todo % "Todo entity"
  - id: string "Unique identifier"
  - title: string "Todo title"
  - completed: boolean "Completion status"
  - createdAt: Date "Creation timestamp"

CreateTodoInput % "Input for creating todos"
  - title: string "Todo title"
  - completed: boolean "Initial completion status"

# Service Layer
todoService @ services/todo.service.ts:
  <- [Todo, CreateTodoInput]
  -> [TodoService]

TodoService <: BaseService
  => [create, findAll, findById, update, delete]

create :: (input: CreateTodoInput) => Todo
  "Creates a new todo"
  <- CreateTodoInput
  -> Todo
  ~ [TodoList]

findAll :: () => Todo[]
  "Retrieves all todos"
  -> Todo

findById :: (id: string) => Todo
  "Finds todo by ID"
  -> Todo

update :: (id: string, input: CreateTodoInput) => Todo
  "Updates existing todo"
  <- CreateTodoInput
  -> Todo
  ~ [TodoItem]

delete :: (id: string) => void
  "Deletes a todo"
  ~ [TodoList]

# UI Components
TodoApp &! "Root todo application"
  > [TodoList, TodoForm]

TodoList & "List of todos"
  < [TodoApp]
  > [TodoItem]

TodoItem & "Individual todo display"
  < [TodoList]

TodoForm & "Form for creating todos"
  < [TodoApp]`
  },
  
  'microservices': {
    longform: `# Longform syntax is for humans
program ECommerce {
  entryPoint: services
  version: "1.0.0"
}

# User Service
file userService {
  path: "services/user-service.ts"
  imports: [User, CreateUserDto]
  exports: [UserService]
}

class UserService {
  extends: BaseService
  methods: [createUser, getUser, getUserOrders]
}

function createUser {
  signature: (data: CreateUserDto) => User
  description: "Creates a new user account"
  input: CreateUserDto
  output: User
  calls: [validateUser, saveToDatabase]
}

function getUser {
  signature: (id: string) => User
  description: "Retrieves user by ID"
  output: User
}

function getUserOrders {
  signature: (userId: string) => Order[]
  description: "Gets all orders for a user"
  output: Order
  calls: [OrderService.getOrdersByUser]
}

# Order Service  
file orderService {
  path: "services/order-service.ts"
  imports: [Order, CreateOrderDto, User]
  exports: [OrderService]
}

class OrderService {
  extends: BaseService
  methods: [createOrder, getOrdersByUser]
}

function createOrder {
  signature: (data: CreateOrderDto) => Order
  description: "Creates a new order"
  input: CreateOrderDto
  output: Order
  calls: [validateOrder, processPayment]
  consumes: [PAYMENT_API_KEY]
}

function getOrdersByUser {
  signature: (userId: string) => Order[]
  description: "Retrieves orders for a user"
  output: Order
}

# Configuration
constants PAYMENT_API_KEY {
  path: "config/secrets.json"
  schema: string
}

# DTOs
dto User {
  description: "User entity"
  fields: [
    { name: "id", type: "string", description: "User ID" },
    { name: "email", type: "string", description: "Email address" },
    { name: "name", type: "string", description: "Full name" }
  ]
}

dto Order {
  description: "Order entity"
  fields: [
    { name: "id", type: "string", description: "Order ID" },
    { name: "userId", type: "string", description: "User ID" },
    { name: "total", type: "number", description: "Order total" },
    { name: "status", type: "OrderStatus", description: "Order status" }
  ]
}`,
    
    shortform: `# Shortform syntax is for LLMs
ECommerce -> services v1.0.0

# User Service
userService @ services/user-service.ts:
  <- [User, CreateUserDto]
  -> [UserService]

UserService <: BaseService
  => [createUser, getUser, getUserOrders]

createUser :: (data: CreateUserDto) => User
  "Creates a new user account"
  <- CreateUserDto
  -> User
  ~> [validateUser, saveToDatabase]

getUser :: (id: string) => User
  "Retrieves user by ID"
  -> User

getUserOrders :: (userId: string) => Order[]
  "Gets all orders for a user"
  -> Order
  ~> [OrderService.getOrdersByUser]

# Order Service  
orderService @ services/order-service.ts:
  <- [Order, CreateOrderDto, User]
  -> [OrderService]

OrderService <: BaseService
  => [createOrder, getOrdersByUser]

createOrder :: (data: CreateOrderDto) => Order
  "Creates a new order"
  <- CreateOrderDto
  -> Order
  ~> [validateOrder, processPayment]
  $< [PAYMENT_API_KEY]

getOrdersByUser :: (userId: string) => Order[]
  "Retrieves orders for a user"
  -> Order

# Configuration
PAYMENT_API_KEY ! config/secrets.json : string

# DTOs
User % "User entity"
  - id: string "User ID"
  - email: string "Email address"
  - name: string "Full name"

Order % "Order entity"
  - id: string "Order ID"
  - userId: string "User ID"
  - total: number "Order total"
  - status: OrderStatus "Order status"`
  },
  
  'react-app': {
    longform: `# Longform syntax is for humans
program ReactApp {
  entryPoint: ui
  version: "1.0.0"
}

# UI Component Hierarchy
component App {
  description: "Root React application"
  root: true
  contains: [Header, Dashboard, Footer]
}

component Header {
  description: "Application header"
  containedBy: [App]
  contains: [Logo, Navigation, ThemeToggle]
}

component Dashboard {
  description: "Main dashboard view"
  containedBy: [App]
  contains: [Sidebar, MainContent]
}

component Sidebar {
  description: "Navigation sidebar"
  containedBy: [Dashboard]
  contains: [MenuItem]
}

component MainContent {
  description: "Main content area"
  containedBy: [Dashboard]
  contains: [ContentPanel]
}

component Footer {
  description: "Application footer"
  containedBy: [App]
}

# State Management
dto AppState {
  description: "Global application state"
  fields: [
    { name: "user", type: "User", description: "Current user", optional: true },
    { name: "theme", type: "Theme", description: "UI theme" },
    { name: "sidebarOpen", type: "boolean", description: "Sidebar visibility" }
  ]
}

dto Theme {
  description: "Theme configuration"
  fields: [
    { name: "mode", type: "string", description: "light or dark" },
    { name: "primaryColor", type: "string", description: "Primary theme color" },
    { name: "accentColor", type: "string", description: "Accent color" }
  ]
}

# Services
file themeService {
  path: "services/theme.service.ts"
  imports: [Theme, AppState]
  exports: [toggleTheme, setTheme]
}

function toggleTheme {
  signature: (currentTheme: Theme) => Theme
  description: "Toggles between light and dark mode"
  input: Theme
  output: Theme
  affects: [Header, ThemeToggle]
}

function setTheme {
  signature: (theme: Theme) => void
  description: "Sets the application theme"
  input: Theme
  affects: [App]
}`,
    
    shortform: `# Shortform syntax is for LLMs
ReactApp -> ui v1.0.0

# UI Component Hierarchy
App &! "Root React application"
  > [Header, Dashboard, Footer]

Header & "Application header"
  < [App]
  > [Logo, Navigation, ThemeToggle]

Dashboard & "Main dashboard view"
  < [App]
  > [Sidebar, MainContent]

Sidebar & "Navigation sidebar"
  < [Dashboard]
  > [MenuItem]

MainContent & "Main content area"
  < [Dashboard]
  > [ContentPanel]

Footer & "Application footer"
  < [App]

# State Management
AppState % "Global application state"
  - user: User "Current user" (optional)
  - theme: Theme "UI theme"
  - sidebarOpen: boolean "Sidebar visibility"

Theme % "Theme configuration"
  - mode: string "light or dark"
  - primaryColor: string "Primary theme color"
  - accentColor: string "Accent color"

# Services
themeService @ services/theme.service.ts:
  <- [Theme, AppState]
  -> [toggleTheme, setTheme]

toggleTheme :: (currentTheme: Theme) => Theme
  "Toggles between light and dark mode"
  <- Theme
  -> Theme
  ~ [Header, ThemeToggle]

setTheme :: (theme: Theme) => void
  "Sets the application theme"
  <- Theme
  ~ [App]`
  },
  
  'api-gateway': {
    longform: `# Longform syntax is for humans
program APIGateway {
  entryPoint: gateway
  version: "1.0.0"
}

# Authentication Middleware
file authMiddleware {
  path: "gateway/auth.middleware.ts"
  imports: [User, TokenPayload]
  exports: [authenticate, authorize]
}

function authenticate {
  signature: (token: string) => User
  description: "Validates JWT token and returns user"
  output: User
  calls: [verifyToken, fetchUser]
  consumes: [JWT_SECRET]
}

function authorize {
  signature: (user: User, resource: string) => boolean
  description: "Checks user permissions for resource"
  input: User
  calls: [checkPermissions]
}

# API Router
file apiRouter {
  path: "gateway/router.ts"
  imports: [Request, Response, Route]
  exports: [APIRouter]
}

class APIRouter {
  extends: BaseRouter
  methods: [route, registerRoute, handleError]
}

function route {
  signature: (request: Request) => Response
  description: "Routes incoming requests"
  input: Request
  output: Response
  calls: [authenticate, findRoute, executeHandler]
}

function registerRoute {
  signature: (path: string, handler: RouteHandler) => void
  description: "Registers a new route"
  input: RouteHandler
}

function handleError {
  signature: (error: Error) => Response
  description: "Handles routing errors"
  input: Error
  output: Response
}

# Route Configuration
constants ROUTE_PREFIX {
  path: "gateway/config.ts"
  schema: string
}

constants MAX_REQUEST_SIZE {
  path: "gateway/config.ts"
  schema: number
}

# Security Configuration
runParameter JWT_SECRET {
  schema: string
  description: "Secret key for JWT signing"
}

runParameter RATE_LIMIT {
  schema: number
  description: "Requests per minute limit"
  optional: true
}`,
    
    shortform: `# Shortform syntax is for LLMs
APIGateway -> gateway v1.0.0

# Authentication Middleware
authMiddleware @ gateway/auth.middleware.ts:
  <- [User, TokenPayload]
  -> [authenticate, authorize]

authenticate :: (token: string) => User
  "Validates JWT token and returns user"
  -> User
  ~> [verifyToken, fetchUser]
  $< [JWT_SECRET]

authorize :: (user: User, resource: string) => boolean
  "Checks user permissions for resource"
  <- User
  ~> [checkPermissions]

# API Router
apiRouter @ gateway/router.ts:
  <- [Request, Response, Route]
  -> [APIRouter]

APIRouter <: BaseRouter
  => [route, registerRoute, handleError]

route :: (request: Request) => Response
  "Routes incoming requests"
  <- Request
  -> Response
  ~> [authenticate, findRoute, executeHandler]

registerRoute :: (path: string, handler: RouteHandler) => void
  "Registers a new route"
  <- RouteHandler

handleError :: (error: Error) => Response
  "Handles routing errors"
  <- Error
  -> Response

# Route Configuration
ROUTE_PREFIX ! gateway/config.ts : string
MAX_REQUEST_SIZE ! gateway/config.ts : number

# Security Configuration
JWT_SECRET $ string
  "Secret key for JWT signing"

RATE_LIMIT $ number
  "Requests per minute limit"
  (optional)`
  }
};