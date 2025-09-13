import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-12-valid-complete', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-12-valid-complete.tmd';

  it('should validate complete program as valid', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);

    // This is a valid complete program - all entities are properly connected
    expect(result.valid).toBe(true);

    // Should have no errors in a valid program
    expect(result.errors).toHaveLength(0);
  });
});