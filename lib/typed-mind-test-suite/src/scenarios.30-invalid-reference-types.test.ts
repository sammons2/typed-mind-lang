import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLParser } from '@sammons/typed-mind';
import { DSLValidator } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-30-invalid-reference-types', () => {
  const scenarioFile = 'scenario-30-invalid-reference-types.tmd';

  it('should validate reference types', () => {
    const filePath = join(__dirname, '..', 'scenarios', scenarioFile);
    const content = readFileSync(filePath, 'utf-8');
    
    const parser = new DSLParser();
    const validator = new DSLValidator();
    
    const parseResult = parser.parse(content);
    const validationResult = validator.validate(parseResult.entities);
    
    // This test is now checking that valid references work correctly
    // The invalid reference type checking is enforced during populateReferencedBy
    
    // Create snapshot for validation
    const output = {
      file: scenarioFile,
      valid: validationResult.valid,
      errors: validationResult.errors.map(err => ({
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