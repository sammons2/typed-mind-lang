import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testMatch: ['src/**/*.test.ts'],
    environment: 'node',
  },
});