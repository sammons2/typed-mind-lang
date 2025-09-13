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
    
    // Should have exactly 4 errors (2 undefined exports + 2 orphaned entities)
    expect(result.errors).toHaveLength(4);

    // Check for orphaned entities
    const orphanedCreateUser = result.errors.find(err =>
      err.message === "Orphaned entity 'createUser'"
    );
    expect(orphanedCreateUser).toBeDefined();
    expect(orphanedCreateUser?.position.line).toBe(7);

    const orphanedUserModel = result.errors.find(err =>
      err.message === "Orphaned entity 'UserModel'"
    );
    expect(orphanedUserModel).toBeDefined();
    expect(orphanedUserModel?.position.line).toBe(9);

    // Check for undefined export errors
    const deleteUserError = result.errors.find(err =>
      err.message === "Export 'deleteUser' is not defined anywhere in the codebase"
    );
    expect(deleteUserError).toBeDefined();
    expect(deleteUserError?.position.line).toBe(3);
    expect(deleteUserError?.suggestion).toBe("Define 'deleteUser' as a Function, Class, Constants, Asset, or UIComponent entity");

    const updateUserError = result.errors.find(err =>
      err.message === "Export 'updateUser' is not defined anywhere in the codebase"
    );
    expect(updateUserError).toBeDefined();
    expect(updateUserError?.position.line).toBe(3);
    expect(updateUserError?.suggestion).toBe("Define 'updateUser' as a Function, Class, Constants, Asset, or UIComponent entity");
  });
});