import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-37-data-pipeline', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-37-data-pipeline.tmd';

  it('should validate data pipeline ETL architecture', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
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
    
    expect(output).toMatchSnapshot();
  });
});