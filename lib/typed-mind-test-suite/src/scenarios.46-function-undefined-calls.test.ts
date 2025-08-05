import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Scenario 46: Function Undefined Method Calls', () => {
  it('should detect functions with undefined method calls', () => {
    const scenarioPath = join(__dirname, '../scenarios/scenario-46-function-undefined-calls.tmd');
    const content = readFileSync(scenarioPath, 'utf-8');
    
    const checker = new DSLChecker();
    const result = checker.check(content);
    
    expect(result.valid).toBe(false);
    expect(result.errors).toMatchSnapshot();
    
    // Check specific errors
    const errors = result.errors;
    
    // Should find undefined UndefinedService
    const undefinedServiceError = errors.find(e => e.message.includes("UndefinedService"));
    expect(undefinedServiceError).toBeDefined();
    expect(undefinedServiceError?.message).toContain("references unknown entity 'UndefinedService'");
    
    // Should find undefined NonExistentClass
    const nonExistentClassError = errors.find(e => e.message.includes("NonExistentClass"));
    expect(nonExistentClassError).toBeDefined();
    expect(nonExistentClassError?.message).toContain("references unknown entity 'NonExistentClass'");
    
    // Should find error for calling method on DTO
    const requestDTOError = errors.find(e => e.message.includes("RequestDTO") && e.message.includes("Only Classes"));
    expect(requestDTOError).toBeDefined();
    expect(requestDTOError?.message).toContain("Cannot call method 'handle' on DTO 'RequestDTO'");
    
    // Should find error for undefined someConstant.execute 
    const constantError = errors.find(e => e.message.includes("someConstant.execute"));
    expect(constantError).toBeDefined();
    expect(constantError?.message).toContain("references unknown entity 'someConstant'");
    
    // Should find undefined InvalidClass
    const invalidClassError = errors.find(e => e.message.includes("InvalidClass"));
    expect(invalidClassError).toBeDefined();
    expect(invalidClassError?.message).toContain("references unknown entity 'InvalidClass'");
  });
});