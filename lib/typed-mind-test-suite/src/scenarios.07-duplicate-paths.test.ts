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
    
    // Should have exactly one error
    expect(result.errors).toHaveLength(1);
    
    // Check the duplicate path error details
    const duplicatePathError = result.errors[0];
    expect(duplicatePathError.position.line).toBe(10);
    expect(duplicatePathError.position.column).toBe(1);
    expect(duplicatePathError.message).toBe("Path 'src/shared/utils.ts' already used by File 'FileOne'");
    expect(duplicatePathError.severity).toBe('error');
    expect(duplicatePathError.suggestion).toBe("Each File/ClassFile must have a unique path. Consider using ClassFile fusion with #:");
  });
});