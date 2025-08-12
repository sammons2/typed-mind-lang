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
    
    // Should have exactly 4 errors
    expect(result.errors).toHaveLength(4);
    
    // Sort errors by line number for consistent checking
    const sortedErrors = result.errors.sort((a, b) => a.position.line - b.position.line);
    
    // Check first error: Orphaned UnexportedClass
    expect(sortedErrors[0].position.line).toBe(7);
    expect(sortedErrors[0].position.column).toBe(1);
    expect(sortedErrors[0].message).toBe("Orphaned entity 'UnexportedClass'");
    expect(sortedErrors[0].severity).toBe('error');
    expect(sortedErrors[0].suggestion).toBe('Remove or reference this entity');
    
    // Check second error: UnexportedClass not exported by any file
    expect(sortedErrors[1].position.line).toBe(7);
    expect(sortedErrors[1].position.column).toBe(1);
    expect(sortedErrors[1].message).toBe("Class 'UnexportedClass' is not exported by any file");
    expect(sortedErrors[1].severity).toBe('error');
    expect(sortedErrors[1].suggestion).toBe("Add 'UnexportedClass' to the exports of a file entity or convert to ClassFile with #: operator");
    
    // Check third error: Orphaned unexportedFunction
    expect(sortedErrors[2].position.line).toBe(10);
    expect(sortedErrors[2].position.column).toBe(1);
    expect(sortedErrors[2].message).toBe("Orphaned entity 'unexportedFunction'");
    expect(sortedErrors[2].severity).toBe('error');
    expect(sortedErrors[2].suggestion).toBe('Remove or reference this entity');
    
    // Check fourth error: unexportedFunction not exported and not a class method
    expect(sortedErrors[3].position.line).toBe(10);
    expect(sortedErrors[3].position.column).toBe(1);
    expect(sortedErrors[3].message).toBe("Function 'unexportedFunction' is not exported by any file and is not a class method");
    expect(sortedErrors[3].severity).toBe('error');
    expect(sortedErrors[3].suggestion).toBe("Either add 'unexportedFunction' to the exports of a file entity or define it as a method of a class");
  });
});