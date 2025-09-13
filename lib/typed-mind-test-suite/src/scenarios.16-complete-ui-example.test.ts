import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-16-complete-ui-example', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-16-complete-ui-example.tmd';

  it('should validate 16 complete ui example', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Should be invalid due to validation errors
    expect(result.valid).toBe(false);
    
    // Should have exactly 16 validation errors (including orphaned entities)
    expect(result.errors).toHaveLength(16);
    
    // Check for orphaned file entities
    const orphanedFileErrors = result.errors.filter(err =>
      err.message.includes('Orphaned file') &&
      (err.message.includes('ComponentsFile') ||
       err.message.includes('AssetsFile'))
    );
    expect(orphanedFileErrors).toHaveLength(2);
    
    // Check for method not found error on UserModel
    const methodNotFoundErrors = result.errors.filter(err => 
      err.message.includes("Method 'find' not found on class 'UserModel'")
    );
    expect(methodNotFoundErrors).toHaveLength(1);
    
    // Check for UIComponent containment errors
    const uiContainmentErrors = result.errors.filter(err =>
      err.message.includes('is not contained by any other UIComponent') &&
      (err.message.includes('App') || err.message.includes('LoginFormView'))
    );
    expect(uiContainmentErrors).toHaveLength(2);

    // Verify specific error messages exist
    expect(result.errors.some(err => err.message.includes("Orphaned file 'ComponentsFile'"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("Orphaned file 'AssetsFile'"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("Method 'find' not found on class 'UserModel'"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("UIComponent 'App' is not contained by any other UIComponent"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("UIComponent 'LoginFormView' is not contained by any other UIComponent"))).toBe(true);
  });
});