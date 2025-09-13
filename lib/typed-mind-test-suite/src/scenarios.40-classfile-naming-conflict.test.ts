import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-40-classfile-naming-conflict', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-40-classfile-naming-conflict.tmd';

  it('should detect naming conflicts between File and Class entities', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Should be invalid due to naming conflicts and other validation errors
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(10);

    const errorMessages = result.errors.map(err => err.message);

    // Should detect naming conflicts between File and Class entities
    const namingConflictErrors = result.errors.filter(err =>
      err.message.includes("Entity name 'UserController' is used by both a File and a Class")
    );
    expect(namingConflictErrors).toHaveLength(2);

    // Should suggest using ClassFile syntax
    const conflictError = namingConflictErrors[0];
    expect(conflictError.suggestion).toContain("Replace with: UserController #:");
    expect(conflictError.suggestion).toContain("src/controllers/user.ts <: BaseClass");

    // Should detect orphaned entities
    expect(errorMessages).toContain("Orphaned entity 'startApp'");
    expect(errorMessages).toContain("Orphaned entity 'someFunction'");
    expect(errorMessages).toContain("Orphaned entity 'BaseController'");

    // Should detect orphaned file
    expect(errorMessages).toContain("Orphaned file 'UserService' - none of its exports are imported");

    // Should detect classes not exported by files
    expect(errorMessages).toContain("Class 'UserController' is not exported by any file");
    expect(errorMessages).toContain("Class 'BaseController' is not exported by any file");

    // Should detect function not exported by any file
    expect(errorMessages).toContain("Function 'someFunction' is not exported by any file and is not a class method");

    // Should detect method not found on class
    expect(errorMessages).toContain("Method 'someMethod' not found on class 'UserController'");
    
    // Verify specific error positions for naming conflicts
    const firstConflictError = result.errors.find(err => 
      err.message.includes("Entity name 'UserController' is used by both a File and a Class") && 
      err.position.line === 13
    );
    expect(firstConflictError).toBeDefined();
    
    const secondConflictError = result.errors.find(err => 
      err.message.includes("Entity name 'UserController' is used by both a File and a Class") && 
      err.position.line === 18
    );
    expect(secondConflictError).toBeDefined();
  });
});