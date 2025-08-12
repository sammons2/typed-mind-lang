import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-19-uicomponent-containment', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-19-uicomponent-containment.tmd';

  it('should validate UIComponent containment rules', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    
    // Should be invalid due to containment errors
    expect(result.valid).toBe(false);
    
    // Should have exactly 2 containment errors
    expect(result.errors).toHaveLength(2);
    
    // Check for Sidebar containment error
    const sidebarError = result.errors.find(err => 
      err.message.includes("UIComponent 'Sidebar' is not contained by any other UIComponent")
    );
    expect(sidebarError).toBeDefined();
    expect(sidebarError?.position.line).toBe(12);
    expect(sidebarError?.position.column).toBe(1);
    expect(sidebarError?.severity).toBe('error');
    expect(sidebarError?.suggestion).toBe("Either add 'Sidebar' to another UIComponent's contains list, or mark it as a root component with &!");
    
    // Check for OrphanedComponent containment error
    const orphanedError = result.errors.find(err => 
      err.message.includes("UIComponent 'OrphanedComponent' is not contained by any other UIComponent")
    );
    expect(orphanedError).toBeDefined();
    expect(orphanedError?.position.line).toBe(20);
    expect(orphanedError?.position.column).toBe(1);
    expect(orphanedError?.severity).toBe('error');
    expect(orphanedError?.suggestion).toBe("Either add 'OrphanedComponent' to another UIComponent's contains list, or mark it as a root component with &!");
  });
});