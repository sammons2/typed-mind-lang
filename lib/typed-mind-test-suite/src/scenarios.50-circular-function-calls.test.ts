import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Scenario 50: Circular Function Calls', () => {
  it('should detect circular function call dependencies', () => {
    const scenarioPath = join(__dirname, '../scenarios/scenario-50-circular-function-calls.tmd');
    const content = readFileSync(scenarioPath, 'utf-8');
    
    const checker = new DSLChecker();
    const result = checker.check(content);
    
    // Should have errors for circular dependencies
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    
    // Should detect A->B->A circular dependency
    const circularErrors = result.errors.filter(e => 
      e.message.includes('Circular dependency detected')
    );
    expect(circularErrors.length).toBeGreaterThan(0);
    
    // Check for specific circular patterns
    const abCircular = result.errors.find(e => 
      e.message.includes('funcA') && 
      e.message.includes('funcB') &&
      e.message.includes('Circular')
    );
    expect(abCircular).toBeDefined();
    
    // Check for three-way circular dependency
    const threeWayCircular = result.errors.find(e => 
      (e.message.includes('funcC') || 
       e.message.includes('funcD') || 
       e.message.includes('funcE')) &&
      e.message.includes('Circular')
    );
    expect(threeWayCircular).toBeDefined();
    
    // Self-calling function should be detected
    const selfCircular = result.errors.find(e => 
      e.message.includes('recursiveFunc') &&
      e.message.includes('Circular')
    );
    expect(selfCircular).toBeDefined();
    
    // Deep chain without circular should NOT have errors
    const deepChainError = result.errors.find(e => 
      e.message.includes('chainStart') ||
      e.message.includes('chainMiddle') ||
      e.message.includes('chainEnd')
    );
    // Might have other errors but not circular
    if (deepChainError) {
      expect(deepChainError.message).not.toContain('Circular');
    }
  });
});