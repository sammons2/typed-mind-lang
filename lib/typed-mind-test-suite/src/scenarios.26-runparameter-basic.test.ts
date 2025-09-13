import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-26-runparameter-basic', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-26-runparameter-basic.tmd';

  it('should validate basic RunParameter functionality', () => {
    const filePath = join(__dirname, '..', 'scenarios', scenarioFile);
    const content = readFileSync(filePath, 'utf-8');
    const result = checker.check(content, filePath);
    
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    
    // Get parsed entities using parse method
    const parseResult = checker.parse(content, filePath);
    const entities = parseResult.entities;
    
    // Environment variables
    expect(entities.has('DATABASE_URL')).toBe(true);
    expect(entities.has('API_KEY')).toBe(true);
    
    // IAM roles
    expect(entities.has('LAMBDA_ROLE')).toBe(true);
    
    // Runtime configuration
    expect(entities.has('NODE_VERSION')).toBe(true);
    
    // Configuration parameters
    expect(entities.has('MEMORY_SIZE')).toBe(true);
    expect(entities.has('TIMEOUT')).toBe(true);
    
    // Functions that consume parameters
    expect(entities.has('handler')).toBe(true);
    expect(entities.has('init')).toBe(true);
    
    // Verify RunParameter types
    const databaseUrl = entities.get('DATABASE_URL') as any;
    expect(databaseUrl?.type).toBe('RunParameter');
    expect(databaseUrl?.paramType).toBe('env');
    
    const apiKey = entities.get('API_KEY') as any;
    expect(apiKey?.type).toBe('RunParameter');
    expect(apiKey?.paramType).toBe('env');
    expect(apiKey?.defaultValue).toBe('dev-key-12345');
    
    const lambdaRole = entities.get('LAMBDA_ROLE') as any;
    expect(lambdaRole?.type).toBe('RunParameter');
    expect(lambdaRole?.paramType).toBe('iam');
    
    const nodeVersion = entities.get('NODE_VERSION') as any;
    expect(nodeVersion?.type).toBe('RunParameter');
    expect(nodeVersion?.paramType).toBe('runtime');
    expect(nodeVersion?.defaultValue).toBe('20.x');
    
    const memorySize = entities.get('MEMORY_SIZE') as any;
    expect(memorySize?.type).toBe('RunParameter');
    expect(memorySize?.paramType).toBe('config');
    expect(memorySize?.defaultValue).toBe('512');
  });
});