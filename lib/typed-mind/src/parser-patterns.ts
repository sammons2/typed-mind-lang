// Regex patterns for TypedMind DSL parser
// These patterns define the grammar for each entity type

export const ENTITY_PATTERNS = {
  // Program: AppName -> EntryFile v1.0.0 or AppName -> EntryFile "Main application" v1.0.0
  PROGRAM: /^(\w+)\s*->\s*(\w+)(?:\s+"([^"]+)")?(?:\s+v([\d.]+))?$/,

  // File: UserService @ src/services/user.ts:
  FILE: /^(\w+)\s*@\s*([^:]+):/,

  // Function: createUser :: (data: UserInput) => Promise<User>
  FUNCTION: /^(\w+)\s*::\s*(.+)$/,

  // Class: UserController <: BaseController, IController
  CLASS: /^(\w+)\s*<:\s*(.*)$/,

  // ClassFile: ClassName #: path/to/file.ts <: BaseClass
  CLASS_FILE: /^([A-Za-z][A-Za-z0-9_]*)\s*#:\s*([^\s<]+)(?:\s*<:\s*(.+))?$/,

  // Constants: AppConfig ! src/config.ts : ConfigSchema
  CONSTANTS: /^(\w+)\s*!\s*([^:]+)(?:\s*:\s*(\w+))?$/,

  // DTO: UserDTO % "User data transfer object"
  DTO_WITH_PURPOSE: /^(\w+)\s*%\s*"([^"]+)"$/,

  // DTO without purpose: UserDTO %
  DTO_SIMPLE: /^(\w+)\s*%$/,

  // Asset: Logo ~ "Company logo image"
  ASSET: /^(\w+)\s*~\s*"([^"]+)"$/,

  // UIComponent: LoginForm & "User login form" or RootApp &! "Root application"
  UI_COMPONENT: /^(\w+)\s*(&!?)\s*"([^"]+)"$/,

  // RunParameter: DATABASE_URL $env "PostgreSQL connection string" (required)
  RUN_PARAMETER: /^(\w+)\s*\$(\w+)\s*"([^"]+)"(?:\s*\((\w+)\))?$/,

  // Dependency: axios ^ "HTTP client library" v3.0.0
  // Supports scoped packages like @org/package
  DEPENDENCY: /^([@\w\-/]+)\s*\^\s*"([^"]+)"(?:\s*v?([\d.\-\w]+))?$/,

  // Long form entity declaration: EntityName:
  LONGFORM_ENTITY: /^(\w+)\s*:$/,

  // Long form type specification: type: EntityType
  LONGFORM_TYPE: /^\s*type:\s*(\w+)$/,
} as const;

export const CONTINUATION_PATTERNS = {
  // Imports: <- [Database, UserModel]
  IMPORTS: /^<-\s*\[([^\]]+)\]/,

  // Exports: -> [createUser, getUser]
  EXPORTS: /^->\s*\[([^\]]+)\]/,

  // Function calls: ~> [validateInput, Database.insert]
  CALLS: /^~>\s*\[([^\]]+)\]/,

  // Function Input: <- UserCreateDTO
  INPUT: /^<-\s*(\w+)$/,

  // Function Output: -> UserDTO
  OUTPUT: /^->\s*(\w+)$/,

  // Class methods: => [handleCreate, handleGet]
  METHODS: /^=>\s*\[([^\]]+)\]/,

  // Function affects UI components: ~ [ComponentA, ComponentB]
  AFFECTS: /^~\s*\[([^\]]+)\]/,

  // UIComponent contains: > [ChildComponent1, ChildComponent2]
  CONTAINS: /^>\s*\[([^\]]+)\]/,

  // UIComponent containedBy: < [ParentComponent]
  CONTAINED_BY: /^<\s*\[([^\]]+)\]/,

  // Asset contains program: >> ProgramName
  CONTAINS_PROGRAM: /^>>\s*(\w+)$/,

  // DTO Fields: - fieldName: type "description" (optional) or - fieldName?: type "description"
  DTO_FIELD: /^-\s*(\w+)(\?)?\s*:\s*([^"]+?)(?:\s*"([^"]+)")?(?:\s*\(([^)]+)\))?$/,

  // Comment: # This is a comment about the entity
  COMMENT: /^#\s*(.+)$/,

  // Description/Purpose: "Creates a new user in the database"
  DESCRIPTION: /^"([^"]+)"$/,

  // RunParameter default value: = "default-value"
  DEFAULT_VALUE: /^=\s*"([^"]+)"$/,

  // Function consumes RunParameters: $< [DATABASE_URL, API_KEY]
  CONSUMES: /^\$<\s*\[([^\]]+)\]$/,
} as const;

