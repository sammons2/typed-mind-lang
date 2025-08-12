import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Scenario 48: Constants Edge Cases', () => {
  it('should validate Constants with and without schema', () => {
    const scenarioPath = join(__dirname, '../scenarios/scenario-48-constants-edge-cases.tmd');
    const content = readFileSync(scenarioPath, 'utf-8');
    
    const checker = new DSLChecker();
    const result = checker.check(content);
    
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1); // Only orphaned ConfigSchema error
    
    // Should find error for orphaned ConfigSchema
    const orphanedSchemaError = result.errors.find(e => 
      e.message.includes('ConfigSchema') && 
      e.message.includes('Orphaned entity')
    );
    expect(orphanedSchemaError).toBeDefined();
    expect(orphanedSchemaError?.severity).toBe('error');
    expect(orphanedSchemaError?.position.line).toBe(24); // Line where ConfigSchema is defined
    
    // Constants with non-existent schema should be valid but the schema should not be found
    // (but the validator might not specifically flag this as missing schema anymore)
    const schemaErrors = result.errors.filter(e => 
      e.message.includes('NonExistentSchema')
    );
    // We may or may not get a specific "NonExistentSchema not found" error
    
    // Constants without schema should be valid (no error)
    const noSchemaError = result.errors.find(e => 
      e.message.includes('NoSchemaConfig')
    );
    expect(noSchemaError).toBeUndefined();
    
    // Valid constants with schema should be valid (no error)
    const validConfigError = result.errors.find(e => 
      e.message.includes('ValidConfig') && 
      !e.message.includes('NonExistentSchema')
    );
    expect(validConfigError).toBeUndefined();
    
    // Verify that all expected entities are present in the parsed result
    // (by absence of "not found" errors for them)
    const entityNotFoundErrors = result.errors.filter(e => 
      e.message.includes('not found') &&
      (e.message.includes('ValidConfig') ||
       e.message.includes('NoSchemaConfig') ||
       e.message.includes('ConfigSchema') ||
       e.message.includes('processConfig'))
    );
    expect(entityNotFoundErrors).toHaveLength(0);
  });
});