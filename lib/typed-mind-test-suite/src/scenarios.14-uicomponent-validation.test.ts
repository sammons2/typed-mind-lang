import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-14-uicomponent-validation', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-14-uicomponent-validation.tmd';

  it('should validate UIComponent entities and their structure', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Should be invalid due to orphaned entities and missing containment
    expect(result.valid).toBe(false);
    
    // Should have exactly 5 errors (including orphaned entity)
    expect(result.errors).toHaveLength(5);
    
    // Check for orphaned ComponentsFile error
    const orphanedComponentsFileError = result.errors.find(err =>
      err.message === "Orphaned file 'ComponentsFile' - none of its exports are imported" &&
      err.position.line === 6 &&
      err.position.column === 1
    );
    expect(orphanedComponentsFileError).toBeDefined();
    expect(orphanedComponentsFileError?.severity).toBe('error');
    expect(orphanedComponentsFileError?.suggestion).toBe('Remove this file or import its exports somewhere');
    
    // Check for orphaned UnexportedComponent error
    const orphanedUnexportedComponentError = result.errors.find(err => 
      err.message === "Orphaned entity 'UnexportedComponent'" &&
      err.position.line === 36 &&
      err.position.column === 1
    );
    expect(orphanedUnexportedComponentError).toBeDefined();
    expect(orphanedUnexportedComponentError?.severity).toBe('error');
    expect(orphanedUnexportedComponentError?.suggestion).toBe('Remove or reference this entity');
    
    // Check for App component not contained error
    const appNotContainedError = result.errors.find(err => 
      err.message === "UIComponent 'App' is not contained by any other UIComponent" &&
      err.position.line === 10 &&
      err.position.column === 1
    );
    expect(appNotContainedError).toBeDefined();
    expect(appNotContainedError?.severity).toBe('error');
    expect(appNotContainedError?.suggestion).toBe("Either add 'App' to another UIComponent's contains list, or mark it as a root component with &!");
    
    // Check for UnexportedComponent not contained error
    const unexportedNotContainedError = result.errors.find(err => 
      err.message === "UIComponent 'UnexportedComponent' is not contained by any other UIComponent" &&
      err.position.line === 36 &&
      err.position.column === 1
    );
    expect(unexportedNotContainedError).toBeDefined();
    expect(unexportedNotContainedError?.severity).toBe('error');
    expect(unexportedNotContainedError?.suggestion).toBe("Either add 'UnexportedComponent' to another UIComponent's contains list, or mark it as a root component with &!");
    
    // All errors should be of severity 'error'
    expect(result.errors.every(err => err.severity === 'error')).toBe(true);
  });
});