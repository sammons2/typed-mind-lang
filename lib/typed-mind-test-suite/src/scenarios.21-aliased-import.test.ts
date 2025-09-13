import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-21-aliased-import', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-21-aliased-import.tmd';

  it('should validate aliased imports and detect validation errors', () => {
    const filePath = join(__dirname, '..', 'scenarios', scenarioFile);
    const content = readFileSync(filePath, 'utf-8');
    const result = checker.check(content, filePath);
    
    // Should be invalid due to multiple validation errors
    expect(result.valid).toBe(false);
    
    // Should have many errors due to undefined entities and containment issues
    expect(result.errors.length).toBeGreaterThan(10);
    
    // Check for key orphaned entities
    const orphanedErrors = result.errors.filter(err => err.message.includes('Orphaned entity'));
    expect(orphanedErrors.length).toBeGreaterThan(0);
    
    // Should have orphaned ComponentsFile and DatabaseFile
    expect(result.errors.some(err => err.message.includes("Orphaned file 'UI.ComponentsFile'"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("Orphaned file 'DB.DatabaseFile'"))).toBe(true);
    
    // Check for undefined exports
    const exportErrors = result.errors.filter(err => err.message.includes('is not defined anywhere in the codebase'));
    expect(exportErrors.length).toBeGreaterThan(0);
    expect(result.errors.some(err => err.message.includes("Export 'Button' is not defined anywhere in the codebase"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("Export 'Form' is not defined anywhere in the codebase"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("Export 'Connection' is not defined anywhere in the codebase"))).toBe(true);
    
    // Check for containment validation errors
    expect(result.errors.some(err => err.message.includes("UIComponent 'UI.Input' is not contained by any other UIComponent"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("contains unknown component 'Input'"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("contains unknown component 'Button'"))).toBe(true);
    
    // Check for class export errors
    expect(result.errors.some(err => err.message.includes("Class 'DB.Connection' is not exported by any file"))).toBe(true);
    
    // All errors should be severity 'error'
    expect(result.errors.every(err => err.severity === 'error')).toBe(true);
  });
});