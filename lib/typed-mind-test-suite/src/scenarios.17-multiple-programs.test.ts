import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-17-multiple-programs', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-17-multiple-programs.tmd';

  it('should validate 17 multiple programs', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Should be invalid due to validation errors
    expect(result.valid).toBe(false);
    
    // Should have exactly 12 validation errors
    expect(result.errors).toHaveLength(12);
    
    // Check for entry point validation errors
    const entryPointErrors = result.errors.filter(err => 
      err.message.includes("Cannot use 'entry' to reference Asset 'IndexHTML'") ||
      err.message.includes("Program 'UIProgram' entry point 'IndexHTML' must be a File entity")
    );
    expect(entryPointErrors).toHaveLength(2);
    
    // Check for orphaned UIComponent entities
    const orphanedUIErrors = result.errors.filter(err => 
      err.message.includes('Orphaned entity') && 
      (err.message.includes('AppContainer') || 
       err.message.includes('Sidebar') || 
       err.message.includes('GraphCanvas') || 
       err.message.includes('DetailsPanel') || 
       err.message.includes('ErrorPanel'))
    );
    expect(orphanedUIErrors).toHaveLength(5);
    
    // Check for UIComponent containment errors
    const uiContainmentErrors = result.errors.filter(err => 
      err.message.includes('is not contained by any other UIComponent')
    );
    expect(uiContainmentErrors).toHaveLength(5);
    
    // Verify specific error messages exist
    expect(result.errors.some(err => err.message.includes("Cannot use 'entry' to reference Asset 'IndexHTML'"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("Program 'UIProgram' entry point 'IndexHTML' must be a File entity"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("Orphaned entity 'AppContainer'"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("Orphaned entity 'Sidebar'"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("Orphaned entity 'GraphCanvas'"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("Orphaned entity 'DetailsPanel'"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("Orphaned entity 'ErrorPanel'"))).toBe(true);
    
    // Verify UIComponent containment errors for each component
    expect(result.errors.some(err => err.message.includes("UIComponent 'AppContainer' is not contained by any other UIComponent"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("UIComponent 'Sidebar' is not contained by any other UIComponent"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("UIComponent 'GraphCanvas' is not contained by any other UIComponent"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("UIComponent 'DetailsPanel' is not contained by any other UIComponent"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("UIComponent 'ErrorPanel' is not contained by any other UIComponent"))).toBe(true);
  });
});