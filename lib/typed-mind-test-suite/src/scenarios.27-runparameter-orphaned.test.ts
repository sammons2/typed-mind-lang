import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-27-runparameter-orphaned', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-27-runparameter-orphaned.tmd';

  it('should detect orphaned RunParameters', () => {
    const filePath = join(__dirname, '..', 'scenarios', scenarioFile);
    const content = readFileSync(filePath, 'utf-8');
    const result = checker.check(content, filePath);
    
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(3);

    // Should detect orphaned UNUSED_PARAM
    const unusedParamError = result.errors.find(err =>
      err.message === "Orphaned entity 'UNUSED_PARAM'"
    );
    expect(unusedParamError).toBeDefined();
    expect(unusedParamError?.position.line).toBe(12);
    expect(unusedParamError?.severity).toBe('error');
    expect(unusedParamError?.suggestion).toBe('Remove or reference this entity');

    // Should detect orphaned SECRET_KEY
    const secretKeyError = result.errors.find(err =>
      err.message === "Orphaned entity 'SECRET_KEY'"
    );
    expect(secretKeyError).toBeDefined();
    expect(secretKeyError?.position.line).toBe(13);
    expect(secretKeyError?.severity).toBe('error');
    expect(secretKeyError?.suggestion).toBe('Remove or reference this entity');

    // Should detect orphaned processData function
    const processDataError = result.errors.find(err =>
      err.message === "Orphaned entity 'processData'"
    );
    expect(processDataError).toBeDefined();
    expect(processDataError?.position.line).toBe(16);
    expect(processDataError?.severity).toBe('error');
    expect(processDataError?.suggestion).toBe('Remove or reference this entity');
    
    // Get parsed entities using parse method  
    const parseResult = checker.parse(content, filePath);
    const entities = parseResult.entities;
    expect(entities.has('UNUSED_PARAM')).toBe(true);
    expect(entities.has('SECRET_KEY')).toBe(true);
    expect(entities.has('API_KEY')).toBe(true);
    expect(entities.has('DATABASE_URL')).toBe(true);
    
    // Verify types
    const unusedParam = entities.get('UNUSED_PARAM') as any;
    expect(unusedParam?.type).toBe('RunParameter');
    expect(unusedParam?.paramType).toBe('env');
    
    const secretKey = entities.get('SECRET_KEY') as any;
    expect(secretKey?.type).toBe('RunParameter');
    expect(secretKey?.paramType).toBe('config');
    expect(secretKey?.defaultValue).toBe('secret123');
  });
});