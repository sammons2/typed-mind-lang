import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-20-basic-import', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-20-basic-import.tmd';

  it('should validate basic import functionality', () => {
    const filePath = join(__dirname, '..', 'scenarios', scenarioFile);
    const content = readFileSync(filePath, 'utf-8');
    const result = checker.check(content, filePath);
    
    // Should be invalid due to orphaned entity
    expect(result.valid).toBe(false);
    
    // Should have exactly 1 error for orphaned entity
    expect(result.errors).toHaveLength(1);
    
    // Check for AuthFile orphaned entity error
    const authFileError = result.errors[0];
    expect(authFileError.message).toBe("Orphaned entity 'AuthFile'");
    expect(authFileError.position.line).toBe(2);
    expect(authFileError.position.column).toBe(1);
    expect(authFileError.severity).toBe('error');
    expect(authFileError.suggestion).toBe('Remove or reference this entity');
  });
});