import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLParser } from '@sammons/typed-mind';
import { DSLValidator } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-29-referencedby-tracking', () => {
  const scenarioFile = 'scenario-29-referencedby-tracking.tmd';

  it('should track ReferencedBy relationships', () => {
    const filePath = join(__dirname, '..', 'scenarios', scenarioFile);
    const content = readFileSync(filePath, 'utf-8');
    
    const parser = new DSLParser();
    const validator = new DSLValidator();
    
    const parseResult = parser.parse(content);
    const validationResult = validator.validate(parseResult.entities);
    
    if (!validationResult.valid) {
      console.log('Validation errors:', validationResult.errors);
    }

    // Validation fails due to orphaned entities, but we can still test referencedBy tracking
    expect(validationResult.valid).toBe(false);
    expect(validationResult.errors).toHaveLength(7);
    
    // Test File references
    const userService = parseResult.entities.get('UserService');
    expect(userService).toBeDefined();
    expect(userService?.referencedBy?.some(ref => ref.from === 'MainFile' && ref.type === 'imports')).toBe(true);
    
    // Test Function references
    const createUser = parseResult.entities.get('createUser');
    expect(createUser).toBeDefined();
    expect(createUser?.referencedBy?.some(ref => ref.from === 'UserService' && ref.type === 'exports')).toBe(true);
    
    // Test DTO references
    const userDTO = parseResult.entities.get('UserDTO');
    expect(userDTO).toBeDefined();
    expect(userDTO?.referencedBy?.some(ref => ref.from === 'MainFile' && ref.type === 'imports')).toBe(true);
    expect(userDTO?.referencedBy?.some(ref => ref.from === 'createUser' && ref.type === 'input')).toBe(true);
    
    const user = parseResult.entities.get('User');
    expect(user).toBeDefined();
    expect(user?.referencedBy?.some(ref => ref.from === 'createUser' && ref.type === 'output')).toBe(true);
    expect(user?.referencedBy?.some(ref => ref.from === 'getUser' && ref.type === 'output')).toBe(true);
    
    // Test Class references
    const database = parseResult.entities.get('Database');
    expect(database).toBeDefined();
    expect(database?.referencedBy?.some(ref => ref.from === 'UserService' && ref.type === 'imports')).toBe(true);
    expect(database?.referencedBy?.some(ref => ref.from === 'createUser' && ref.type === 'calls')).toBe(true);
    expect(database?.referencedBy?.some(ref => ref.from === 'getUser' && ref.type === 'calls')).toBe(true);
    
    // Test Constants references
    const databaseConfig = parseResult.entities.get('DatabaseConfig');
    expect(databaseConfig).toBeDefined();
    expect(databaseConfig?.referencedBy?.some(ref => ref.from === 'MainFile' && ref.type === 'imports')).toBe(true);
    
    // Test Program entry references
    const mainFile = parseResult.entities.get('MainFile');
    expect(mainFile).toBeDefined();
    expect(mainFile?.referencedBy?.some(ref => ref.from === 'TestApp' && ref.type === 'entry')).toBe(true);
    
    // Test UIComponent references
    const userList = parseResult.entities.get('UserList');
    expect(userList).toBeDefined();
    expect(userList?.referencedBy?.some(ref => ref.from === 'AppUI' && ref.type === 'contains')).toBe(true);
    
    const appUI = parseResult.entities.get('AppUI');
    expect(appUI).toBeDefined();
    expect(appUI?.referencedBy?.some(ref => ref.from === 'UserList' && ref.type === 'containedBy')).toBe(true);
    expect(appUI?.referencedBy?.some(ref => ref.from === 'UserForm' && ref.type === 'containedBy')).toBe(true);
    
    // Test RunParameter references
    const databaseUrl = parseResult.entities.get('DATABASE_URL');
    expect(databaseUrl).toBeDefined();
    expect(databaseUrl?.referencedBy?.some(ref => ref.from === 'handler' && ref.type === 'consumes')).toBe(true);
    
    // Test Asset program references
    const clientProgram = parseResult.entities.get('ClientProgram');
    expect(clientProgram).toBeDefined();
    expect(clientProgram?.referencedBy?.some(ref => ref.from === 'HTMLAsset' && ref.type === 'containsProgram')).toBe(true);
    
    // Additional verification of referencedBy tracking
    // Note: There are validation errors due to orphaned entities, but referencedBy tracking still works
    
    // Verify all expected entities exist
    expect(parseResult.entities.has('UserService')).toBe(true);
    expect(parseResult.entities.has('createUser')).toBe(true);
    expect(parseResult.entities.has('UserDTO')).toBe(true);
    expect(parseResult.entities.has('User')).toBe(true);
    expect(parseResult.entities.has('Database')).toBe(true);
    expect(parseResult.entities.has('DatabaseConfig')).toBe(true);
    expect(parseResult.entities.has('MainFile')).toBe(true);
    expect(parseResult.entities.has('UserList')).toBe(true);
    expect(parseResult.entities.has('AppUI')).toBe(true);
    expect(parseResult.entities.has('DATABASE_URL')).toBe(true);
    expect(parseResult.entities.has('ClientProgram')).toBe(true);
    
    // Verify reference counts for key entities
    expect(userService?.referencedBy?.length).toBe(1);
    expect(userDTO?.referencedBy?.length).toBe(2);
    expect(database?.referencedBy?.length).toBe(4);
    expect(userList?.referencedBy?.length).toBe(1);
    expect(databaseUrl?.referencedBy?.length).toBe(1);
    expect(clientProgram?.referencedBy?.length).toBe(1);
  });
});