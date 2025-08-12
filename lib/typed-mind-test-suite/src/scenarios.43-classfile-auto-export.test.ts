import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-43-classfile-auto-export', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-43-classfile-auto-export.tmd';

  it('should validate that ClassFile entities are automatically exported', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // The scenario should be invalid due to the regular class without export
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(2); // Orphaned entity + not exported errors
    
    // Should find error for RegularClass being orphaned
    const orphanedError = result.errors.find(err => 
      err.message.includes('RegularClass') && 
      err.message.includes('Orphaned entity')
    );
    expect(orphanedError).toBeDefined();
    expect(orphanedError?.severity).toBe('error');
    expect(orphanedError?.position.line).toBe(31); // Line where RegularClass is defined
    
    // Should find error for RegularClass not being exported
    const notExportedError = result.errors.find(err => 
      err.message.includes('RegularClass') && 
      err.message.includes('is not exported by any file')
    );
    expect(notExportedError).toBeDefined();
    expect(notExportedError?.severity).toBe('error');
    expect(notExportedError?.position.line).toBe(31); // Line where RegularClass is defined
    
    // Should not have errors for ClassFile entities (they auto-export)
    const classFileErrors = result.errors.filter(err => 
      err.message.includes('UserController') ||
      err.message.includes('ProductController') ||
      err.message.includes('BaseController')
    );
    expect(classFileErrors).toHaveLength(0);
  });
});