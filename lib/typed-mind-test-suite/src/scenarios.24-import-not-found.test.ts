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
    
    // Should have exactly 1 error for the failed import
    expect(result.errors).toHaveLength(1);
    
    // Check for import file not found error
    const importError = result.errors[0];
    expect(importError.message).toMatch(/Failed to import '\.\/non-existent-file\.tmd'/);
    expect(importError.message).toMatch(/ENOENT: no such file or directory/);
    expect(importError.position.line).toBe(2);
    expect(importError.position.column).toBe(1);
    expect(importError.severity).toBe('error');
    expect(importError.suggestion).toBeUndefined();
  });
});