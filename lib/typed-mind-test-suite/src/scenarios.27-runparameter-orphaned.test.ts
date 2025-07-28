import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-27-runparameter-orphaned', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-27-runparameter-orphaned.tmd';

  it('should detect orphaned RunParameters', () => {
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
    
    // Should have 2 orphaned RunParameter errors
    const orphanedErrors = output.errors.filter(e => 
      e.message.includes('Orphaned entity') && 
      (e.message.includes('UNUSED_PARAM') || e.message.includes('SECRET_KEY'))
    );
    expect(orphanedErrors).toHaveLength(2);
    
    expect(output).toMatchSnapshot();
  });
});