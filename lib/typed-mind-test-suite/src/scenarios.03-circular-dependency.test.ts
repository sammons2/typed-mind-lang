import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-03-circular-dependency', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-03-circular-dependency.tmd';

  it('should detect circular dependency between functions', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // The result should be invalid due to circular dependency
    expect(result.valid).toBe(false);
    
    // Should have exactly 1 error
    expect(result.errors).toHaveLength(1);
    
    const error = result.errors[0];
    
    // Check error properties
    expect(error.position.line).toBe(3);
    expect(error.position.column).toBe(1);
    expect(error.severity).toBe('error');
    expect(error.suggestion).toBeDefined();

    // Check that the error message describes the circular dependency
    expect(error.message).toBe('Circular import detected: ServiceA -> ServiceB -> ServiceC -> ServiceA');
  });
});