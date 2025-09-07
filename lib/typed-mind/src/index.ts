import { DSLParser } from './parser';
import { DSLValidator } from './validator';
import { ErrorFormatter } from './formatter';
import { ImportResolver } from './import-resolver';
import type { ValidationResult, ProgramGraph, AnyEntity, ValidationError } from './types';
import { dirname } from 'path';

export * from './types';
export { DSLParser, type ParseResult } from './parser';
export { DSLValidator } from './validator';
export { ErrorFormatter } from './formatter';
export { LongformParser } from './longform-parser';
export { GrammarValidator, type GrammarValidationResult, type GrammarValidationError } from './grammar-validator';
export { ENTITY_PATTERNS, CONTINUATION_PATTERNS, GENERAL_PATTERNS, PATTERN_DESCRIPTIONS } from './parser-patterns';
export { GrammarDocGenerator } from './grammar-doc-generator';

export class DSLChecker {
  private parser = new DSLParser();
  private validator: DSLValidator;
  private formatter = new ErrorFormatter();
  private importResolver = new ImportResolver();

  constructor(options: { skipOrphanCheck?: boolean } = {}) {
    this.validator = new DSLValidator(options);
  }

  check(input: string, filePath?: string): ValidationResult {
    const parseResult = this.parser.parse(input);
    const allEntities = new Map(parseResult.entities);
    const allErrors: ValidationError[] = [];

    // Resolve imports if any exist and filePath is provided
    if (parseResult.imports.length > 0 && filePath) {
      const basePath = dirname(filePath);
      const { resolvedEntities, errors } = this.importResolver.resolveImports(parseResult.imports, basePath);

      // Merge resolved entities
      for (const [name, entity] of resolvedEntities) {
        if (allEntities.has(name)) {
          allErrors.push({
            position: entity.position,
            message: `Entity '${name}' conflicts with imported entity`,
            severity: 'error',
          });
        } else {
          allEntities.set(name, entity);
        }
      }

      allErrors.push(...errors);
    }

    const result = this.validator.validate(allEntities, parseResult);
    result.errors.push(...allErrors);
    result.valid = result.errors.length === 0;

    if (!result.valid) {
      const lines = input.split('\n');
      for (const error of result.errors) {
        console.error(this.formatter.format(error, lines));
      }
    }

    return result;
  }

  parse(input: string, filePath?: string): ProgramGraph {
    const parseResult = this.parser.parse(input);
    const allEntities = new Map(parseResult.entities);

    // Resolve imports if any exist and filePath is provided
    if (parseResult.imports.length > 0 && filePath) {
      const basePath = dirname(filePath);
      const { resolvedEntities } = this.importResolver.resolveImports(parseResult.imports, basePath);

      // Merge resolved entities
      for (const [name, entity] of resolvedEntities) {
        if (!allEntities.has(name)) {
          allEntities.set(name, entity);
        }
      }
    }

    const dependencies = this.buildDependencyGraph(allEntities);

    return {
      entities: allEntities,
      dependencies,
      imports: parseResult.imports,
    };
  }

  private buildDependencyGraph(entities: Map<string, AnyEntity>): Map<string, string[]> {
    const graph = new Map<string, string[]>();

    for (const [name, entity] of entities) {
      const deps: string[] = [];

      if ('imports' in entity) {
        deps.push(...entity.imports.filter((imp) => !imp.includes('*')));
      }
      if ('calls' in entity) {
        deps.push(...entity.calls);
      }
      if (entity.type === 'Program') {
        deps.push(entity.entry);
      }

      graph.set(name, deps);
    }

    return graph;
  }
}
