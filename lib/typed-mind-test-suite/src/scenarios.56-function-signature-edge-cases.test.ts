import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DSLParser } from '../../typed-mind/src/parser';
import { DSLValidator } from '../../typed-mind/src/validator';

describe('Scenario 56: Function signature edge cases', () => {
  const scenarioPath = join(__dirname, '../scenarios/scenario-56-function-signature-edge-cases.tmd');
  const content = readFileSync(scenarioPath, 'utf-8');
  const parser = new DSLParser();
  const validator = new DSLValidator();

  it('should parse complex function signatures', () => {
    const parseResult = parser.parse(content);
    
    // Check that all functions were parsed
    const functions = parseResult.entities.filter(e => e.type === 'function');
    expect(functions.length).toBe(8); // func1-5, processRequest, log, noOp, complexFunc
    
    // Check generic signature parsing
    const func1 = functions.find(f => f.name === 'func1');
    expect(func1?.signature).toContain('<T extends Base>');
    
    // Check higher-order function
    const func4 = functions.find(f => f.name === 'func4');
    expect(func4?.signature).toContain('=>');
    expect(func4?.signature).toContain('(data: string)');
    
    // Check description with arrow
    const func5 = functions.find(f => f.name === 'func5');
    expect(func5?.purpose).toBe('Logs -> to console');
  });

  it('should validate function dependencies correctly', () => {
    const parseResult = parser.parse(content);
    const validationResult = validator.validate(parseResult.entities);
    
    // processRequest should have issues with Logger/Database as calls
    const errors = validationResult.errors;
    
    // Check if Request DTO is properly set as input
    const processRequest = parseResult.entities.find(e => 
      e.type === 'function' && e.name === 'processRequest'
    );
    expect(processRequest?.input).toBe('Request');
    
    // Logger and Database are ClassFiles, not Functions, so they can't be called directly
    const callErrors = errors.filter(e => 
      e.message.includes("Cannot use 'calls' to reference ClassFile")
    );
    expect(callErrors.length).toBeGreaterThan(0);
  });

  it('should handle functions with same names as class methods', () => {
    const parseResult = parser.parse(content);
    
    // Both standalone log function and Logger.log method should exist
    const logFunction = parseResult.entities.find(e => 
      e.type === 'function' && e.name === 'log'
    );
    expect(logFunction).toBeDefined();
    
    const loggerClass = parseResult.entities.find(e => 
      e.name === 'Logger' && e.type === 'classfile'
    );
    expect(loggerClass?.methods).toContain('log');
  });

  it('should parse empty and complex signatures', () => {
    const parseResult = parser.parse(content);
    
    const noOp = parseResult.entities.find(e => e.name === 'noOp');
    expect(noOp?.signature).toBe('() => void');
    
    const complexFunc = parseResult.entities.find(e => e.name === 'complexFunc');
    expect(complexFunc?.signature).toContain('nested');
    expect(complexFunc?.signature).toContain('Array<Map<string, Set<number>>>');
  });
});