export const GENERAL_PATTERNS = {
  // Entity declaration check - entities can start with any letter
  ENTITY_DECLARATION: /^[@\w\-/]+\s*(->|@|<:|#:|!|::|%|~|&|\$|\^|\s*:)/,

  // Longform declaration check
  LONGFORM_DECLARATION: /^(program|file|function|class|dto|component|asset|constants|parameter|import|dependency)\s+/,

  // Continuation line check - lines starting with whitespace and specific operators
  CONTINUATION: /^\s+(->|<-|~>|=>|>>|>|<|~|"|#|-|=|\$<)/,

  // Import statement check - both @import and import
  IMPORT_STATEMENT: /^(?:@import|import)\s+"([^"]+)"(?:\s+as\s+(\w+))?$/,

  // Inline comment extraction - must not match #: operator
  INLINE_COMMENT: /^(.+?)\s+#\s+(.+)$/,
} as const;

// Entity type names for validation
export const ENTITY_TYPE_NAMES = [
  'Program',
  'File',
  'Function',
  'Class',
  'ClassFile',
  'Constants',
  'DTO',
  'Asset',
  'UIComponent',
  'RunParameter',
  'Dependency',
] as const;

export type EntityTypeName = (typeof ENTITY_TYPE_NAMES)[number];

// Extract pattern keys for type safety
export type EntityPatternKey = keyof typeof ENTITY_PATTERNS;
export type ContinuationPatternKey = keyof typeof CONTINUATION_PATTERNS;
export type GeneralPatternKey = keyof typeof GENERAL_PATTERNS;
export type PatternDescriptionKey = keyof typeof PATTERN_DESCRIPTIONS;

// Create a union of all pattern keys for comprehensive type checking
export type AllPatternKeys = EntityPatternKey | ContinuationPatternKey | GeneralPatternKey;

// Type-safe pattern retrieval helpers
export const getEntityPattern = <T extends EntityPatternKey>(key: T): (typeof ENTITY_PATTERNS)[T] => {
  return ENTITY_PATTERNS[key];
};

export const getContinuationPattern = <T extends ContinuationPatternKey>(key: T): (typeof CONTINUATION_PATTERNS)[T] => {
  return CONTINUATION_PATTERNS[key];
};

export const getGeneralPattern = <T extends GeneralPatternKey>(key: T): (typeof GENERAL_PATTERNS)[T] => {
  return GENERAL_PATTERNS[key];
};

// Type-safe pattern testing
export const testEntityPattern = <T extends EntityPatternKey>(
  key: T, 
  input: string
): input is string & { __patternMatch: T } => {
  return ENTITY_PATTERNS[key].test(input);
};

export const testContinuationPattern = <T extends ContinuationPatternKey>(
  key: T,
  input: string  
): input is string & { __patternMatch: T } => {
  return CONTINUATION_PATTERNS[key].test(input);
};

// Pattern descriptions for documentation generation
export const PATTERN_DESCRIPTIONS = {
  PROGRAM: {
    pattern: 'Name -> EntryPoint [Purpose] [Version]',
    example: 'TodoApp -> AppEntry "Main application" v1.0.0',
    description: 'Defines an application entry point',
  },
  FILE: {
    pattern: 'Name @ path:',
    example: 'UserService @ src/services/user.ts:',
    description: 'Defines a source code file',
  },
  FUNCTION: {
    pattern: 'Name :: Signature',
    example: 'createUser :: (data: UserDTO) => Promise<User>',
    description: 'Defines a function with its type signature',
  },
  CLASS: {
    pattern: 'Name <: BaseClass[, Interface1, Interface2]',
    example: 'UserController <: BaseController, IController',
    description: 'Defines a class with inheritance',
  },
  CLASS_FILE: {
    pattern: 'Name #: path [<: BaseClass[, Interface1, Interface2]]',
    example: 'UserController #: src/controllers/user.ts <: BaseController',
    description: 'Defines a class-file fusion entity (both class and file)',
  },
  CONSTANTS: {
    pattern: 'Name ! path [: Schema]',
    example: 'Config ! src/config.ts : ConfigSchema',
    description: 'Defines a constants/configuration file',
  },
  DTO: {
    pattern: 'Name % [Purpose]',
    example: 'UserDTO % "User data transfer object"',
    description: 'Defines a Data Transfer Object',
  },
  ASSET: {
    pattern: 'Name ~ Description',
    example: 'Logo ~ "Company logo SVG"',
    description: 'Defines a static asset',
  },
  UI_COMPONENT: {
    pattern: 'Name & Description | Name &! Description',
    example: 'App &! "Root application component"',
    description: 'Defines a UI component (&! for root)',
  },
  RUN_PARAMETER: {
    pattern: 'Name $type Description [(required)]',
    example: 'DATABASE_URL $env "PostgreSQL connection" (required)',
    description: 'Defines a runtime parameter',
  },
  DEPENDENCY: {
    pattern: 'Name ^ Purpose [Version]',
    example: 'axios ^ "HTTP client library" v3.0.0',
    description: 'Defines an external dependency',
  },
} as const;
