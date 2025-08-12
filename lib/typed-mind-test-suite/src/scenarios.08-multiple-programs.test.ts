import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-08-multiple-programs', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-08-multiple-programs.tmd';

  it('should validate multiple programs when both reference valid File entities', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Multiple programs should be valid when each references an existing File entity
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    
    // Verify the specific content being tested
    expect(content).toContain('TestApp -> MainFile v1.0.0');
    expect(content).toContain('AnotherApp -> OtherFile v2.0.0');
    expect(content).toContain('MainFile @ src/main.ts:');
    expect(content).toContain('OtherFile @ src/other.ts:');
  });

  it('should parse both Program and File entities correctly', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const programGraph = checker.parse(content);
    const entities = programGraph.entities;
    
    // Should have exactly 4 entities: 2 Programs + 2 Files
    expect(entities.size).toBe(4);
    
    // Check that both programs exist
    expect(entities.has('TestApp')).toBe(true);
    expect(entities.has('AnotherApp')).toBe(true);
    
    // Check that both files exist  
    expect(entities.has('MainFile')).toBe(true);
    expect(entities.has('OtherFile')).toBe(true);
    
    // Verify program entities point to correct entry files
    const testApp = entities.get('TestApp');
    const anotherApp = entities.get('AnotherApp');
    
    expect(testApp?.type).toBe('Program');
    expect(testApp?.entry).toBe('MainFile');
    expect(testApp?.version).toBe('1.0.0');
    
    expect(anotherApp?.type).toBe('Program');
    expect(anotherApp?.entry).toBe('OtherFile');  
    expect(anotherApp?.version).toBe('2.0.0');
    
    // Verify file entities have correct paths
    const mainFile = entities.get('MainFile');
    const otherFile = entities.get('OtherFile');
    
    expect(mainFile?.type).toBe('File');
    expect(mainFile?.path).toBe('src/main.ts');
    
    expect(otherFile?.type).toBe('File');
    expect(otherFile?.path).toBe('src/other.ts');
  });

  it('should demonstrate that TypedMind DSL allows multiple independent programs', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // This test validates a key architectural decision: multiple programs are allowed
    // This enables scenarios like:
    // - Microservices architectures with multiple entry points
    // - Client/server applications with separate programs
    // - Multi-target builds (web, desktop, mobile)
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    
    // Verify no circular dependency errors between programs
    const circularDepErrors = result.errors.filter(err => 
      err.message.includes('Circular dependency')
    );
    expect(circularDepErrors).toHaveLength(0);
    
    // Verify no entry point validation errors
    const entryPointErrors = result.errors.filter(err => 
      err.message.includes('entry point')
    );
    expect(entryPointErrors).toHaveLength(0);
  });
});