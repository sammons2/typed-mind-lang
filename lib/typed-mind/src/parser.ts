import type {
  AnyEntity,
  ProgramEntity,
  FileEntity,
  FunctionEntity,
  ClassEntity,
  ConstantsEntity,
  Position,
} from './types';

export class DSLParser {
  private lines: string[] = [];
  private entities = new Map<string, AnyEntity>();

  parse(input: string): Map<string, AnyEntity> {
    this.lines = input.split('\n');
    this.entities.clear();

    let currentEntity: AnyEntity | null = null;
    const entityStack: AnyEntity[] = [];

    for (let lineNum = 0; lineNum < this.lines.length; lineNum++) {
      const line = this.lines[lineNum];
      if (!line) continue;
      const trimmed = line.trim();

      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith('#')) continue;

      // Check for continuation of previous entity
      if (currentEntity && this.isContinuation(line)) {
        this.parseContinuation(currentEntity, trimmed, lineNum + 1);
        continue;
      }

      // Detect entity declarations
      if (this.isEntityDeclaration(trimmed)) {
        currentEntity = this.parseEntity(trimmed, lineNum + 1);
        if (currentEntity) {
          this.entities.set(currentEntity.name, currentEntity);
          entityStack.push(currentEntity);
        }
      } else {
        // If we hit a non-entity line that's not a continuation, clear current entity
        currentEntity = null;
      }
    }

    return this.entities;
  }

  private isEntityDeclaration(line: string): boolean {
    // Match various entity patterns - entities can start with any letter
    return /^\w+\s*(->|@|<:|!|::|\s*:)/.test(line);
  }

  private isContinuation(line: string): boolean {
    // Lines starting with whitespace and specific operators are continuations
    return /^\s+(->|<-|~>|=>|")/.test(line);
  }

  private parseEntity(line: string, lineNum: number): AnyEntity | null {
    const position: Position = { line: lineNum, column: 1 };

    // Program: AppName -> EntryFile v1.0.0
    const programMatch = line.match(/^(\w+)\s*->\s*(\w+)(?:\s+v([\d.]+))?$/);
    if (programMatch) {
      return {
        name: programMatch[1] as string,
        type: 'Program',
        entry: programMatch[2] as string,
        version: programMatch[3],
        position,
        raw: line,
      } as ProgramEntity;
    }

    // File: UserService @ src/services/user.ts:
    const fileMatch = line.match(/^(\w+)\s*@\s*([^:]+):/);
    if (fileMatch) {
      return {
        name: fileMatch[1] as string,
        type: 'File',
        path: fileMatch[2]?.trim() as string,
        imports: [],
        exports: [],
        position,
        raw: line,
      } as FileEntity;
    }

    // Function: createUser :: (data: UserInput) => Promise<User>
    const functionMatch = line.match(/^(\w+)\s*::\s*(.+)$/);
    if (functionMatch) {
      return {
        name: functionMatch[1] as string,
        type: 'Function',
        signature: functionMatch[2]?.trim() as string,
        calls: [],
        position,
        raw: line,
      } as FunctionEntity;
    }

    // Class: UserController <: BaseController, IController
    const classMatch = line.match(/^(\w+)\s*<:\s*(.+)$/);
    if (classMatch) {
      const [baseClass, ...interfaces] = (classMatch[2] as string).split(',').map((s) => s.trim());
      return {
        name: classMatch[1] as string,
        type: 'Class',
        extends: baseClass,
        implements: interfaces,
        methods: [],
        position,
        raw: line,
      } as ClassEntity;
    }

    // Constants: AppConfig ! src/config.ts : ConfigSchema
    const constantsMatch = line.match(/^(\w+)\s*!\s*([^:]+)(?:\s*:\s*(\w+))?$/);
    if (constantsMatch) {
      return {
        name: constantsMatch[1] as string,
        type: 'Constants',
        path: constantsMatch[2]?.trim() as string,
        schema: constantsMatch[3],
        position,
        raw: line,
      } as ConstantsEntity;
    }

    // Long form with explicit type
    const longFormMatch = line.match(/^(\w+)\s*:$/);
    if (longFormMatch) {
      // Look ahead for type specification
      const nextLineNum = lineNum;
      if (nextLineNum < this.lines.length) {
        const nextLine = this.lines[nextLineNum]?.trim();
        const typeMatch = nextLine?.match(/^\s*type:\s*(\w+)$/);
        if (typeMatch) {
          const entityType = typeMatch[1] as string;
          const name = longFormMatch[1] as string;
          return this.createLongFormEntity(name, entityType, position, line);
        }
      }
    }

    return null;
  }

  private parseContinuation(entity: AnyEntity, line: string, _lineNum: number): void {
    // Imports: <- [Database, UserModel]
    const importMatch = line.match(/^<-\s*\[([^\]]+)\]/);
    if (importMatch && 'imports' in entity) {
      entity.imports = this.parseList(importMatch[1] as string);
      return;
    }

    // Exports: -> [createUser, getUser]
    const exportMatch = line.match(/^->\s*\[([^\]]+)\]/);
    if (exportMatch && 'exports' in entity) {
      entity.exports = this.parseList(exportMatch[1] as string);
      return;
    }

    // Calls: ~> [validateInput, Database.insert]
    const callsMatch = line.match(/^~>\s*\[([^\]]+)\]/);
    if (callsMatch && 'calls' in entity) {
      entity.calls = this.parseList(callsMatch[1] as string);
      return;
    }

    // Methods: => [handleCreate, handleGet]
    const methodsMatch = line.match(/^=>\s*\[([^\]]+)\]/);
    if (methodsMatch && 'methods' in entity) {
      entity.methods = this.parseList(methodsMatch[1] as string);
      return;
    }

    // Description: "Creates a new user in the database"
    const descMatch = line.match(/^"([^"]+)"$/);
    if (descMatch) {
      if (entity.type === 'Function') {
        const funcEntity = entity as FunctionEntity;
        funcEntity.description = descMatch[1] as string;
        return;
      }
    }
  }

  private parseList(listStr: string): string[] {
    return listStr.split(',').map((item) => item.trim());
  }

  private createLongFormEntity(name: string, type: string, position: Position, raw: string): AnyEntity | null {
    const baseEntity = { name, position, raw };

    switch (type) {
      case 'Program':
        return { ...baseEntity, type: 'Program', entry: '' } as ProgramEntity;
      case 'File':
        return { ...baseEntity, type: 'File', path: '', imports: [], exports: [] } as FileEntity;
      case 'Function':
        return { ...baseEntity, type: 'Function', signature: '', calls: [] } as FunctionEntity;
      case 'Class':
        return { ...baseEntity, type: 'Class', implements: [], methods: [] } as ClassEntity;
      case 'Constants':
        return { ...baseEntity, type: 'Constants', path: '' } as ConstantsEntity;
      default:
        return null;
    }
  }
}