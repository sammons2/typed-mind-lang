import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-25-import-duplicate-names', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-25-import-duplicate-names.tmd';

  it('should validate import duplicate names', () => {
    const filePath = join(__dirname, '..', 'scenarios', scenarioFile);
    const content = readFileSync(filePath, 'utf-8');
    const result = checker.check(content, filePath);
    
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(4);
    
    // Should detect orphaned AuthFile
    const authFileOrphanError = result.errors.find(err => 
      err.message === "Orphaned entity 'AuthFile'"
    );
    expect(authFileOrphanError).toBeDefined();
    expect(authFileOrphanError?.position.line).toBe(2);
    expect(authFileOrphanError?.severity).toBe('error');
    
    // Should detect orphaned AuthDuplicateFile
    const authDuplicateOrphanError = result.errors.find(err => 
      err.message === "Orphaned entity 'AuthDuplicateFile'"
    );
    expect(authDuplicateOrphanError).toBeDefined();
    expect(authDuplicateOrphanError?.position.line).toBe(2);
    
    // Should detect AuthService exported by multiple files
    const multipleExportsError = result.errors.find(err => 
      err.message === "Entity 'AuthService' is exported by multiple files: AuthFile, AuthDuplicateFile"
    );
    expect(multipleExportsError).toBeDefined();
    expect(multipleExportsError?.severity).toBe('error');
    expect(multipleExportsError?.suggestion).toBe('Each entity should be exported by exactly one file. Remove the duplicate exports.');
    
    // Should detect duplicate entity name from import
    const duplicateNameError = result.errors.find(err => 
      err.message === "Duplicate entity name 'AuthService' from import"
    );
    expect(duplicateNameError).toBeDefined();
    expect(duplicateNameError?.position.line).toBe(3);
    expect(duplicateNameError?.suggestion).toBe('Use an alias to avoid naming conflicts');
  });
});