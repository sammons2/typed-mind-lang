import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-44-classfile-mixed-entities', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-44-classfile-mixed-entities.tmd';

  it('should handle mixed ClassFile and regular entities correctly', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // The scenario should be invalid due to multiple validation errors
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(8); // More errors than expected
    
    // Should find error for BaseController being orphaned
    const baseControllerOrphanedError = result.errors.find(err => 
      err.message.includes('BaseController') && 
      err.message.includes('Orphaned entity')
    );
    expect(baseControllerOrphanedError).toBeDefined();
    expect(baseControllerOrphanedError?.severity).toBe('error');
    
    // Should find error for BaseController not being exported from a File
    const baseControllerNotExportedError = result.errors.find(err => 
      err.message.includes('BaseController') && 
      err.message.includes('is not exported by any file')
    );
    expect(baseControllerNotExportedError).toBeDefined();
    expect(baseControllerNotExportedError?.severity).toBe('error');
    
    // Should find errors for invalid calls to ClassFile methods
    const userControllerCallError = result.errors.find(err => 
      err.message.includes('Cannot use \'calls\' to reference ClassFile \'UserController\'')
    );
    expect(userControllerCallError).toBeDefined();
    expect(userControllerCallError?.severity).toBe('error');
    
    const userRepositoryCallError = result.errors.find(err => 
      err.message.includes('Cannot use \'calls\' to reference ClassFile \'UserRepository\'')
    );
    expect(userRepositoryCallError).toBeDefined();
    expect(userRepositoryCallError?.severity).toBe('error');
    
    // Should find error for DataProcessor not being exported
    const dataProcessorError = result.errors.find(err => 
      err.message.includes('DataProcessor') && 
      err.message.includes('is not exported by any file')
    );
    expect(dataProcessorError).toBeDefined();
    expect(dataProcessorError?.severity).toBe('error');
  });
});