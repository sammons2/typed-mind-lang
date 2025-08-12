import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Scenario 51: UIComponent Circular Containment', () => {
  it('should detect circular UIComponent containment', () => {
    const scenarioPath = join(__dirname, '../scenarios/scenario-51-uicomponent-circular-containment.tmd');
    const content = readFileSync(scenarioPath, 'utf-8');
    
    const checker = new DSLChecker();
    const result = checker.check(content);
    
    // Should have errors for circular containment
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    
    // Root component with parent should error
    const rootParentError = result.errors.find(e => 
      e.message.includes('InvalidRoot') && 
      e.message.includes('root') &&
      (e.message.includes('parent') || e.message.includes('contained'))
    );
    expect(rootParentError).toBeDefined();
    
    // Self-containing component should error
    const selfContainError = result.errors.find(e => 
      e.message.includes('SelfContainer') &&
      (e.message.includes('itself') || e.message.includes('circular'))
    );
    expect(selfContainError).toBeDefined();
    
    // Direct circular containment (A contains B, B contains A)
    const directCircularError = result.errors.find(e => 
      (e.message.includes('CircularA') || e.message.includes('CircularB')) &&
      e.message.includes('circular')
    );
    expect(directCircularError).toBeDefined();
    
    // Three-way circular containment
    const threeWayError = result.errors.find(e => 
      (e.message.includes('ThreeWayA') || 
       e.message.includes('ThreeWayB') || 
       e.message.includes('ThreeWayC')) &&
      e.message.includes('circular')
    );
    expect(threeWayError).toBeDefined();
    
    // Complex circular patterns
    const complexCircularError = result.errors.find(e => 
      (e.message.includes('ComplexCircle1') || 
       e.message.includes('ComplexCircle2')) &&
      e.message.includes('circular')
    );
    expect(complexCircularError).toBeDefined();
    
    // Valid components should not have errors
    const validRootError = result.errors.find(e => 
      e.message.includes('ValidRoot') && 
      !e.message.includes('InvalidRoot')
    );
    expect(validRootError).toBeUndefined();
  });
});