import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-04-undefined-imports', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-04-undefined-imports.tmd';

  it('should detect undefined imports and report errors', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Validation should fail due to undefined imports
    expect(result.valid).toBe(false);
    
    // Should have exactly 3 errors for the undefined imports
    expect(result.errors).toHaveLength(3);
    
    // Check first error - NonExistentService import
    expect(result.errors[0]).toEqual({
      position: { line: 3, column: 1 },
      message: "Import 'NonExistentService' not found",
      severity: 'error',
      suggestion: undefined
    });
    
    // Check second error - MissingModule import
    expect(result.errors[1]).toEqual({
      position: { line: 3, column: 1 },
      message: "Import 'MissingModule' not found", 
      severity: 'error',
      suggestion: undefined
    });
    
    // Check third error - UndefinedEntity import
    expect(result.errors[2]).toEqual({
      position: { line: 8, column: 1 },
      message: "Import 'UndefinedEntity' not found",
      severity: 'error',
      suggestion: undefined
    });
    
    // Verify all errors are about undefined imports
    const importErrors = result.errors.filter(err => err.message.includes('not found'));
    expect(importErrors).toHaveLength(3);
    
    // Verify the specific undefined entity names are mentioned
    const errorMessages = result.errors.map(err => err.message);
    expect(errorMessages).toContain("Import 'NonExistentService' not found");
    expect(errorMessages).toContain("Import 'MissingModule' not found");
    expect(errorMessages).toContain("Import 'UndefinedEntity' not found");
  });
});