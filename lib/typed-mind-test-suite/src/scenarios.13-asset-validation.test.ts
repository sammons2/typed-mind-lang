import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-13-asset-validation', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-13-asset-validation.tmd';

  it('should validate asset entities and their relationships', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Should be invalid due to orphaned entities
    expect(result.valid).toBe(false);
    
    // Should have exactly 5 errors (including orphaned entities)
    expect(result.errors).toHaveLength(5);
    
    // Check for orphaned AssetsFile error
    const orphanedAssetsFileError = result.errors.find(err =>
      err.message === "Orphaned file 'AssetsFile' - none of its exports are imported" &&
      err.position.line === 6 &&
      err.position.column === 1
    );
    expect(orphanedAssetsFileError).toBeDefined();
    expect(orphanedAssetsFileError?.severity).toBe('error');
    expect(orphanedAssetsFileError?.suggestion).toBe('Remove this file or import its exports somewhere');
    
    // Check for orphaned UnexportedAsset error
    const orphanedUnexportedAssetError = result.errors.find(err => 
      err.message === "Orphaned entity 'UnexportedAsset'" &&
      err.position.line === 15 &&
      err.position.column === 1
    );
    expect(orphanedUnexportedAssetError).toBeDefined();
    expect(orphanedUnexportedAssetError?.severity).toBe('error');
    expect(orphanedUnexportedAssetError?.suggestion).toBe('Remove or reference this entity');
    
    // All errors should be of severity 'error'
    expect(result.errors.every(err => err.severity === 'error')).toBe(true);
  });
});