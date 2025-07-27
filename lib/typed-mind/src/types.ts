export type EntityType = 'Program' | 'File' | 'Function' | 'Class' | 'Constants' | 'DTO';

export interface Position {
  line: number;
  column: number;
}

export interface Entity {
  name: string;
  type: EntityType;
  position: Position;
  raw: string;
}

export interface ProgramEntity extends Entity {
  type: 'Program';
  entry: string;
  version?: string;
}

export interface FileEntity extends Entity {
  type: 'File';
  path: string;
  imports: string[];
  exports: string[];
}

export interface FunctionEntity extends Entity {
  type: 'Function';
  container?: string;
  signature: string;
  description?: string;
  calls: string[];
  input?: string; // Can reference a DTO name
  output?: string; // Can reference a DTO name
}

export interface ClassEntity extends Entity {
  type: 'Class';
  container?: string;
  path?: string;
  extends?: string;
  implements: string[];
  methods: string[];
}

export interface ConstantsEntity extends Entity {
  type: 'Constants';
  path: string;
  schema?: string;
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

export type AnyEntity = ProgramEntity | FileEntity | FunctionEntity | ClassEntity | ConstantsEntity | DTOEntity;

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

export interface ProgramGraph {
  entities: Map<string, AnyEntity>;
  dependencies: Map<string, string[]>;
}