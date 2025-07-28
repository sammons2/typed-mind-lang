import { readFileSync } from 'fs';
import { dirname, resolve, isAbsolute } from 'path';
import type { ImportStatement, AnyEntity, ValidationError } from './types';
import type { ParseResult } from './parser';
import { DSLParser } from './parser';

export interface ResolvedImport {
  import: ImportStatement;
  entities: Map<string, AnyEntity>;
  imports: ImportStatement[];
  errors?: ValidationError[];
}

export class ImportResolver {
  private parser = new DSLParser();
  private resolvedPaths = new Map<string, ParseResult>();
  private resolutionStack: string[] = [];

  resolveImports(
    imports: ImportStatement[],
    basePath: string
  ): { 
    resolvedEntities: Map<string, AnyEntity>;
    errors: ValidationError[];
  } {
    const allEntities = new Map<string, AnyEntity>();
    const errors: ValidationError[] = [];

    for (const importStmt of imports) {
      const result = this.resolveImport(importStmt, basePath);
      
      if (result.errors) {
        errors.push(...result.errors);
        continue;
      }

      // Apply alias prefix if specified
      const prefix = result.import.alias ? `${result.import.alias}.` : '';
      
      for (const [name, entity] of result.entities) {
        const prefixedName = prefix + name;
        
        if (allEntities.has(prefixedName)) {
          errors.push({
            position: result.import.position,
            message: `Duplicate entity name '${prefixedName}' from import`,
            severity: 'error',
            suggestion: 'Use an alias to avoid naming conflicts',
          });
        } else {
          // Clone entity with prefixed name
          const clonedEntity = { ...entity, name: prefixedName };
          allEntities.set(prefixedName, clonedEntity);
        }
      }

      // Recursively resolve nested imports
      if (result.imports.length > 0) {
        const resolvedPath = this.resolvePath(importStmt.path, basePath);
        const importDir = dirname(resolvedPath);
        const nestedResult = this.resolveImports(result.imports, importDir);
        
        for (const [name, entity] of nestedResult.resolvedEntities) {
          const nestedName = prefix + name;
          if (!allEntities.has(nestedName)) {
            allEntities.set(nestedName, { ...entity, name: nestedName });
          }
        }
        
        errors.push(...nestedResult.errors);
      }
    }

    return { resolvedEntities: allEntities, errors };
  }

  private resolveImport(
    importStmt: ImportStatement,
    basePath: string
  ): ResolvedImport {
    const fullPath = this.resolvePath(importStmt.path, basePath);

    // Check for circular imports before adding to stack
    if (this.resolutionStack.includes(fullPath)) {
      // Create a clean error without causing recursion
      const cyclePath = [...this.resolutionStack, fullPath];
      const cycleStart = cyclePath.indexOf(fullPath);
      const cycle = cyclePath.slice(cycleStart).join(' -> ');
      
      return {
        import: importStmt,
        entities: new Map(),
        imports: [],
        errors: [{
          position: importStmt.position,
          message: `Circular import detected: ${cycle}`,
          severity: 'error',
        }],
      };
    }

    // Check if already resolved
    if (this.resolvedPaths.has(fullPath)) {
      const cached = this.resolvedPaths.get(fullPath)!;
      return {
        import: importStmt,
        entities: cached.entities,
        imports: cached.imports,
      };
    }

    try {
      // Read and parse the imported file
      this.resolutionStack.push(fullPath);
      const content = readFileSync(fullPath, 'utf-8');
      const parseResult = this.parser.parse(content);
      
      this.resolvedPaths.set(fullPath, parseResult);
      this.resolutionStack.pop();

      return {
        import: importStmt,
        entities: parseResult.entities,
        imports: parseResult.imports,
      };
    } catch (error) {
      this.resolutionStack.pop();
      
      return {
        import: importStmt,
        entities: new Map(),
        imports: [],
        errors: [{
          position: importStmt.position,
          message: `Failed to import '${importStmt.path}': ${error}`,
          severity: 'error',
        }],
      };
    }
  }

  private resolvePath(importPath: string, basePath: string): string {
    if (isAbsolute(importPath)) {
      return importPath;
    }
    return resolve(basePath, importPath);
  }
}