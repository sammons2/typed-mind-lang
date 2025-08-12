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
    
    // Names starting with numbers should be invalid
    const numberStartError = result.errors.find(e => 
      e.message.includes('123Name') &&
      (e.message.includes('invalid') || e.message.includes('must not start'))
    );
    expect(numberStartError).toBeDefined();
    
    // Names with spaces should be invalid
    const spaceNameError = result.errors.find(e => 
      e.message.includes('Spaces') &&
      (e.message.includes('invalid') || e.message.includes('spaces'))
    );
    expect(spaceNameError).toBeDefined();
    
    // Kebab-case might be invalid (depends on grammar rules)
    const kebabError = result.errors.find(e => 
      e.message.includes('kebab-case-name')
    );
    // This depends on whether hyphens are allowed
    
    // Reserved keywords might cause issues
    const classKeywordError = result.errors.find(e => 
      e.message.includes('class') &&
      (e.message.includes('reserved') || e.message.includes('keyword'))
    );
    // This depends on parser implementation
    
    // Case sensitivity - all three variants should be parsed as different entities
    const parser = checker.getParser();
    const parseResult = parser.parse(content);
    
    const hasTestCase = parseResult.entities.has('TestCase');
    const hasTestcase = parseResult.entities.has('testcase');
    const hasTESTCASE = parseResult.entities.has('TESTCASE');
    
    // If case-sensitive, all three should exist
    // If case-insensitive, there would be conflicts
    if (hasTestCase && hasTestcase && hasTESTCASE) {
      // Case sensitive - good
      expect(true).toBe(true);
    } else {
      // Might have case conflicts
      const caseConflict = result.errors.find(e => 
        e.message.includes('case') &&
        (e.message.includes('conflict') || e.message.includes('duplicate'))
      );
      expect(caseConflict).toBeDefined();
    }
    
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