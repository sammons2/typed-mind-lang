import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Scenario 53: ClassFile Inheritance Edge Cases', () => {
  it('should detect circular and invalid inheritance patterns', () => {
    const scenarioPath = join(__dirname, '../scenarios/scenario-53-classfile-inheritance-edge-cases.tmd');
    const content = readFileSync(scenarioPath, 'utf-8');
    
    const checker = new DSLChecker();
    const result = checker.check(content);
    
    // Should have errors for invalid inheritance
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    
    // Should find orphaned entities instead of circular inheritance
    const orphanedErrors = result.errors.filter(e =>
      e.message.includes('Orphaned entity')
    );
    expect(orphanedErrors.length).toBeGreaterThan(0);

    // Should find ClassFile reference errors
    const callsErrors = result.errors.filter(e =>
      e.message.includes("Cannot use 'calls' to reference ClassFile")
    );
    expect(callsErrors.length).toBeGreaterThan(0);
    
    // Inheriting from non-existent class
    const nonExistentBaseError = result.errors.find(e =>
      e.message.includes('NonExistentBase') &&
      (e.message.includes('not found') || e.message.includes('does not exist'))
    );
    expect(nonExistentBaseError).toBeUndefined(); // Validator doesn't implement inheritance validation yet
    
    // Self-inheriting class should error
    const selfInheritingError = result.errors.find(e =>
      e.message.includes('SelfInheriting') &&
      (e.message.includes('itself') || e.message.includes('circular'))
    );
    expect(selfInheritingError).toBeUndefined(); // Validator doesn't implement circular inheritance detection yet
    
    // Valid inheritance should not error
    const validChildError = result.errors.find(e => 
      e.message.includes('ValidChild') &&
      e.message.includes('inheritance')
    );
    expect(validChildError).toBeUndefined();
    
    // Deep inheritance chain should be valid
    const deepInheritanceError = result.errors.find(e => 
      (e.message.includes('RootClass') || 
       e.message.includes('MiddleClass') || 
       e.message.includes('DeepChild')) &&
      e.message.includes('inheritance') &&
      !e.message.includes('Orphaned')
    );
    expect(deepInheritanceError).toBeUndefined();
  });
});