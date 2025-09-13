import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Scenario 54: Entity Name Boundaries', () => {
  it('should validate entity naming rules and boundaries', () => {
    const scenarioPath = join(__dirname, '../scenarios/scenario-54-entity-name-boundaries.tmd');
    const content = readFileSync(scenarioPath, 'utf-8');
    
    const checker = new DSLChecker();
    const result = checker.check(content);
    
    // Should have errors for invalid names
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    
    // Names starting with numbers are parsed but become orphaned entities
    const numberStartError = result.errors.find(e =>
      e.message.includes('123Name') &&
      e.message.includes('Orphaned')
    );
    expect(numberStartError).toBeDefined();

    // Names with special cases get parsed but may cause orphaned entity errors
    const errorMessages = result.errors.map(e => e.message);

    // Check that various entity names are detected as orphaned (this shows they were parsed)
    expect(errorMessages.some(msg => msg.includes('123Name'))).toBe(true);
    
    // Check for various naming boundary conditions in the errors
    // Most entities become orphaned, which confirms they were parsed
    
    // Case sensitivity - all three variants should be parsed as different entities
    const parseResult = checker.parse(content);

    const hasTestCase = parseResult.entities.has('TestCase');
    const hasTestcase = parseResult.entities.has('testcase');
    const hasTESTCASE = parseResult.entities.has('TESTCASE');

    // TypedMind should be case-sensitive, so all three variants should exist
    expect(hasTestCase).toBe(true);
    expect(hasTestcase).toBe(true);
    expect(hasTESTCASE).toBe(true);
    
    // Valid names should not have errors
    const validNameError = result.errors.find(e => 
      e.message.includes('ValidName') &&
      !e.message.includes('Orphaned')
    );
    expect(validNameError).toBeUndefined();
    
    // Long names should be valid (no arbitrary length limit)
    const longNameError = result.errors.find(e => 
      e.message.includes('VeryLongEntityName') &&
      e.message.includes('too long')
    );
    expect(longNameError).toBeUndefined();
  });
});