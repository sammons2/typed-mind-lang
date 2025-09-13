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
    
    // Should have exactly 3 errors (1 no program + 1 orphaned file + 1 orphaned entity)
    expect(result.errors).toHaveLength(3);

    // Should have an orphaned file error for MainFile
    const orphanedFileError = result.errors.find(err =>
      err.message === "Orphaned file 'MainFile' - none of its exports are imported"
    );
    expect(orphanedFileError).toBeDefined();
    expect(orphanedFileError!.position.line).toBe(3);
    expect(orphanedFileError!.position.column).toBe(1);
    expect(orphanedFileError!.severity).toBe('error');
    expect(orphanedFileError!.suggestion).toBe('Remove this file or import its exports somewhere');

    // Should have an orphaned entity error for doSomething
    const orphanedEntityError = result.errors.find(err =>
      err.message === "Orphaned entity 'doSomething'"
    );
    expect(orphanedEntityError).toBeDefined();
    expect(orphanedEntityError!.position.line).toBe(6);
    expect(orphanedEntityError!.position.column).toBe(1);
    expect(orphanedEntityError!.severity).toBe('error');
    expect(orphanedEntityError!.suggestion).toBe('Remove or reference this entity');
    
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