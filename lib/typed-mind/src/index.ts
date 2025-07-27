import { DSLParser } from './parser';
import { DSLValidator } from './validator';
import { ErrorFormatter } from './formatter';
import type { ValidationResult, ProgramGraph, AnyEntity } from './types';

export * from './types';
export { DSLParser } from './parser';
export { DSLValidator } from './validator';
export { ErrorFormatter } from './formatter';

export class DSLChecker {
  private parser = new DSLParser();
  private validator = new DSLValidator();
  private formatter = new ErrorFormatter();

  check(input: string): ValidationResult {
    const entities = this.parser.parse(input);
    const result = this.validator.validate(entities);

    if (!result.valid) {
      const lines = input.split('\n');
      for (const error of result.errors) {
        console.error(this.formatter.format(error, lines));
      }
    }

    return result;
  }

  parse(input: string): ProgramGraph {
    const entities = this.parser.parse(input);
    const dependencies = this.buildDependencyGraph(entities);

    return {
      entities,
      dependencies,
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