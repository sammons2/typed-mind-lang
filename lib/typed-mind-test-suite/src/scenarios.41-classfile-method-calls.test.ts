import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-41-classfile-method-calls', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-41-classfile-method-calls.tmd';

  it('should validate method calls on ClassFile entities', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Should be invalid due to issues with method calls and entity resolution (based on actual error output)
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(8);
    
    const errorMessages = result.errors.map(err => err.message);
    
    // Should detect that calls cannot reference ClassFile entities
    expect(errorMessages.filter(msg => msg.includes("Cannot use 'calls' to reference ClassFile 'UserController'")).length).toBe(3);
    
    // Should detect orphaned entity
    expect(errorMessages).toContain("Orphaned entity 'testInvalidCall'");
    
    // Should detect function not exported by any file
    expect(errorMessages).toContain("Function 'testInvalidCall' is not exported by any file and is not a class method");
    
    // Should detect method not found on classfile
    expect(errorMessages).toContain("Method 'nonExistentMethod' not found on classfile 'UserController'");
    
    // Verify specific error positions for method call validation
    const orphanedError = result.errors.find(err => err.message.includes("Orphaned entity 'testInvalidCall'"));
    expect(orphanedError?.position.line).toBe(25);
    
    const methodNotFoundError = result.errors.find(err => err.message.includes("Method 'nonExistentMethod' not found on classfile"));
    expect(methodNotFoundError?.position.line).toBe(25);
    expect(methodNotFoundError?.suggestion).toBe("Available methods: createUser, getUser, updateUser, deleteUser");
    
    // Verify the file contains expected ClassFile syntax with proper methods
    expect(content).toContain('UserController #: src/controllers/user.ts <: BaseController');
    expect(content).toContain('=> [createUser, getUser, updateUser, deleteUser]');
  });
});