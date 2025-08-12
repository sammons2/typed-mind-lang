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
    
    expect(validationResult.valid).toBe(false);
    expect(validationResult.errors).toHaveLength(1);
    
    // Should detect orphaned EntryFile
    const orphanedEntryFileError = validationResult.errors.find(err => 
      err.message === "Orphaned entity 'EntryFile'"
    );
    expect(orphanedEntryFileError).toBeDefined();
    expect(orphanedEntryFileError?.position.line).toBe(8);
    expect(orphanedEntryFileError?.severity).toBe('error');
    expect(orphanedEntryFileError?.suggestion).toBe('Remove or reference this entity');
    
    // Verify entities are parsed correctly
    const entities = parseResult.entities;
    expect(entities.has('MainFile')).toBe(true);
    expect(entities.has('EntryFile')).toBe(true);
    expect(entities.has('UserService')).toBe(true);
    expect(entities.has('createUser')).toBe(true);
    expect(entities.has('UserDTO')).toBe(true);
    expect(entities.has('startApp')).toBe(true);
    
    // Verify entity types
    const mainFile = entities.get('MainFile');
    expect(mainFile?.type).toBe('File');
    
    const entryFile = entities.get('EntryFile');
    expect(entryFile?.type).toBe('File');
    
    const userService = entities.get('UserService');
    expect(userService?.type).toBe('File');
    
    const createUser = entities.get('createUser');
    expect(createUser?.type).toBe('Function');
    
    const userDTO = entities.get('UserDTO');
    expect(userDTO?.type).toBe('DTO');
    
    const startApp = entities.get('startApp');
    expect(startApp?.type).toBe('Function');
  });
});