import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/core/index.ts'],
  format: ['esm', 'cjs'],
  // Declarations come from `tsc` rather than from tsup: tsup 8 still injects the
  // `baseUrl` TypeScript 6 deprecates, and one type emitter is one fewer thing to keep
  // agreeing with the `exports` map.
  dts: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: 'es2022',
  tsconfig: 'tsconfig.build.json',
});
