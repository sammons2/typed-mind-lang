import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-42-classfile-inheritance', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-42-classfile-inheritance.tmd';

  it('should handle ClassFile inheritance and implements correctly', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Should be invalid due to import and export issues (based on actual error output)
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(10);
    
    const errorMessages = result.errors.map(err => err.message);
    
    // Should detect that calls cannot reference ClassFile entities
    expect(errorMessages.filter(msg => msg.includes("Cannot use 'calls' to reference ClassFile")).length).toBe(2);
    
    // Should detect orphaned interface entities
    expect(errorMessages).toContain("Orphaned entity 'IUserController'");
    expect(errorMessages).toContain("Orphaned entity 'IAdminController'");
    expect(errorMessages).toContain("Orphaned entity 'IAuditController'");
    
    // Should detect classes not exported by files
    expect(errorMessages).toContain("Class 'IUserController' is not exported by any file");
    expect(errorMessages).toContain("Class 'IAdminController' is not exported by any file");
    expect(errorMessages).toContain("Class 'IAuditController' is not exported by any file");
    
    // Verify specific error positions
    const orphanedIUserError = result.errors.find(err => err.message.includes("Orphaned entity 'IUserController'"));
    expect(orphanedIUserError?.position.line).toBe(28);
    
    const callsError = result.errors.find(err => err.message.includes("Cannot use 'calls' to reference ClassFile 'UserController'"));
    expect(callsError?.position.line).toBe(10);
    expect(callsError?.suggestion).toBe("'calls' can only reference: Function, Class");
    
    // Verify the file contains expected ClassFile inheritance syntax
    expect(content).toContain('UserController #: src/controllers/user.ts <: BaseController, IUserController');
    expect(content).toContain('AdminController #: src/controllers/admin.ts <: BaseController, IAdminController, IAuditController');
    expect(content).toContain('BaseController #: src/controllers/base.ts');
  });
});