import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-24-import-not-found', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-24-import-not-found.tmd';

  it('should detect import file not found errors', () => {
    const filePath = join(__dirname, '..', 'scenarios', scenarioFile);
    const content = readFileSync(filePath, 'utf-8');
    const result = checker.check(content, filePath);
    
    // Should be invalid due to import file not found
    expect(result.valid).toBe(false);
    
    // Should have exactly 2 errors (1 failed import + 1 orphaned entity)
    expect(result.errors).toHaveLength(2);

    // Check for import file not found error
    const importError = result.errors.find(err => err.message.includes('Failed to import'));
    expect(importError).toBeDefined();
    expect(importError?.message).toMatch(/Failed to import '\.\/non-existent-file\.tmd'/);
    expect(importError?.message).toMatch(/ENOENT: no such file or directory/);
    expect(importError?.position.line).toBe(2);
    expect(importError?.position.column).toBe(1);
    expect(importError?.severity).toBe('error');

    // Check for orphaned entity error
    const orphanedError = result.errors.find(err => err.message.includes("Orphaned entity 'main'"));
    expect(orphanedError).toBeDefined();
    expect(orphanedError?.position.line).toBe(9);
    expect(orphanedError?.position.column).toBe(1);
    expect(orphanedError?.severity).toBe('error');
    expect(orphanedError?.suggestion).toBe('Remove or reference this entity');
  });
});