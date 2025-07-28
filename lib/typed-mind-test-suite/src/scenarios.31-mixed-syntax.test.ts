import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DSLChecker } from '@sammons/typed-mind';

describe('scenario-31-mixed-syntax', () => {
  it('should validate mixed longform and shortform syntax', () => {
    const scenarioPath = join(__dirname, '../scenarios/scenario-31-mixed-syntax.tmd');
    const content = readFileSync(scenarioPath, 'utf-8');
    
    const checker = new DSLChecker();
    const result = checker.check(content, scenarioPath);
    const parsed = checker.parse(content, scenarioPath);
    
    // Should have both programs
    expect(parsed.entities.has('TodoApp')).toBe(true);
    expect(parsed.entities.has('APIServer')).toBe(true);
    
    // Check shortform entities
    const todoApp = parsed.entities.get('TodoApp');
    expect(todoApp?.type).toBe('Program');
    if (todoApp?.type === 'Program') {
      expect(todoApp.entry).toBe('AppEntry');
      expect(todoApp.version).toBe('1.0.0');
    }
    
    // Check longform entities
    const apiServer = parsed.entities.get('APIServer');
    expect(apiServer?.type).toBe('Program');
    if (apiServer?.type === 'Program') {
      expect(apiServer.entry).toBe('ApiMain');
      expect(apiServer.version).toBe('2.0.0');
    }
    
    // Check mixed functions
    expect(parsed.entities.get('createTodo')?.type).toBe('Function');
    expect(parsed.entities.get('deleteTodo')?.type).toBe('Function');
    
    // Check mixed DTOs
    expect(parsed.entities.get('TodoDTO')?.type).toBe('DTO');
    expect(parsed.entities.get('UserDTO')?.type).toBe('DTO');
    
    // Check mixed UIComponents
    expect(parsed.entities.get('Button')?.type).toBe('UIComponent');
    expect(parsed.entities.get('UserProfile')?.type).toBe('UIComponent');
    
    // Check mixed RunParameters
    const dbUrl = parsed.entities.get('DATABASE_URL');
    expect(dbUrl?.type).toBe('RunParameter');
    if (dbUrl?.type === 'RunParameter') {
      expect(dbUrl.paramType).toBe('env');
    }
    
    const apiKey = parsed.entities.get('API_KEY');
    expect(apiKey?.type).toBe('RunParameter');
    if (apiKey?.type === 'RunParameter') {
      expect(apiKey.paramType).toBe('env');
      expect(apiKey.defaultValue).toBe('dev-key');
    }
    
    // Check that updateProfile consumes parameters
    const updateProfile = parsed.entities.get('updateProfile');
    expect(updateProfile?.type).toBe('Function');
    if (updateProfile?.type === 'Function') {
      expect(updateProfile.consumes).toEqual(['DATABASE_URL', 'API_KEY']);
      expect(updateProfile.affects).toEqual(['UserProfile']);
    }
    
    // Check that longform syntax was parsed correctly
    // The scenario has orphaned entities so it won't be valid,
    // but we're testing that the syntax is parsed correctly
    expect(parsed.entities.size).toBeGreaterThan(10);
  });
});