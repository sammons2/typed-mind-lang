# TypedMind Example Architecture

TodoApp -> AppEntry v2.0

AppEntry @ src/index.ts:
  <- [ExpressSetup, Routes, Database, Config]
  -> [startServer]

ExpressSetup @ src/server.ts:
  <- [middleware]
  -> [app]

Routes @ src/routes/index.ts:
  <- [TodoRoutes, UserRoutes]
  -> [router]

TodoRoutes @ src/routes/todos.ts:
  <- [TodoController]
  -> [todoRouter]

UserRoutes @ src/routes/users.ts:
  <- [UserController]
  -> [userRouter]

TodoController @ src/controllers/todo.ts:
  <- [BaseController]
  => [create, read, update, delete]

UserController @ src/controllers/user.ts:
  <- [BaseController]
  => [createUser, readUser, updateUser, deleteUser]

create :: (req, res) => Promise<void>
  "Creates new todo item"
  ~> [validateTodo, TodoModel.create]

read :: (req, res) => Promise<void>
  "Retrieves todo items"
  ~> [TodoModel.find]

update :: (req, res) => Promise<void>
  "Updates existing todo"
  ~> [validateTodo, TodoModel.update]

delete :: (req, res) => Promise<void>
  "Deletes a todo item"
  ~> [TodoModel.delete]

Database @ src/db/index.ts:
  -> [connection, models, TodoModel, UserModel]

TodoModel @ src/models/todo.ts:
  <- [Database]
  -> [create, find, update, delete]

UserModel @ src/models/user.ts:
  <- [Database]
  -> [create, find, update, delete]

createUser :: (req, res) => Promise<void>
  "Creates new user"
  ~> [UserModel.create]

readUser :: (req, res) => Promise<void>
  "Gets user data"  
  ~> [UserModel.find]

updateUser :: (req, res) => Promise<void>
  "Updates user"
  ~> [UserModel.update]

deleteUser :: (req, res) => Promise<void>
  "Deletes user"
  ~> [UserModel.delete]

Config ! src/config.ts : EnvSchema

BaseController @ src/controllers/base.ts:
  -> [handleError, sendResponse]

middleware @ src/middleware/index.ts:
  -> [setupMiddleware]

app @ src/app.ts:
  <- [ExpressSetup]
  -> [listen]

validateTodo @ src/validators/todo.ts:
  -> [validateCreate, validateUpdate]

startServer :: () => Promise<void>
  "Starts the Express server"
  ~> [app.listen, Database.connect]