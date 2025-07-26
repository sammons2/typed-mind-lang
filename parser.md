Sample Type Checker output from Claude (claude.ai)

```typescript
/ Core types
type EntityType = 'Program' | 'File' | 'Function' | 'Class' | 'Constants';

interface Position {
  line: number;
  column: number;
}

interface Entity {
  name: string;
  type: EntityType;
  position: Position;
  raw: string;
}

interface FileEntity extends Entity {
  path: string;
  imports: string[];
  exports: string[];
}

interface FunctionEntity extends Entity {
  container: string;
  signature: string;
  calls: string[];
}

// Parser with position tracking
class DSLParser {
  private lines: string[];
  private entities = new Map<string, Entity>();

  parse(input: string): Map<string, Entity> {
    this.lines = input.split('\n');
    let currentEntity: Entity | null = null;

    this.lines.forEach((line, lineNum) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      // Detect entity declarations
      if (this.isEntityDeclaration(trimmed)) {
        currentEntity = this.parseEntity(trimmed, lineNum + 1);
        this.entities.set(currentEntity.name, currentEntity);
      }
    });

    return this.entities;
  }

  private isEntityDeclaration(line: string): boolean {
    return /^[A-Z]\w*\s*(->|@|<:|!|::)/.test(line);
  }

  private parseEntity(line: string, lineNum: number): Entity {
    // Parse based on operator
    // Implementation details...
    throw new Error("Not implemented");
  }
}

// Static Validator
class DSLValidator {
  private errors: ValidationError[] = [];

  validate(entities: Map<string, Entity>): ValidationResult {
    this.errors = [];

    this.checkOrphans(entities);
    this.checkImports(entities);
    this.checkCircularDeps(entities);
    this.checkEntryPoint(entities);
    this.checkUniquePaths(entities);

    return {
      valid: this.errors.length === 0,
      errors: this.errors
    };
  }

  private checkOrphans(entities: Map<string, Entity>) {
    const referenced = new Set<string>();

    // Find all referenced entities
    entities.forEach(entity => {
      if ('imports' in entity) {
        entity.imports.forEach(imp => referenced.add(imp));
      }
      if ('exports' in entity) {
        entity.exports.forEach(exp => referenced.add(exp));
      }
      if ('calls' in entity) {
        entity.calls.forEach(call => referenced.add(call));
      }
    });

    // Check for orphans
    entities.forEach((entity, name) => {
      if (!referenced.has(name) && entity.type !== 'Program') {
        this.addError({
          position: entity.position,
          message: `Orphaned entity '${name}'`,
          severity: 'error',
          suggestion: 'Remove or reference this entity'
        });
      }
    });
  }

  private checkImports(entities: Map<string, Entity>) {
    entities.forEach(entity => {
      if (!('imports' in entity)) return;

      entity.imports.forEach(imp => {
        // Handle wildcards
        if (imp.includes('*')) {
          const base = imp.split('*')[0];
          const hasMatch = Array.from(entities.keys())
            .some(name => name.startsWith(base));

          if (!hasMatch) {
            this.addError({
              position: entity.position,
              message: `No entities match import pattern '${imp}'`,
              severity: 'error'
            });
          }
        } else if (!entities.has(imp)) {
          // Fuzzy match for suggestions
          const suggestion = this.findSimilar(imp, entities);
          this.addError({
            position: entity.position,
            message: `Import '${imp}' not found`,
            severity: 'error',
            suggestion: suggestion ? `Did you mean '${suggestion}'?` : undefined
          });
        }
      });
    });
  }

  private checkCircularDeps(entities: Map<string, Entity>) {
    const graph = this.buildDependencyGraph(entities);
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const hasCycle = (node: string, path: string[] = []): string[] | null => {
      visited.add(node);
      recursionStack.add(node);
      path.push(node);

      const deps = graph.get(node) || [];
      for (const dep of deps) {
        if (!visited.has(dep)) {
          const cycle = hasCycle(dep, [...path]);
          if (cycle) return cycle;
        } else if (recursionStack.has(dep)) {
          return [...path, dep];
        }
      }

      recursionStack.delete(node);
      return null;
    };

    entities.forEach((_, name) => {
      if (!visited.has(name)) {
        const cycle = hasCycle(name);
        if (cycle) {
          const entity = entities.get(name)!;
          this.addError({
            position: entity.position,
            message: `Circular dependency detected: ${cycle.join(' -> ')}`,
            severity: 'error'
          });
        }
      }
    });
  }

  private checkEntryPoint(entities: Map<string, Entity>) {
    const programs = Array.from(entities.values())
      .filter(e => e.type === 'Program');

    if (programs.length === 0) {
      this.addError({
        position: { line: 1, column: 1 },
        message: 'No program entry point defined',
        severity: 'error',
        suggestion: 'Add a Program entity: AppName -> EntryFile'
      });
    } else if (programs.length > 1) {
      programs.slice(1).forEach(program => {
        this.addError({
          position: program.position,
          message: 'Multiple program entry points defined',
          severity: 'error',
          suggestion: 'Only one Program entity is allowed'
        });
      });
    }
  }

  private checkUniquePaths(entities: Map<string, Entity>) {
    const paths = new Map<string, Entity>();

    entities.forEach(entity => {
      if ('path' in entity) {
        const existing = paths.get(entity.path);
        if (existing) {
          this.addError({
            position: entity.position,
            message: `Duplicate path '${entity.path}'`,
            severity: 'error',
            suggestion: `Already used by '${existing.name}'`
          });
        } else {
          paths.set(entity.path, entity);
        }
      }
    });
  }

  private buildDependencyGraph(entities: Map<string, Entity>): Map<string, string[]> {
    const graph = new Map<string, string[]>();

    entities.forEach((entity, name) => {
      const deps: string[] = [];

      if ('imports' in entity) {
        deps.push(...entity.imports.filter(imp => !imp.includes('*')));
      }
      if ('calls' in entity) {
        deps.push(...entity.calls);
      }

      graph.set(name, deps);
    });

    return graph;
  }

  private findSimilar(target: string, entities: Map<string, Entity>): string | null {
    let bestMatch = '';
    let bestScore = 0.6; // Threshold

    entities.forEach((_, name) => {
      const score = this.similarity(target.toLowerCase(), name.toLowerCase());
      if (score > bestScore) {
        bestScore = score;
        bestMatch = name;
      }
    });

    return bestMatch || null;
  }

  private similarity(a: string, b: string): number {
    // Simple Levenshtein-based similarity
    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    const distance = matrix[b.length][a.length];
    return 1 - distance / Math.max(a.length, b.length);
  }

  private addError(error: ValidationError) {
    this.errors.push(error);
  }
}

// Error formatting
interface ValidationError {
  position: Position;
  message: string;
  severity: 'error' | 'warning';
  suggestion?: string;
}

interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

class ErrorFormatter {
  format(error: ValidationError, lines: string[]): string {
    const { position, message, severity, suggestion } = error;
    const line = lines[position.line - 1] || '';
    const pointer = ' '.repeat(position.column - 1) + '^';

    let output = `${severity.toUpperCase()} at line ${position.line}, col ${position.column}: ${message}\n`;
    output += `  ${position.line} | ${line}\n`;
    output += `     ${pointer}\n`;

    if (suggestion) {
      output += `  Suggestion: ${suggestion}\n`;
    }

    return output;
  }
}

// Main API
export class DSLChecker {
  private parser = new DSLParser();
  private validator = new DSLValidator();
  private formatter = new ErrorFormatter();

  check(input: string): ValidationResult {
    const entities = this.parser.parse(input);
    const result = this.validator.validate(entities);

    if (!result.valid) {
      const lines = input.split('\n');
      result.errors.forEach(error => {
        console.error(this.formatter.format(error, lines));
      });
    }

    return result;
  }
}
```