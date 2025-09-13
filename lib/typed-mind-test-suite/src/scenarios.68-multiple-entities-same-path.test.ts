import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-68-multiple-entities-same-path', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-68-multiple-entities-same-path.tmd';

  it('should allow multiple constants and DTOs to share the same path', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // The DSL should be invalid due to orphaned entities, even though path sharing is allowed
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(4);

    // Verify all errors are about orphaned entities, not path conflicts
    result.errors.forEach(error => {
      expect(error.message).toMatch(/^Orphaned entity/);
    });
  });
});