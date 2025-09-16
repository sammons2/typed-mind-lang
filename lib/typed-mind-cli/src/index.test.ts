import { describe, it, expect } from 'vitest';

describe('Package exports', () => {
  it('should re-export DSLChecker from @sammons/typed-mind', async () => {
    const exports = await import('./index.js');

    expect(exports.DSLChecker).toBeDefined();
    expect(typeof exports.DSLChecker).toBe('function');
  });

  it('should re-export TypedMindRenderer from @sammons/typed-mind-renderer', async () => {
    const exports = await import('./index.js');

    expect(exports.TypedMindRenderer).toBeDefined();
    expect(typeof exports.TypedMindRenderer).toBe('function');
  });

  it('should have all expected exports', async () => {
    const exports = await import('./index.js');

    // Check that we have the main exports we expect
    expect(exports.DSLChecker).toBeDefined();
    expect(exports.TypedMindRenderer).toBeDefined();

    // These exports should be constructor functions/classes
    expect(typeof exports.DSLChecker).toBe('function');
    expect(typeof exports.TypedMindRenderer).toBe('function');
  });

  it('should support both named and namespace imports', async () => {
    // Test named imports
    const { DSLChecker, TypedMindRenderer } = await import('./index.js');
    expect(DSLChecker).toBeDefined();
    expect(TypedMindRenderer).toBeDefined();

    // Test namespace import
    const allExports = await import('./index.js');
    expect(allExports.DSLChecker).toBeDefined();
    expect(allExports.TypedMindRenderer).toBeDefined();
  });
});
