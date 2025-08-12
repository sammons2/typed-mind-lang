import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-28-runparameter-invalid-consumes', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-28-runparameter-invalid-consumes.tmd';

  it('should detect invalid RunParameter consumption', () => {
    const filePath = join(__dirname, '..', 'scenarios', scenarioFile);
    const content = readFileSync(filePath, 'utf-8');
    const result = checker.check(content, filePath);
    
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
    
    // Should detect consuming unknown parameter
    const unknownParamError = result.errors.find(err => 
      err.message === "Function 'badFunction' consumes unknown entity 'NON_EXISTENT_PARAM'"
    );
    expect(unknownParamError).toBeDefined();
    expect(unknownParamError?.position.line).toBe(12);
    expect(unknownParamError?.severity).toBe('error');
    expect(unknownParamError?.suggestion).toBe("Define 'NON_EXISTENT_PARAM' as one of: RunParameter, Asset, Dependency, Constants");
    
    // Get parsed entities using parse method
    const parseResult = checker.parse(content, filePath);
    const entities = parseResult.entities;
    expect(entities.has('DATABASE_URL')).toBe(true);
    expect(entities.has('APP_CONFIG')).toBe(true);
    expect(entities.has('badFunction')).toBe(true);
    expect(entities.has('anotherBadFunction')).toBe(true);
    
    // Verify types
    const databaseUrl = entities.get('DATABASE_URL') as any;
    expect(databaseUrl?.type).toBe('RunParameter');
    expect(databaseUrl?.paramType).toBe('env');
    
    const appConfig = entities.get('APP_CONFIG');
    expect(appConfig?.type).toBe('Constants');
  });
});