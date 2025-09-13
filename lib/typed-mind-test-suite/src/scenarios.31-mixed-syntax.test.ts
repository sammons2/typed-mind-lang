import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DSLChecker } from '@sammons/typed-mind';

describe('scenario-31-mixed-syntax', () => {
  it('should parse mixed longform and shortform syntax correctly', () => {
    const scenarioPath = join(__dirname, '../scenarios/scenario-31-mixed-syntax.tmd');
    const content = readFileSync(scenarioPath, 'utf-8');
    
    const checker = new DSLChecker();
    const parsed = checker.parse(content, scenarioPath);
    
    // Should have both programs
    expect(parsed.entities.has('TodoApp')).toBe(true);
    expect(parsed.entities.has('APIServer')).toBe(true);
    
    // Check shortform program (TodoApp -> AppEntry v1.0.0)
    const todoApp = parsed.entities.get('TodoApp');
    expect(todoApp?.type).toBe('Program');
    if (todoApp?.type === 'Program') {
      expect(todoApp.entry).toBe('AppEntry');
      expect(todoApp.version).toBe('1.0.0');
    }
    
    // Check longform program
    const apiServer = parsed.entities.get('APIServer');
    expect(apiServer?.type).toBe('Program');
    if (apiServer?.type === 'Program') {
      expect(apiServer.entry).toBe('ApiMain');
      expect(apiServer.version).toBe('2.0.0');
    }
    
    // Check shortform file (AppEntry @ src/app.ts)
    const appEntry = parsed.entities.get('AppEntry');
    expect(appEntry?.type).toBe('File');
    if (appEntry?.type === 'File') {
      expect(appEntry.path).toBe('src/app.ts');
      expect(appEntry.imports).toEqual(['Express']);
      expect(appEntry.exports).toEqual(['startApp']);
    }
    
    // Check longform file
    const apiMain = parsed.entities.get('ApiMain');
    expect(apiMain?.type).toBe('File');
    if (apiMain?.type === 'File') {
      expect(apiMain.path).toBe('src/api.ts');
      expect(apiMain.imports).toEqual(['Fastify', 'Database']);
      expect(apiMain.exports).toEqual(['startApi']);
    }
    
    // Check shortform function (createTodo :: (data: TodoDTO) => Todo)
    const createTodo = parsed.entities.get('createTodo');
    expect(createTodo?.type).toBe('Function');
    if (createTodo?.type === 'Function') {
      expect(createTodo.signature).toBe('(data: TodoDTO) => Todo');
      expect(createTodo.calls).toEqual(['validate', 'save']);
    }
    
    // Check longform function
    const deleteTodo = parsed.entities.get('deleteTodo');
    expect(deleteTodo?.type).toBe('Function');
    if (deleteTodo?.type === 'Function') {
      expect(deleteTodo.signature).toBe('(id: string) => void');
      expect(deleteTodo.calls).toEqual(['Database.delete']);
    }
    
    // Check shortform DTO (TodoDTO % "Todo input data")
    const todoDTO = parsed.entities.get('TodoDTO');
    expect(todoDTO?.type).toBe('DTO');
    if (todoDTO?.type === 'DTO') {
      expect(todoDTO.purpose).toBe('Todo input data');
      expect(todoDTO.fields).toHaveLength(2);
      expect(todoDTO.fields[0]).toEqual({
        name: 'title',
        type: 'string',
        description: undefined,
        optional: false
      });
      expect(todoDTO.fields[1]).toEqual({
        name: 'done',
        type: 'boolean',
        description: undefined,
        optional: false
      });
    }
    
    // Check longform DTO
    const userDTO = parsed.entities.get('UserDTO');
    expect(userDTO?.type).toBe('DTO');
    if (userDTO?.type === 'DTO') {
      expect(userDTO.purpose).toBe('User data');
      expect(userDTO.fields).toHaveLength(2);
      expect(userDTO.fields[0]).toEqual({
        name: 'name',
        type: 'any',
        description: undefined,
        optional: false
      });
      expect(userDTO.fields[1]).toEqual({
        name: 'email',
        type: 'any',
        description: undefined,
        optional: false
      });
    }
    
    // Check shortform UIComponent (Button & "Reusable button")
    const button = parsed.entities.get('Button');
    expect(button?.type).toBe('UIComponent');
    if (button?.type === 'UIComponent') {
      expect(button.purpose).toBe('Reusable button');
    }
    
    // Check longform UIComponent
    const userProfile = parsed.entities.get('UserProfile');
    expect(userProfile?.type).toBe('UIComponent');
    if (userProfile?.type === 'UIComponent') {
      expect(userProfile.purpose).toBe('User profile display');
      expect(userProfile.contains).toEqual(['Button']);
      expect(userProfile.affectedBy).toEqual(['updateProfile']);
    }
    
    // Check shortform RunParameter (DATABASE_URL $env "Database connection")
    const dbUrl = parsed.entities.get('DATABASE_URL');
    expect(dbUrl?.type).toBe('RunParameter');
    if (dbUrl?.type === 'RunParameter') {
      expect(dbUrl.paramType).toBe('env');
      expect(dbUrl.description).toBe('Database connection');
    }
    
    // Check longform RunParameter
    const apiKey = parsed.entities.get('API_KEY');
    expect(apiKey?.type).toBe('RunParameter');
    if (apiKey?.type === 'RunParameter') {
      expect(apiKey.paramType).toBe('env');
      expect(apiKey.description).toBe('API key');
      expect(apiKey.defaultValue).toBe('dev-key');
    }
    
    // Check function that consumes parameters
    const updateProfile = parsed.entities.get('updateProfile');
    expect(updateProfile?.type).toBe('Function');
    if (updateProfile?.type === 'Function') {
      expect(updateProfile.signature).toBe('(data: UserDTO) => void');
      expect(updateProfile.consumes).toEqual(['DATABASE_URL', 'API_KEY']);
      expect(updateProfile.affects).toEqual(['UserProfile']);
    }
    
    // Check that all expected entities were parsed
    expect(parsed.entities.size).toBe(20); // Specific count based on the scenario
    
    // Verify supporting entities
    expect(parsed.entities.get('Express')?.type).toBe('Constants');
    expect(parsed.entities.get('Fastify')?.type).toBe('Constants');
    expect(parsed.entities.get('Database')?.type).toBe('Class');
    expect(parsed.entities.get('validate')?.type).toBe('Function');
    expect(parsed.entities.get('save')?.type).toBe('Function');
    expect(parsed.entities.get('startApp')?.type).toBe('Function');
    expect(parsed.entities.get('startApi')?.type).toBe('Function');
  });

  it('should fail validation due to orphaned entities', () => {
    const scenarioPath = join(__dirname, '../scenarios/scenario-31-mixed-syntax.tmd');
    const content = readFileSync(scenarioPath, 'utf-8');
    
    const checker = new DSLChecker();
    const result = checker.check(content, scenarioPath);
    
    // Should fail validation due to orphaned entities
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(15);

    // Check for orphaned entity errors
    const orphanedErrors = result.errors.filter(err => err.message.startsWith('Orphaned entity'));
    expect(orphanedErrors).toHaveLength(8);

    const orphanedEntities = ['createTodo', 'deleteTodo', 'TodoDTO', 'UserDTO', 'UserProfile', 'updateProfile', 'startApp', 'startApi'];
    orphanedEntities.forEach(entityName => {
      const error = orphanedErrors.find(err => err.message === `Orphaned entity '${entityName}'`);
      expect(error).toBeDefined();
      expect(error?.severity).toBe('error');
      expect(error?.suggestion).toBe('Remove or reference this entity');
    });
    
    // Check for function not exported errors
    const functionNotExportedErrors = result.errors.filter(err => 
      err.message.includes('is not exported by any file and is not a class method')
    );
    expect(functionNotExportedErrors).toHaveLength(5);
    
    const unexportedFunctions = ['createTodo', 'deleteTodo', 'updateProfile', 'validate', 'save'];
    unexportedFunctions.forEach(funcName => {
      const error = functionNotExportedErrors.find(err => err.message.includes(`Function '${funcName}'`));
      expect(error).toBeDefined();
      expect(error?.severity).toBe('error');
      expect(error?.suggestion).toBe(`Either add '${funcName}' to the exports of a file entity or define it as a method of a class`);
    });
    
    // Check for class not exported error
    const classNotExportedError = result.errors.find(err => 
      err.message === "Class 'Database' is not exported by any file"
    );
    expect(classNotExportedError).toBeDefined();
    expect(classNotExportedError?.severity).toBe('error');
    expect(classNotExportedError?.suggestion).toBe("Add 'Database' to the exports of a file entity or convert to ClassFile with #: operator");
    expect(classNotExportedError?.position.line).toBe(74);
    
    // Check for UIComponent not contained error
    const uiComponentError = result.errors.find(err => 
      err.message === "UIComponent 'UserProfile' is not contained by any other UIComponent"
    );
    expect(uiComponentError).toBeDefined();
    expect(uiComponentError?.severity).toBe('error');
    expect(uiComponentError?.suggestion).toBe("Either add 'UserProfile' to another UIComponent's contains list, or mark it as a root component with &!");
    expect(uiComponentError?.position.line).toBe(49);
  });
});