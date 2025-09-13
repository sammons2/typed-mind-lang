import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-07-duplicate-paths', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-07-duplicate-paths.tmd';

  it('should detect duplicate file paths as validation errors', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // The DSL should be invalid due to duplicate paths
    expect(result.valid).toBe(false);
    
    // Should have exactly 5 errors
    expect(result.errors).toHaveLength(5);

    // Check the duplicate path error details
    const duplicatePathError = result.errors.find(err =>
      err.message === "Path 'src/shared/utils.ts' already used by File 'FileOne'"
    );
    expect(duplicatePathError).toBeDefined();
    expect(duplicatePathError?.position.line).toBe(10);
    expect(duplicatePathError?.position.column).toBe(1);
    expect(duplicatePathError?.severity).toBe('error');
    expect(duplicatePathError?.suggestion).toBe("Each File/ClassFile must have a unique path. Consider using ClassFile fusion with #:");

    // Check for orphaned file errors
    const orphanedFileOneError = result.errors.find(err =>
      err.message === "Orphaned file 'FileOne' - none of its exports are imported"
    );
    expect(orphanedFileOneError).toBeDefined();
    expect(orphanedFileOneError?.position.line).toBe(7);

    const orphanedFileTwoError = result.errors.find(err =>
      err.message === "Orphaned file 'FileTwo' - none of its exports are imported"
    );
    expect(orphanedFileTwoError).toBeDefined();
    expect(orphanedFileTwoError?.position.line).toBe(10);

    // Check for orphaned entity errors
    const orphanedHelperOneError = result.errors.find(err =>
      err.message === "Orphaned entity 'helperOne'"
    );
    expect(orphanedHelperOneError).toBeDefined();
    expect(orphanedHelperOneError?.position.line).toBe(13);

    const orphanedHelperTwoError = result.errors.find(err =>
      err.message === "Orphaned entity 'helperTwo'"
    );
    expect(orphanedHelperTwoError).toBeDefined();
    expect(orphanedHelperTwoError?.position.line).toBe(14);
  });
});