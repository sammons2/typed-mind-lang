export type EntityType =
  | 'Program'
  | 'File'
  | 'Function'
  | 'Class'
  | 'ClassFile'
  | 'Constants'
  | 'DTO'
  | 'Asset'
  | 'UIComponent'
  | 'RunParameter'
  | 'Dependency';

export interface Position {
  line: number;
  column: number;
}

export type ReferenceType =
  | 'imports' // File imports entity
  | 'exports' // File exports entity
  | 'calls' // Function calls Function/Method
  | 'extends' // Class extends Class
  | 'implements' // Class implements Class (interface)
  | 'contains' // UIComponent contains UIComponent
  | 'containedBy' // UIComponent is contained by UIComponent
  | 'affects' // Function affects UIComponent
  | 'affectedBy' // UIComponent is affected by Function
  | 'consumes' // Function consumes RunParameter
  | 'consumedBy' // RunParameter is consumed by Function
  | 'input' // Function takes DTO as input
  | 'output' // Function returns DTO as output
  | 'entry' // Program has File as entry point
  | 'containsProgram' // Asset contains Program
  | 'schema'; // Constants has schema

export interface Reference {
  from: string; // Name of referencing entity
  type: ReferenceType;
  fromType?: EntityType; // Type of referencing entity
}

export interface Entity {
  name: string;
  type: EntityType;
  position: Position;
  raw: string;
  comment?: string;
  referencedBy?: Reference[]; // Detailed references with types
}

export interface ProgramEntity extends Entity {
  type: 'Program';
  entry: string;
  version?: string;
  purpose?: string;
}

export interface FileEntity extends Entity {
  type: 'File';
  path: string;
  imports: string[];
  exports: string[];
  purpose?: string;
}

export interface FunctionEntity extends Entity {
  type: 'Function';
  container?: string;
  signature: string;
  description?: string;
  calls: string[];
  input?: string; // Can reference a DTO name
  output?: string; // Can reference a DTO name
  affects?: string[]; // UIComponents this function affects
  consumes?: string[]; // RunParameters this function consumes
}

export interface ClassEntity extends Entity {
  type: 'Class';
  container?: string;
  path?: string;
  extends?: string;
  implements: string[];
  methods: string[];
  imports?: string[];
  purpose?: string;
}

export interface ClassFileEntity extends Entity {
  type: 'ClassFile';
  path: string;
  extends?: string;
  implements: string[];
  methods: string[];
  imports: string[];
  exports: string[];
  purpose?: string;
}

export interface ConstantsEntity extends Entity {
  type: 'Constants';
  path: string;
  schema?: string;
  purpose?: string;
}

export interface DTOField {
  name: string;
  type: string;
  description?: string;
  optional?: boolean;
}

export interface DTOEntity extends Entity {
  type: 'DTO';
  purpose?: string;
  fields: DTOField[];
}

export interface AssetEntity extends Entity {
  type: 'Asset';
  description: string;
  containsProgram?: string; // Optional: name of a Program entity this asset contains
}

export interface UIComponentEntity extends Entity {
  type: 'UIComponent';
  purpose: string;
  root?: boolean; // If true, this component doesn't need to be contained by another
  contains?: string[]; // Other UIComponents this contains
  containedBy?: string[]; // UIComponents that contain this
  affectedBy?: string[]; // Functions that affect this component
}

export interface RunParameterEntity extends Entity {
  type: 'RunParameter';
  paramType: 'env' | 'iam' | 'runtime' | 'config'; // Type of parameter
  description: string;
  defaultValue?: string;
  required?: boolean;
  consumedBy?: string[]; // Functions that consume this parameter
}

export interface DependencyEntity extends Entity {
  type: 'Dependency';
  purpose: string;
  version?: string;
  importedBy?: string[]; // Files and Functions that import this dependency
}

export type AnyEntity =
  | ProgramEntity
  | FileEntity
  | FunctionEntity
  | ClassEntity
  | ClassFileEntity
  | ConstantsEntity
  | DTOEntity
  | AssetEntity
  | UIComponentEntity
  | RunParameterEntity
  | DependencyEntity;

export interface ValidationError {
  position: Position;
  message: string;
  severity: 'error' | 'warning';
  suggestion?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export interface ImportStatement {
  path: string;
  alias?: string;
  position: Position;
}

export interface ProgramGraph {
  entities: Map<string, AnyEntity>;
  dependencies: Map<string, string[]>;
  imports?: ImportStatement[];
}
