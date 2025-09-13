import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-06-invalid-method-calls', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-06-invalid-method-calls.tmd';

  it('should detect invalid method calls and unknown entity references', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Should be invalid due to method call errors
    expect(result.valid).toBe(false);
    
    // Should have exactly 5 errors (3 method/call errors + 2 orphaned entities)
    expect(result.errors).toHaveLength(5);

    // Check for orphaned entities
    const orphanedUserService = result.errors.find(err =>
      err.message === "Orphaned entity 'UserService'"
    );
    expect(orphanedUserService).toBeDefined();
    expect(orphanedUserService?.position.line).toBe(6);

    const orphanedProcessData = result.errors.find(err =>
      err.message === "Orphaned entity 'processData'"
    );
    expect(orphanedProcessData).toBeDefined();
    expect(orphanedProcessData?.position.line).toBe(9);

    // Check first error: UserService.update method not found
    const updateError = result.errors.find(err =>
      err.message.includes("Method 'update' not found on class 'UserService'")
    );
    expect(updateError).toBeDefined();
    expect(updateError?.severity).toBe('error');
    expect(updateError?.position.line).toBe(9);
    expect(updateError?.position.column).toBe(1);
    expect(updateError?.suggestion).toBe('Available methods: create, read');

    // Check second error: UserService.delete method not found
    const deleteError = result.errors.find(err =>
      err.message.includes("Method 'delete' not found on class 'UserService'")
    );
    expect(deleteError).toBeDefined();
    expect(deleteError?.severity).toBe('error');
    expect(deleteError?.position.line).toBe(9);
    expect(deleteError?.position.column).toBe(1);
    expect(deleteError?.suggestion).toBe('Available methods: create, read');

    // Check third error: Unknown entity NotAClass
    const unknownEntityError = result.errors.find(err =>
      err.message.includes("Call to 'NotAClass.method' references unknown entity 'NotAClass'")
    );
    expect(unknownEntityError).toBeDefined();
    expect(unknownEntityError?.severity).toBe('error');
    expect(unknownEntityError?.position.line).toBe(9);
    expect(unknownEntityError?.position.column).toBe(1);
    expect(unknownEntityError?.suggestion).toBeUndefined();
  });
});