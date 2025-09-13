import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-04-undefined-imports', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-04-undefined-imports.tmd';

  it('should detect undefined imports and report errors', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Validation should fail due to undefined imports
    expect(result.valid).toBe(false);
    
    // Should have exactly 4 errors (3 undefined imports + 1 orphaned file)
    expect(result.errors).toHaveLength(4);

    // Check for orphaned file error
    const orphanedFileError = result.errors.find(err =>
      err.message.includes("Orphaned file 'ServiceA'")
    );
    expect(orphanedFileError).toBeDefined();
    expect(orphanedFileError?.position.line).toBe(8);
    expect(orphanedFileError?.position.column).toBe(1);

    // Check import errors (order may vary, so find them instead of assuming position)
    const nonExistentError = result.errors.find(err =>
      err.message === "Import 'NonExistentService' not found"
    );
    expect(nonExistentError).toBeDefined();
    expect(nonExistentError?.position.line).toBe(3);

    const missingModuleError = result.errors.find(err =>
      err.message === "Import 'MissingModule' not found"
    );
    expect(missingModuleError).toBeDefined();
    expect(missingModuleError?.position.line).toBe(3);

    const undefinedEntityError = result.errors.find(err =>
      err.message === "Import 'UndefinedEntity' not found"
    );
    expect(undefinedEntityError).toBeDefined();
    expect(undefinedEntityError?.position.line).toBe(8);
    
    // Verify all errors are about undefined imports
    const importErrors = result.errors.filter(err => err.message.includes('not found'));
    expect(importErrors).toHaveLength(3);
    
    // Verify the specific undefined entity names are mentioned
    const errorMessages = result.errors.map(err => err.message);
    expect(errorMessages).toContain("Import 'NonExistentService' not found");
    expect(errorMessages).toContain("Import 'MissingModule' not found");
    expect(errorMessages).toContain("Import 'UndefinedEntity' not found");
  });
});