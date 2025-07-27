import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/cli.ts'],
  format: ['cjs'],
  dts: {
    entry: ['src/index.ts'],
  },
  sourcemap: true,
  clean: true,
  external: ['vscode-languageserver', 'vscode-languageserver-textdocument'],
});