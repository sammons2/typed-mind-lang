import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli.ts', 'src/index.ts'],
  format: ['cjs', 'esm'],
  dts: { resolve: true, entry: ['src/index.ts'] },
  clean: true,
  sourcemap: true,
  minify: false,
  splitting: false,
  treeshake: true,
  bundle: false,
  onSuccess: 'chmod +x dist/cli.cjs',
  outExtension: ({ format }) => ({
    js: `.${format === 'cjs' ? 'cjs' : 'mjs'}`
  }),
  esbuildOptions: {
    platform: 'node',
    banner: {
      js: (context) => context.path.includes('cli') ? '#!/usr/bin/env node\n' : ''
    }
  }
});