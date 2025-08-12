import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-09-no-program', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-09-no-program.tmd';

  it('should validate 09 no program', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Should be invalid due to missing program entry point
    expect(result.valid).toBe(false);
    
    // Should have exactly 2 errors
    expect(result.errors).toHaveLength(2);
    
    // Should have an orphaned entity error for MainFile
    const orphanedError = result.errors.find(err => 
      err.message === "Orphaned entity 'MainFile'"
    );
    expect(orphanedError).toBeDefined();
    expect(orphanedError!.position.line).toBe(3);
    expect(orphanedError!.position.column).toBe(1);
    expect(orphanedError!.severity).toBe('error');
    expect(orphanedError!.suggestion).toBe('Remove or reference this entity');
    
    // Should have a no program entry point error
    const noProgramError = result.errors.find(err => 
      err.message === 'No program entry point defined'
    );
    expect(noProgramError).toBeDefined();
    expect(noProgramError!.position.line).toBe(1);
    expect(noProgramError!.position.column).toBe(1);
    expect(noProgramError!.severity).toBe('error');
    expect(noProgramError!.suggestion).toBe('Add a Program entity: AppName -> EntryFile');
  });
});