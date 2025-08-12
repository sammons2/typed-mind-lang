import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Scenario 47: Function Mixed Dependencies', () => {
  it('should properly distribute mixed dependency types from <- [...] syntax', () => {
    const scenarioPath = join(__dirname, '../scenarios/scenario-47-function-mixed-dependencies.tmd');
    const content = readFileSync(scenarioPath, 'utf-8');
    
    const checker = new DSLChecker();
    const result = checker.check(content);
    
    // Should be valid - all dependencies are properly distributed
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    
    // Verify the parser correctly distributed the dependencies
    // Note: We can't directly test the internal distribution here,
    // but we can verify no errors were generated
    
    // Test that the validator doesn't complain about any of the dependencies
    const errorMessages = result.errors.map(e => e.message);
    
    // Should not have any "not found" errors
    expect(errorMessages.filter(m => m.includes('not found'))).toHaveLength(0);
    
    // Should not have any type mismatch errors
    expect(errorMessages.filter(m => m.includes('Cannot call method'))).toHaveLength(0);
    expect(errorMessages.filter(m => m.includes('Cannot use'))).toHaveLength(0);
  });
  
  it('should detect when mixed dependencies include undefined entities', () => {
    const content = `
# Test undefined entities in mixed dependencies
TestApp -> MainFile v1.0.0

MainFile @ src/main.ts:
  -> [testFunction]

testFunction :: () => void
  <- [UndefinedUI, MissingAsset, NonExistentDTO, unknownFunction, missingDep, NoSuchConfig]
`;
    
    const checker = new DSLChecker();
    const result = checker.check(content);
    
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(6); // One error for each undefined entity
    
    // Should have errors for all undefined entities
    const errorMessages = result.errors.map(e => e.message);
    
    expect(errorMessages.some(m => m.includes("'UndefinedUI' not found"))).toBe(true);
    expect(errorMessages.some(m => m.includes("'MissingAsset' not found"))).toBe(true);
    expect(errorMessages.some(m => m.includes("'NonExistentDTO' not found"))).toBe(true);
    expect(errorMessages.some(m => m.includes("'unknownFunction' not found"))).toBe(true);
    expect(errorMessages.some(m => m.includes("'missingDep' not found"))).toBe(true);
    expect(errorMessages.some(m => m.includes("'NoSuchConfig' not found"))).toBe(true);
    
    // Verify all errors have proper severity and line numbers
    const errors = result.errors;
    for (const error of errors) {
      expect(error.severity).toBe('error');
      expect(error.position.line).toBe(8); // Line where testFunction is defined in the inline content (relative to content start)
    }
  });
});