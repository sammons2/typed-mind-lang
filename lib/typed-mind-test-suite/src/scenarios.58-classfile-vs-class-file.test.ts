import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DSLParser } from '../../typed-mind/src/parser';
import { DSLValidator } from '../../typed-mind/src/validator';

describe('Scenario 58: ClassFile vs Class+File mistakes', () => {
  const scenarioPath = join(__dirname, '../scenarios/scenario-58-classfile-vs-class-file.tmd');
  const content = readFileSync(scenarioPath, 'utf-8');
  const parser = new DSLParser();
  const validator = new DSLValidator();

  it('should detect ClassFile vs Class+File conflicts', () => {
    const parseResult = parser.parse(content);
    const validationResult = validator.validate(parseResult.entities);
    
    expect(validationResult.valid).toBe(false);
    const errors = validationResult.errors;
    
    // Mistake 1: Name conflict between Class and File
    const nameConflictError = errors.find(e => 
      e.message.includes("naming conflict") && 
      e.message.includes("AuthController")
    );
    expect(nameConflictError).toBeDefined();
    expect(nameConflictError?.suggestion).toContain("ClassFile");
    
    // Mistake 4: ClassFile extending File
    const extendError = errors.find(e => 
      e.message.includes("Cannot extend") && 
      e.message.includes("UtilityFile")
    );
    expect(extendError).toBeDefined();
    
    // Mistake 5: ClassFile duplicate export
    // ClassFile auto-exports itself, so manual export is redundant
    const goodService = parseResult.entities.find(e => 
      e.name === 'GoodService' && e.type === 'classfile'
    );
    // The exports should include helper but GoodService is implicit
    expect(goodService?.exports).toContain('helper');
    
    // Mistake 6: Method call syntax
    const processUserError = errors.find(e => 
      e.message.includes("UserService.createUser") ||
      e.message.includes("Cannot use 'calls' to reference")
    );
    expect(processUserError).toBeDefined();
    
    // Mistake 7: Circular dependency
    const circularError = errors.find(e => 
      e.message.includes("Circular import")
    );
    expect(circularError).toBeDefined();
  });

  it('should properly parse ClassFile features', () => {
    const parseResult = parser.parse(content);
    
    // UserService ClassFile
    const userService = parseResult.entities.find(e => 
      e.name === 'UserService' && e.type === 'classfile'
    );
    expect(userService).toBeDefined();
    expect(userService?.path).toBe('src/services/user.ts');
    expect(userService?.methods).toContain('createUser');
    expect(userService?.imports).toContain('UserRepository');
    expect(userService?.exports).toContain('userHelper');
    
    // EmptyService with no methods (valid)
    const emptyService = parseResult.entities.find(e => 
      e.name === 'EmptyService' && e.type === 'classfile'
    );
    expect(emptyService).toBeDefined();
    expect(emptyService?.methods?.length || 0).toBe(0);
    
    // ExtendedService extending another ClassFile
    const extendedService = parseResult.entities.find(e => 
      e.name === 'ExtendedService' && e.type === 'classfile'
    );
    expect(extendedService?.extends).toContain('UserService');
  });

  it('should distinguish when to use ClassFile vs Class+File', () => {
    const parseResult = parser.parse(content);
    
    // ModuleService: Good use of ClassFile (single main export)
    const moduleService = parseResult.entities.find(e => 
      e.name === 'ModuleService' && e.type === 'classfile'
    );
    expect(moduleService).toBeDefined();
    
    // SharedFile: Good use of separate File (multiple class exports)
    const sharedFile = parseResult.entities.find(e => 
      e.name === 'SharedFile' && e.type === 'file'
    );
    expect(sharedFile?.exports).toContain('SharedClass');
    expect(sharedFile?.exports).toContain('AnotherClass');
    expect(sharedFile?.exports).toContain('utilFunc');
    
    // Both SharedClass and AnotherClass exist as separate entities
    const sharedClass = parseResult.entities.find(e => 
      e.name === 'SharedClass' && e.type === 'class'
    );
    expect(sharedClass).toBeDefined();
  });

  it('should handle invalid syntax attempts', () => {
    const parseResult = parser.parse(content);
    
    // Files can't have methods (=> syntax)
    const dataFile = parseResult.entities.find(e => 
      e.name === 'DataFile' && e.type === 'file'
    );
    expect(dataFile?.methods).toBeUndefined();
    
    // Classes can't have paths (@ syntax)
    const dataClass = parseResult.entities.find(e => 
      e.name === 'DataClass' && e.type === 'class'
    );
    expect(dataClass?.path).toBeUndefined();
  });
});