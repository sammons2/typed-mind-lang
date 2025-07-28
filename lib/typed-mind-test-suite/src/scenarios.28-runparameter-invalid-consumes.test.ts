import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-28-runparameter-invalid-consumes', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-28-runparameter-invalid-consumes.tmd';

  it('should detect invalid RunParameter consumption', () => {
    const filePath = join(__dirname, '..', 'scenarios', scenarioFile);
    const content = readFileSync(filePath, 'utf-8');
    const result = checker.check(content, filePath);
    
    // Create a clean output for snapshots
    const output = {
      file: scenarioFile,
      valid: result.valid,
      errors: result.errors.map(err => ({
        line: err.position.line,
        column: err.position.column,
        message: err.message,
        severity: err.severity,
        suggestion: err.suggestion
      }))
    };
    
    expect(output.valid).toBe(false);
    
    // Should have error for consuming non-existent parameter
    const nonExistentErrors = output.errors.filter(e => 
      e.message.includes("consumes unknown parameter 'NON_EXISTENT_PARAM'")
    );
    expect(nonExistentErrors).toHaveLength(1);
    
    // Should have error for consuming non-RunParameter entity
    const wrongTypeErrors = output.errors.filter(e => 
      e.message.includes("cannot consume 'APP_CONFIG'") &&
      e.message.includes("it's a Constants")
    );
    expect(wrongTypeErrors).toHaveLength(1);
    
    expect(output).toMatchSnapshot();
  });
});