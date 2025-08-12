import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DSLParser } from '../../typed-mind/src/parser';
import { DSLValidator } from '../../typed-mind/src/validator';

describe('Scenario 57: Import and export confusion', () => {
  const scenarioPath = join(__dirname, '../scenarios/scenario-57-import-export-confusion.tmd');
  const content = readFileSync(scenarioPath, 'utf-8');
  const parser = new DSLParser();
  const validator = new DSLValidator();

  it('should detect import/export mistakes', () => {
    const parseResult = parser.parse(content);
    const validationResult = validator.validate(parseResult.entities);
    
    expect(validationResult.valid).toBe(false);
    const errors = validationResult.errors.map(e => e.message);
    
    // Mistake 1: Self-import
    expect(errors.some(e => 
      e.includes("Cannot import 'UserService' into itself")
    )).toBe(true);
    
    // Mistake 2: Import non-existent
    expect(errors.some(e => 
      e.includes("Import 'NonExistentModule' not found")
    )).toBe(true);
    
    // Mistake 3: Export undefined
    expect(errors.some(e => 
      e.includes("Export 'deleteConfig' is not defined")
    )).toBe(true);
    
    // Mistake 4: Class with imports (parser should reject this)
    const baseClass = parseResult.entities.find(e => 
      e.name === 'BaseClass' && e.type === 'class'
    );
    // Classes shouldn't have imports property
    expect(baseClass?.imports).toBeUndefined();
    
    // Mistake 6: Invalid exports (Assets and UIComponents)
    expect(errors.some(e => 
      e.includes("cannot be exported by") && e.includes("Logo")
    )).toBe(true);
    expect(errors.some(e => 
      e.includes("cannot be exported by") && e.includes("Button")
    )).toBe(true);
    
    // Mistake 7: Import class method directly
    expect(errors.some(e => 
      e.includes("Import 'UserService.createUser' not found") ||
      e.includes("Cannot import methods directly")
    )).toBe(true);
    
    // Mistake 8: Circular import
    expect(errors.some(e => 
      e.includes("Circular import detected")
    )).toBe(true);
  });

  it('should accept valid import/export patterns', () => {
    const parseResult = parser.parse(content);
    
    // Check ProperModule has correct imports/exports
    const properModule = parseResult.entities.find(e => 
      e.name === 'ProperModule' && e.type === 'file'
    );
    expect(properModule?.imports).toContain('Config');
    expect(properModule?.imports).toContain('getConfig');
    expect(properModule?.exports).toContain('properFunc');
    expect(properModule?.exports).toContain('ProperClass');
    
    // IsolatedFile with no imports/exports is valid
    const isolatedFile = parseResult.entities.find(e => 
      e.name === 'IsolatedFile'
    );
    expect(isolatedFile).toBeDefined();
    expect(isolatedFile?.imports?.length || 0).toBe(0);
    expect(isolatedFile?.exports?.length || 0).toBe(0);
  });

  it('should properly handle ClassFile imports', () => {
    const parseResult = parser.parse(content);
    
    // UserService as ClassFile can have imports
    const userService = parseResult.entities.find(e => 
      e.name === 'UserService' && e.type === 'classfile'
    );
    expect(userService).toBeDefined();
    // Even though it tries to import itself, the parser should capture it
    expect(userService?.imports).toContain('UserService');
  });
});