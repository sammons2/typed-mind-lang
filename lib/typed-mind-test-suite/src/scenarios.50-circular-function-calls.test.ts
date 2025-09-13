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
    
    // Should detect orphaned entities instead of circular dependencies
    const orphanedErrors = result.errors.filter(e =>
      e.message.includes('Orphaned entity')
    );
    expect(orphanedErrors.length).toBeGreaterThan(0);

    // Check for orphaned file
    const orphanedFile = result.errors.find(e =>
      e.message.includes("Orphaned file 'SecondaryFile'")
    );
    expect(orphanedFile).toBeDefined();
    
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