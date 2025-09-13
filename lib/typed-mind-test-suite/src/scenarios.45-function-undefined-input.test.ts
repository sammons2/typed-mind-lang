import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Scenario 45: Function Undefined Input/Output DTOs', () => {
  it('should detect functions with undefined input/output DTOs', () => {
    const scenarioPath = join(__dirname, '../scenarios/scenario-45-function-undefined-input.tmd');
    const content = readFileSync(scenarioPath, 'utf-8');
    
    const checker = new DSLChecker();
    const result = checker.check(content);
    
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(7);
    
    // Check specific errors
    const errors = result.errors;
    
    // Should find undefined UserInput
    const userInputError = errors.find(e => e.message.includes("UserInput"));
    expect(userInputError).toBeDefined();
    expect(userInputError?.message).toContain("Function input DTO 'UserInput' not found");
    expect(userInputError?.severity).toBe('error');
    expect(userInputError?.position.line).toBe(8); // Line where processUser function is defined
    
    // Should find undefined ValidationResult
    const validationResultError = errors.find(e => e.message.includes("ValidationResult"));
    expect(validationResultError).toBeDefined();
    expect(validationResultError?.message).toContain("Function output DTO 'ValidationResult' not found");
    expect(validationResultError?.severity).toBe('error');
    expect(validationResultError?.position.line).toBe(13); // Line where validateData function is defined
    
    // Should find undefined TransformInput
    const transformInputError = errors.find(e => e.message.includes("TransformInput"));
    expect(transformInputError).toBeDefined();
    expect(transformInputError?.message).toContain("Function input DTO 'TransformInput' not found");
    expect(transformInputError?.severity).toBe('error');
    expect(transformInputError?.position.line).toBe(17); // Line where transformResult function is defined
    
    // Should find undefined TransformOutput
    const transformOutputError = errors.find(e => e.message.includes("TransformOutput"));
    expect(transformOutputError).toBeDefined();
    expect(transformOutputError?.message).toContain("Function output DTO 'TransformOutput' not found");
    expect(transformOutputError?.severity).toBe('error');
    expect(transformOutputError?.position.line).toBe(17); // Line where transformResult function is defined
  });
});