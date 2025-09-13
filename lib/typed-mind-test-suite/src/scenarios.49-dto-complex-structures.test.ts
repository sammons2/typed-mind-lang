import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Scenario 49: DTO Complex Structures', () => {
  it('should validate complex DTO structures', () => {
    const scenarioPath = join(__dirname, '../scenarios/scenario-49-dto-complex-structures.tmd');
    const content = readFileSync(scenarioPath, 'utf-8');
    
    const checker = new DSLChecker();
    const result = checker.check(content);
    
    // All these complex DTO structures should be invalid
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    
    // Verify entities were parsed correctly
    const parseResult = checker.parse(content);
    
    // Check empty DTO exists
    expect(parseResult.entities.has('EmptyDTO')).toBe(true);
    
    // Check nested DTO exists and has fields
    const nestedDTO = parseResult.entities.get('NestedDTO');
    expect(nestedDTO).toBeDefined();
    expect(nestedDTO?.type).toBe('DTO');
    
    // Check array field DTO
    const arrayDTO = parseResult.entities.get('ArrayFieldDTO');
    expect(arrayDTO).toBeDefined();
    
    // Check self-referencing DTO
    const selfRefDTO = parseResult.entities.get('SelfReferencingDTO');
    expect(selfRefDTO).toBeDefined();
    
    // Check complex DTO with various field types
    const complexDTO = parseResult.entities.get('ComplexDTO');
    expect(complexDTO).toBeDefined();
  });
  
  it('should handle DTO field validation for Function fields', () => {
    const content = `
# Test DTO with Function field - should error
TestApp -> MainFile v1.0.0

MainFile @ src/main.ts:
  -> [BadDTO]

BadDTO % "DTO with function field"
  - processData: Function "Function field - not allowed"
  - callback: () => void "Another function field"
`;
    
    const checker = new DSLChecker();
    const result = checker.check(content);
    
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    
    // Should have errors for Function fields
    const functionFieldErrors = result.errors.filter(e => 
      e.message.includes('Function type')
    );
    expect(functionFieldErrors.length).toBeGreaterThan(0);
  });
});