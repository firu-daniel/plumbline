import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  resolve: {
    // The demo runs the packages' sources, not their built output, so a change
    // in a package is on screen without a build step in between.
    alias: {
      '@straightedge/agent-qa-attrs': new URL('../../packages/agent-qa-attrs/src/index.ts', import.meta.url)
        .pathname,
    },
  },
});
