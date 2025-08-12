import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-23-circular-import', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-23-circular-import.tmd';

  it('should detect circular import errors', () => {
    const filePath = join(__dirname, '..', 'scenarios', scenarioFile);
    const content = readFileSync(filePath, 'utf-8');
    const result = checker.check(content, filePath);
    
    // Should be invalid due to circular import and orphaned entities
    expect(result.valid).toBe(false);
    
    // Should have exactly 3 errors (2 orphaned entities + 1 circular import)
    expect(result.errors).toHaveLength(3);
    
    // Check for circular import error
    const circularImportError = result.errors.find(err => err.message.includes('Circular import detected'));
    expect(circularImportError).toBeDefined();
    expect(circularImportError?.position.line).toBe(2);
    expect(circularImportError?.position.column).toBe(1);
    expect(circularImportError?.severity).toBe('error');
    expect(circularImportError?.suggestion).toBeUndefined();
    expect(circularImportError?.message).toMatch(/module-a\.tmd -> .*module-b\.tmd -> .*module-a\.tmd/);
    
    // Check for FileA orphaned entity error
    const fileAError = result.errors.find(err => err.message.includes("Orphaned entity 'FileA'"));
    expect(fileAError).toBeDefined();
    expect(fileAError?.position.line).toBe(4);
    expect(fileAError?.position.column).toBe(1);
    expect(fileAError?.severity).toBe('error');
    expect(fileAError?.suggestion).toBe('Remove or reference this entity');
    
    // Check for FileB orphaned entity error
    const fileBError = result.errors.find(err => err.message.includes("Orphaned entity 'FileB'"));
    expect(fileBError).toBeDefined();
    expect(fileBError?.position.line).toBe(4);
    expect(fileBError?.position.column).toBe(1);
    expect(fileBError?.severity).toBe('error');
    expect(fileBError?.suggestion).toBe('Remove or reference this entity');
  });
});