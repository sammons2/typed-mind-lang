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
    
    // Should have exactly 2 errors (1 orphaned entity + 1 circular import)
    expect(result.errors).toHaveLength(2);
    
    // Check for circular import error
    const circularImportError = result.errors.find(err => err.message.includes('Circular import detected'));
    expect(circularImportError).toBeDefined();
    expect(circularImportError?.position.line).toBe(2);
    expect(circularImportError?.position.column).toBe(1);
    expect(circularImportError?.severity).toBe('error');
    expect(circularImportError?.suggestion).toBeUndefined();
    expect(circularImportError?.message).toMatch(/module-a\.tmd -> .*module-b\.tmd -> .*module-a\.tmd/);
    
    // Check for start orphaned entity error
    const startError = result.errors.find(err => err.message.includes("Orphaned entity 'start'"));
    expect(startError).toBeDefined();
    expect(startError?.position.line).toBe(10);
    expect(startError?.position.column).toBe(1);
    expect(startError?.severity).toBe('error');
    expect(startError?.suggestion).toBe('Remove or reference this entity');
  });
});