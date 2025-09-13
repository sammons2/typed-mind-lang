import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-39-classfile-basic', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-39-classfile-basic.tmd';

  it('should parse ClassFile entities correctly', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Should be invalid due to issues with ClassFile parsing and orphaned entities
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(3);

    const errorMessages = result.errors.map(err => err.message);

    // Should detect that calls cannot reference ClassFile entities
    expect(errorMessages).toContain("Cannot use 'calls' to reference ClassFile 'TodoController'");

    // Should detect orphaned entities
    expect(errorMessages).toContain("Orphaned entity 'startApp'");
    expect(errorMessages).toContain("Orphaned entity 'BaseController'");

    // Verify specific error positions
    const callError = result.errors.find(err => err.message.includes("Cannot use 'calls' to reference ClassFile 'TodoController'"));
    expect(callError?.position.line).toBe(10);
    expect(callError?.position.column).toBe(1);
    expect(callError?.suggestion).toBe("'calls' can only reference: Function, Class");

    const orphanedStartAppError = result.errors.find(err => err.message === "Orphaned entity 'startApp'");
    expect(orphanedStartAppError?.position.line).toBe(10);

    const orphanedBaseControllerError = result.errors.find(err => err.message === "Orphaned entity 'BaseController'");
    expect(orphanedBaseControllerError?.position.line).toBe(18);
    
    // Verify the file contains expected ClassFile syntax
    expect(content).toContain('TodoController #: src/controllers/todo.ts <: BaseController');
    expect(content).toContain('BaseController #: src/controllers/base.ts');
  });
});