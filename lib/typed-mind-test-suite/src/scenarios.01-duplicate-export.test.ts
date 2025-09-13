import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-01-duplicate-export', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-01-duplicate-export.tmd';

  it('should validate 01 duplicate export', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Validate that the file is invalid due to errors
    expect(result.valid).toBe(false);
    
    // Should have exactly 5 errors
    expect(result.errors).toHaveLength(5);
    
    // Check for the main duplicate export error
    const duplicateExportError = result.errors.find(err => 
      err.message.includes("Entity 'UserService' is exported by multiple files: MainFile, SecondFile")
    );
    expect(duplicateExportError).toBeDefined();
    expect(duplicateExportError?.position.line).toBe(3);
    expect(duplicateExportError?.position.column).toBe(1);
    expect(duplicateExportError?.severity).toBe('error');
    expect(duplicateExportError?.suggestion).toBe('Each entity should be exported by exactly one file. Remove the duplicate exports.');
    
    // Check for orphaned SecondFile error
    const orphanedSecondFileError = result.errors.find(err =>
      err.message === "Orphaned file 'SecondFile' - none of its exports are imported"
    );
    expect(orphanedSecondFileError).toBeDefined();
    expect(orphanedSecondFileError?.position.line).toBe(6);
    expect(orphanedSecondFileError?.position.column).toBe(1);
    expect(orphanedSecondFileError?.severity).toBe('error');
    expect(orphanedSecondFileError?.suggestion).toBe('Remove this file or import its exports somewhere');

    // Check for orphaned UserService error
    const orphanedUserServiceError = result.errors.find(err =>
      err.message === "Orphaned entity 'UserService'"
    );
    expect(orphanedUserServiceError).toBeDefined();
    expect(orphanedUserServiceError?.position.line).toBe(10);
    expect(orphanedUserServiceError?.position.column).toBe(1);
    expect(orphanedUserServiceError?.severity).toBe('error');
    expect(orphanedUserServiceError?.suggestion).toBe('Remove or reference this entity');
    
    // Check for orphaned BaseService error
    const orphanedBaseServiceError = result.errors.find(err => 
      err.message === "Orphaned entity 'BaseService'"
    );
    expect(orphanedBaseServiceError).toBeDefined();
    expect(orphanedBaseServiceError?.position.line).toBe(13);
    expect(orphanedBaseServiceError?.position.column).toBe(1);
    expect(orphanedBaseServiceError?.severity).toBe('error');
    expect(orphanedBaseServiceError?.suggestion).toBe('Remove or reference this entity');
    
    // Check for BaseService not exported error
    const baseServiceNotExportedError = result.errors.find(err => 
      err.message === "Class 'BaseService' is not exported by any file"
    );
    expect(baseServiceNotExportedError).toBeDefined();
    expect(baseServiceNotExportedError?.position.line).toBe(13);
    expect(baseServiceNotExportedError?.position.column).toBe(1);
    expect(baseServiceNotExportedError?.severity).toBe('error');
    expect(baseServiceNotExportedError?.suggestion).toBe("Add 'BaseService' to the exports of a file entity or convert to ClassFile with #: operator");
    
    // Ensure all errors are error-level severity
    result.errors.forEach(error => {
      expect(error.severity).toBe('error');
    });
  });
});