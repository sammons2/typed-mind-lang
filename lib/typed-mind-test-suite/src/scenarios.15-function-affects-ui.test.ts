import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-15-function-affects-ui', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-15-function-affects-ui.tmd';

  it('should validate function affects UI relationships', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Should be invalid due to multiple validation errors
    expect(result.valid).toBe(false);
    
    // Should have exactly 9 errors
    expect(result.errors).toHaveLength(9);
    
    // Check for invalid 'calls' to UIComponent error
    const invalidCallsError = result.errors.find(err => 
      err.message === "Cannot use 'calls' to reference UIComponent 'TodoList'" &&
      err.position.line === 14 &&
      err.position.column === 1
    );
    expect(invalidCallsError).toBeDefined();
    expect(invalidCallsError?.severity).toBe('error');
    expect(invalidCallsError?.suggestion).toBe("'calls' can only reference: Function, Class");
    
    // Check for invalid 'affects' to Function error
    const invalidAffectsError = result.errors.find(err => 
      err.message === "Cannot use 'affects' to reference Function 'updateTodoList'" &&
      err.position.line === 26 &&
      err.position.column === 1
    );
    expect(invalidAffectsError).toBeDefined();
    expect(invalidAffectsError?.severity).toBe('error');
    expect(invalidAffectsError?.suggestion).toBe("'affects' can only reference: UIComponent");
    
    // Check for orphaned refreshUI entity error
    const orphanedRefreshUIError = result.errors.find(err => 
      err.message === "Orphaned entity 'refreshUI'" &&
      err.position.line === 22 &&
      err.position.column === 1
    );
    expect(orphanedRefreshUIError).toBeDefined();
    expect(orphanedRefreshUIError?.severity).toBe('error');
    expect(orphanedRefreshUIError?.suggestion).toBe('Remove or reference this entity');
    
    // Check for orphaned invalidAffect entity error
    const orphanedInvalidAffectError = result.errors.find(err => 
      err.message === "Orphaned entity 'invalidAffect'" &&
      err.position.line === 26 &&
      err.position.column === 1
    );
    expect(orphanedInvalidAffectError).toBeDefined();
    expect(orphanedInvalidAffectError?.severity).toBe('error');
    expect(orphanedInvalidAffectError?.suggestion).toBe('Remove or reference this entity');
    
    // Check for refreshUI not exported error
    const refreshUINotExportedError = result.errors.find(err => 
      err.message === "Function 'refreshUI' is not exported by any file and is not a class method" &&
      err.position.line === 22 &&
      err.position.column === 1
    );
    expect(refreshUINotExportedError).toBeDefined();
    expect(refreshUINotExportedError?.severity).toBe('error');
    expect(refreshUINotExportedError?.suggestion).toBe("Either add 'refreshUI' to the exports of a file entity or define it as a method of a class");
    
    // Check for invalidAffect not exported error
    const invalidAffectNotExportedError = result.errors.find(err => 
      err.message === "Function 'invalidAffect' is not exported by any file and is not a class method" &&
      err.position.line === 26 &&
      err.position.column === 1
    );
    expect(invalidAffectNotExportedError).toBeDefined();
    expect(invalidAffectNotExportedError?.severity).toBe('error');
    expect(invalidAffectNotExportedError?.suggestion).toBe("Either add 'invalidAffect' to the exports of a file entity or define it as a method of a class");
    
    // Check for refreshUI affects unknown component error
    const refreshUIUnknownComponentError = result.errors.find(err => 
      err.message === "Function 'refreshUI' affects unknown component 'NonExistentComponent'" &&
      err.position.line === 22 &&
      err.position.column === 1
    );
    expect(refreshUIUnknownComponentError).toBeDefined();
    expect(refreshUIUnknownComponentError?.severity).toBe('error');
    expect(refreshUIUnknownComponentError?.suggestion).toBe("Define 'NonExistentComponent' as a UIComponent");
    
    // Check for invalidAffect cannot affect Function error
    const invalidAffectCannotAffectError = result.errors.find(err => 
      err.message === "Function 'invalidAffect' cannot affect 'updateTodoList' (it's a Function)" &&
      err.position.line === 26 &&
      err.position.column === 1
    );
    expect(invalidAffectCannotAffectError).toBeDefined();
    expect(invalidAffectCannotAffectError?.severity).toBe('error');
    expect(invalidAffectCannotAffectError?.suggestion).toBe('Functions can only affect UIComponents');
    
    // Check for TodoList not contained error
    const todoListNotContainedError = result.errors.find(err => 
      err.message === "UIComponent 'TodoList' is not contained by any other UIComponent" &&
      err.position.line === 7 &&
      err.position.column === 1
    );
    expect(todoListNotContainedError).toBeDefined();
    expect(todoListNotContainedError?.severity).toBe('error');
    expect(todoListNotContainedError?.suggestion).toBe("Either add 'TodoList' to another UIComponent's contains list, or mark it as a root component with &!");
    
    // All errors should be of severity 'error'
    expect(result.errors.every(err => err.severity === 'error')).toBe(true);
  });
});