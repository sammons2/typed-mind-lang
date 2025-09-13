import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-10-dto-validation', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-10-dto-validation.tmd';

  it('should validate DTO structure and detect validation errors', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Should be invalid due to validation errors
    expect(result.valid).toBe(false);
    
    // Should have exactly 6 errors (2 orphaned + 4 validation)
    expect(result.errors).toHaveLength(6);

    // Check for orphaned entities
    const orphanedCreateUser = result.errors.find(err =>
      err.message === "Orphaned entity 'createUser'"
    );
    expect(orphanedCreateUser).toBeDefined();
    expect(orphanedCreateUser?.position.line).toBe(6);

    const orphanedUpdateUser = result.errors.find(err =>
      err.message === "Orphaned entity 'updateUser'"
    );
    expect(orphanedUpdateUser).toBeDefined();
    expect(orphanedUpdateUser?.position.line).toBe(10);

    // Check for validation errors
    const cannotUseInputError = result.errors.find(err =>
      err.message === "Cannot use 'input' to reference File 'UserFile'"
    );
    expect(cannotUseInputError).toBeDefined();
    expect(cannotUseInputError?.position.line).toBe(10);
    expect(cannotUseInputError?.suggestion).toBe("'input' can only reference: DTO");

    const nonExistentDTOError = result.errors.find(err =>
      err.message === "Function input DTO 'NonExistentDTO' not found"
    );
    expect(nonExistentDTOError).toBeDefined();
    expect(nonExistentDTOError?.position.line).toBe(6);

    const userFileNotDTOError = result.errors.find(err =>
      err.message === "Function input 'UserFile' is not a DTO (it's a File)"
    );
    expect(userFileNotDTOError).toBeDefined();
    expect(userFileNotDTOError?.position.line).toBe(10);

    const notADTOError = result.errors.find(err =>
      err.message === "Function output DTO 'NotADTO' not found"
    );
    expect(notADTOError).toBeDefined();
    expect(notADTOError?.position.line).toBe(10);
  });
});