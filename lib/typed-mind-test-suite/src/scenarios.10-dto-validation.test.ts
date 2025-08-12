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
    
    // Should have exactly 1 error
    expect(result.errors).toHaveLength(1);
    
    // Check the specific error about orphaned UserFile entity
    const orphanedError = result.errors[0];
    expect(orphanedError.position.line).toBe(19);
    expect(orphanedError.position.column).toBe(1);
    expect(orphanedError.message).toBe("Orphaned entity 'UserFile'");
    expect(orphanedError.severity).toBe('error');
    expect(orphanedError.suggestion).toBe('Remove or reference this entity');
  });
});