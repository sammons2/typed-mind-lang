import { describe, it, expect } from 'vitest';
import { parseArgs } from 'util';

// Options configuration matching the CLI
const options = {
  help: {
    type: 'boolean' as const,
    short: 'h',
    description: 'Show help',
  },
  check: {
    type: 'string' as const,
    short: 'c',
    description: 'Check a DSL file for errors',
  },
  render: {
    type: 'string' as const,
    short: 'r',
    description: 'Render a DSL file interactively',
  },
  output: {
    type: 'string' as const,
    short: 'o',
    description: 'Output static HTML file',
  },
  port: {
    type: 'string' as const,
    short: 'p',
    description: 'Port for interactive renderer (default: 3000)',
  },
  'no-browser': {
    type: 'boolean' as const,
    description: 'Do not open browser automatically',
  },
  'skip-orphan-check': {
    type: 'boolean' as const,
    description: 'Skip orphan entity validation (for documentation)',
  },
};

describe('CLI parseArgs utilities', () => {
  it('should parse --check flag with file path', () => {
    const args = ['--check', 'example.tmd'];

    const parsed = parseArgs({
      args,
      options,
      allowPositionals: true,
    });

    expect(parsed.values.check).toBe('example.tmd');
    expect(parsed.values.render).toBeUndefined();
    expect(parsed.positionals).toEqual([]);
  });

  it('should parse --render flag with options', () => {
    const args = ['--render', 'example.tmd', '--output', 'output.html'];

    const parsed = parseArgs({
      args,
      options,
      allowPositionals: true,
    });

    expect(parsed.values.render).toBe('example.tmd');
    expect(parsed.values.output).toBe('output.html');
    expect(parsed.values.check).toBeUndefined();
  });

  it('should handle --port option as number', () => {
    const args = ['--render', 'example.tmd', '--port', '8080'];

    const parsed = parseArgs({
      args,
      options,
      allowPositionals: true,
    });

    expect(parsed.values.port).toBe('8080');
    // Test the port conversion logic used in the CLI
    const portNumber = parseInt(parsed.values.port || '3000', 10);
    expect(portNumber).toBe(8080);
    expect(typeof portNumber).toBe('number');
  });

  it('should parse --no-browser flag correctly', () => {
    const args = ['--render', 'example.tmd', '--no-browser'];

    const parsed = parseArgs({
      args,
      options,
      allowPositionals: true,
    });

    expect(parsed.values['no-browser']).toBe(true);
    expect(parsed.values.render).toBe('example.tmd');
  });

  it('should parse short flags correctly', () => {
    const args = ['-c', 'example.tmd'];

    const parsed = parseArgs({
      args,
      options,
      allowPositionals: true,
    });

    expect(parsed.values.check).toBe('example.tmd');
  });

  it('should handle help flag', () => {
    const args = ['--help'];

    const parsed = parseArgs({
      args,
      options,
      allowPositionals: true,
    });

    expect(parsed.values.help).toBe(true);
  });

  it('should handle mixed options', () => {
    const args = ['--render', 'example.tmd', '--port', '9000', '--no-browser', '--skip-orphan-check'];

    const parsed = parseArgs({
      args,
      options,
      allowPositionals: true,
    });

    expect(parsed.values.render).toBe('example.tmd');
    expect(parsed.values.port).toBe('9000');
    expect(parsed.values['no-browser']).toBe(true);
    expect(parsed.values['skip-orphan-check']).toBe(true);
  });

  it('should handle positional arguments', () => {
    const args = ['example.tmd'];

    const parsed = parseArgs({
      args,
      options,
      allowPositionals: true,
    });

    expect(parsed.positionals).toEqual(['example.tmd']);
    expect(parsed.values.check).toBeUndefined();
    expect(parsed.values.render).toBeUndefined();
  });
});