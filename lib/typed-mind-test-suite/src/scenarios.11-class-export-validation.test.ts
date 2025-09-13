import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-11-class-export-validation', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-11-class-export-validation.tmd';

  it('should validate class export behavior and detect export violations', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Should be invalid due to class export violations
    expect(result.valid).toBe(false);
    
    // Should have exactly 6 errors (4 orphaned + 2 export validation)
    expect(result.errors).toHaveLength(6);

    // Check for all orphaned entity errors
    const orphanedUnexportedClass = result.errors.find(err =>
      err.message === "Orphaned entity 'UnexportedClass'"
    );
    expect(orphanedUnexportedClass).toBeDefined();
    expect(orphanedUnexportedClass?.position.line).toBe(7);

    const orphanedUnexportedFunction = result.errors.find(err =>
      err.message === "Orphaned entity 'unexportedFunction'"
    );
    expect(orphanedUnexportedFunction).toBeDefined();
    expect(orphanedUnexportedFunction?.position.line).toBe(10);

    const orphanedExportedClass = result.errors.find(err =>
      err.message === "Orphaned entity 'ExportedClass'"
    );
    expect(orphanedExportedClass).toBeDefined();
    expect(orphanedExportedClass?.position.line).toBe(13);

    const orphanedExportedFunction = result.errors.find(err =>
      err.message === "Orphaned entity 'exportedFunction'"
    );
    expect(orphanedExportedFunction).toBeDefined();
    expect(orphanedExportedFunction?.position.line).toBe(16);

    // Check export validation errors
    const classNotExportedError = result.errors.find(err =>
      err.message === "Class 'UnexportedClass' is not exported by any file"
    );
    expect(classNotExportedError).toBeDefined();
    expect(classNotExportedError?.position.line).toBe(7);
    expect(classNotExportedError?.suggestion).toBe("Add 'UnexportedClass' to the exports of a file entity or convert to ClassFile with #: operator");

    const functionNotExportedError = result.errors.find(err =>
      err.message === "Function 'unexportedFunction' is not exported by any file and is not a class method"
    );
    expect(functionNotExportedError).toBeDefined();
    expect(functionNotExportedError?.position.line).toBe(10);
    expect(functionNotExportedError?.suggestion).toBe("Either add 'unexportedFunction' to the exports of a file entity or define it as a method of a class");
  });
});