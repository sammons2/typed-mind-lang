import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-02-orphaned-entity', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-02-orphaned-entity.tmd';

  it('should detect orphaned entities that are not referenced anywhere', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Should fail validation due to orphaned entities
    expect(result.valid).toBe(false);
    
    // Should have exactly 7 errors
    expect(result.errors).toHaveLength(7);
    
    // Check for orphaned entity errors
    const orphanedFunctionError = result.errors.find(err => 
      err.message === "Orphaned entity 'OrphanedFunction'" && err.position.line === 9
    );
    expect(orphanedFunctionError).toBeDefined();
    expect(orphanedFunctionError?.severity).toBe('error');
    expect(orphanedFunctionError?.suggestion).toBe('Remove or reference this entity');
    expect(orphanedFunctionError?.position.column).toBe(1);
    
    const orphanedClassError = result.errors.find(err => 
      err.message === "Orphaned entity 'OrphanedClass'" && err.position.line === 11
    );
    expect(orphanedClassError).toBeDefined();
    expect(orphanedClassError?.severity).toBe('error');
    expect(orphanedClassError?.suggestion).toBe('Remove or reference this entity');
    expect(orphanedClassError?.position.column).toBe(1);
    
    const orphanedFileError = result.errors.find(err =>
      err.message === "Orphaned file 'OrphanedFile' - none of its exports are imported" && err.position.line === 14
    );
    expect(orphanedFileError).toBeDefined();
    expect(orphanedFileError?.severity).toBe('error');
    expect(orphanedFileError?.suggestion).toBe('Remove this file or import its exports somewhere');
    expect(orphanedFileError?.position.column).toBe(1);
    
    // Check for function not exported errors
    const functionNotExportedError = result.errors.find(err => 
      err.message === "Function 'OrphanedFunction' is not exported by any file and is not a class method"
    );
    expect(functionNotExportedError).toBeDefined();
    expect(functionNotExportedError?.severity).toBe('error');
    expect(functionNotExportedError?.suggestion).toBe("Either add 'OrphanedFunction' to the exports of a file entity or define it as a method of a class");
    expect(functionNotExportedError?.position.line).toBe(9);
    expect(functionNotExportedError?.position.column).toBe(1);
    
    // Check for class not exported errors
    const classNotExportedError = result.errors.find(err => 
      err.message === "Class 'OrphanedClass' is not exported by any file"
    );
    expect(classNotExportedError).toBeDefined();
    expect(classNotExportedError?.severity).toBe('error');
    expect(classNotExportedError?.suggestion).toBe("Add 'OrphanedClass' to the exports of a file entity or convert to ClassFile with #: operator");
    expect(classNotExportedError?.position.line).toBe(11);
    expect(classNotExportedError?.position.column).toBe(1);

    // Check for additional orphaned entities
    const orphanedActiveServiceError = result.errors.find(err =>
      err.message === "Orphaned entity 'ActiveService'" && err.position.line === 6
    );
    expect(orphanedActiveServiceError).toBeDefined();
    expect(orphanedActiveServiceError?.severity).toBe('error');

    const orphanedSomethingError = result.errors.find(err =>
      err.message === "Orphaned entity 'something'" && err.position.line === 18
    );
    expect(orphanedSomethingError).toBeDefined();
    expect(orphanedSomethingError?.severity).toBe('error');

    // Verify that all errors are about orphaned entities
    const errorMessages = result.errors.map(err => err.message);
    expect(errorMessages).toContain("Orphaned entity 'ActiveService'");
    expect(errorMessages).toContain("Orphaned entity 'OrphanedFunction'");
    expect(errorMessages).toContain("Orphaned entity 'OrphanedClass'");
    expect(errorMessages).toContain("Orphaned file 'OrphanedFile' - none of its exports are imported");
    expect(errorMessages).toContain("Orphaned entity 'something'");
    expect(errorMessages).toContain("Function 'OrphanedFunction' is not exported by any file and is not a class method");
    expect(errorMessages).toContain("Class 'OrphanedClass' is not exported by any file");
  });
});