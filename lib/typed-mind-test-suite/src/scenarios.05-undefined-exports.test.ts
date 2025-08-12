import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-05-undefined-exports', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-05-undefined-exports.tmd';

  it('should validate 05 undefined exports', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Validation should fail due to undefined exports
    expect(result.valid).toBe(false);
    
    // Should have exactly 2 errors for the undefined exports
    expect(result.errors).toHaveLength(2);
    
    // Sort errors by entity name for consistent testing
    const sortedErrors = result.errors.sort((a, b) => a.message.localeCompare(b.message));
    
    // First error: deleteUser is not defined
    expect(sortedErrors[0]).toEqual({
      position: { line: 3, column: 1 },
      message: "Export 'deleteUser' is not defined anywhere in the codebase",
      severity: 'error',
      suggestion: "Define 'deleteUser' as a Function, Class, Constants, Asset, or UIComponent entity"
    });
    
    // Second error: updateUser is not defined
    expect(sortedErrors[1]).toEqual({
      position: { line: 3, column: 1 },
      message: "Export 'updateUser' is not defined anywhere in the codebase",
      severity: 'error',
      suggestion: "Define 'updateUser' as a Function, Class, Constants, Asset, or UIComponent entity"
    });
    
    // Verify that createUser and UserModel are not flagged as errors
    const errorMessages = result.errors.map(err => err.message);
    expect(errorMessages).not.toContain("Export 'createUser' is not defined anywhere in the codebase");
    expect(errorMessages).not.toContain("Export 'UserModel' is not defined anywhere in the codebase");
  });
});