import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DSLParser } from '../../typed-mind/src/parser';
import { DSLValidator } from '../../typed-mind/src/validator';

describe('scenario-38-dependency-validation', () => {
  it('should validate dependency entities', () => {
    const scenarioPath = join(__dirname, '../scenarios/scenario-38-dependency-validation.tmd');
    const content = readFileSync(scenarioPath, 'utf-8');
    
    const parser = new DSLParser();
    const parseResult = parser.parse(content);
    
    const validator = new DSLValidator();
    const validationResult = validator.validate(parseResult.entities);
    
    const output = {
      file: 'scenario-38-dependency-validation.tmd',
      valid: validationResult.valid,
      errors: validationResult.errors
    };
    
    expect(output).toMatchSnapshot();
  });
});