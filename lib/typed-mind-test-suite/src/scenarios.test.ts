import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const scenariosDir = join(__dirname, '..', 'scenarios');

describe('TypedMind DSL Validation Scenarios', () => {
  const checker = new DSLChecker();
  
  // Get all scenario files
  const scenarioFiles = readdirSync(scenariosDir)
    .filter(f => f.endsWith('.tmd'))
    .sort();

  scenarioFiles.forEach(file => {
    it(`should validate ${file}`, () => {
      const content = readFileSync(join(scenariosDir, file), 'utf-8');
      const result = checker.check(content);
      
      // Create a clean output for snapshots
      const output = {
        file,
        valid: result.valid,
        errors: result.errors.map(err => ({
          line: err.position.line,
          column: err.position.column,
          message: err.message,
          severity: err.severity,
          suggestion: err.suggestion
        }))
      };
      
      expect(output).toMatchSnapshot();
    });
  });
});