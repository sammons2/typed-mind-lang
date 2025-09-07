import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/cli.ts'],
    format: ['cjs'],
    dts: false,
    clean: true,
    skipNodeModulesBundle: true,
    external: ['typescript', '@sammons/typed-mind'],
  },
  {
    entry: ['src/index.ts'],
    format: ['cjs'],
    dts: true,
    clean: false,
    skipNodeModulesBundle: true,
    external: ['typescript', '@sammons/typed-mind'],
  },
]);