import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-12-valid-complete', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-12-valid-complete.tmd';

  it('should detect orphaned file entities in complete program', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Currently invalid due to orphaned file entities
    expect(result.valid).toBe(false);
    
    // Should have exactly 3 errors for orphaned entities
    expect(result.errors).toHaveLength(3);
    
    // Sort errors by line number for consistent checking
    const sortedErrors = result.errors.sort((a, b) => a.position.line - b.position.line);
    
    // Check first error: Orphaned ControllerFile
    expect(sortedErrors[0].position.line).toBe(7);
    expect(sortedErrors[0].position.column).toBe(1);
    expect(sortedErrors[0].message).toBe("Orphaned entity 'ControllerFile'");
    expect(sortedErrors[0].severity).toBe('error');
    expect(sortedErrors[0].suggestion).toBe('Remove or reference this entity');
    
    // Check second error: Orphaned ModelFile
    expect(sortedErrors[1].position.line).toBe(11);
    expect(sortedErrors[1].position.column).toBe(1);
    expect(sortedErrors[1].message).toBe("Orphaned entity 'ModelFile'");
    expect(sortedErrors[1].severity).toBe('error');
    expect(sortedErrors[1].suggestion).toBe('Remove or reference this entity');
    
    // Check third error: Orphaned DatabaseFile
    expect(sortedErrors[2].position.line).toBe(15);
    expect(sortedErrors[2].position.column).toBe(1);
    expect(sortedErrors[2].message).toBe("Orphaned entity 'DatabaseFile'");
    expect(sortedErrors[2].severity).toBe('error');
    expect(sortedErrors[2].suggestion).toBe('Remove or reference this entity');
  });
});