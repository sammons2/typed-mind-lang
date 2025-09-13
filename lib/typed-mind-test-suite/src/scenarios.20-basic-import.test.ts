import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-20-basic-import', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-20-basic-import.tmd';

  it('should validate basic import functionality', () => {
    const filePath = join(__dirname, '..', 'scenarios', scenarioFile);
    const content = readFileSync(filePath, 'utf-8');
    const result = checker.check(content, filePath);
    
    // Should be invalid due to orphaned entity
    expect(result.valid).toBe(false);
    
    // Should have exactly 2 errors for orphaned entities
    expect(result.errors).toHaveLength(2);

    // Check for orphaned entities
    expect(result.errors.some(err => err.message.includes("Orphaned entity 'startApp'"))).toBe(true);
    expect(result.errors.some(err => err.message.includes("Orphaned entity 'validateUser'"))).toBe(true);
  });
});