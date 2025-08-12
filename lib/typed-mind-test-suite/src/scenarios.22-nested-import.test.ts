import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-22-nested-import', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-22-nested-import.tmd';

  it('should validate nested imports and detect orphaned entities', () => {
    const filePath = join(__dirname, '..', 'scenarios', scenarioFile);
    const content = readFileSync(filePath, 'utf-8');
    const result = checker.check(content, filePath);
    
    // Should be invalid due to orphaned entities
    expect(result.valid).toBe(false);
    
    // Should have exactly 3 orphaned entity errors
    expect(result.errors).toHaveLength(3);
    
    // Check for ServiceFile orphaned entity error
    const serviceFileError = result.errors.find(err => err.message.includes("Orphaned entity 'ServiceFile'"));
    expect(serviceFileError).toBeDefined();
    expect(serviceFileError?.position.line).toBe(4);
    expect(serviceFileError?.position.column).toBe(1);
    expect(serviceFileError?.severity).toBe('error');
    expect(serviceFileError?.suggestion).toBe('Remove or reference this entity');
    
    // Check for User orphaned entity error
    const userError = result.errors.find(err => err.message.includes("Orphaned entity 'User'"));
    expect(userError).toBeDefined();
    expect(userError?.position.line).toBe(14);
    expect(userError?.position.column).toBe(1);
    expect(userError?.severity).toBe('error');
    expect(userError?.suggestion).toBe('Remove or reference this entity');
    
    // Check for DatabaseFile orphaned entity error
    const databaseFileError = result.errors.find(err => err.message.includes("Orphaned entity 'DatabaseFile'"));
    expect(databaseFileError).toBeDefined();
    expect(databaseFileError?.position.line).toBe(2);
    expect(databaseFileError?.position.column).toBe(1);
    expect(databaseFileError?.severity).toBe('error');
    expect(databaseFileError?.suggestion).toBe('Remove or reference this entity');
  });
});