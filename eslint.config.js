import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  { ignores: ['**/dist/**', '**/.tsbuild/**', '**/coverage/**', '**/node_modules/**', '**/*.tsbuildinfo'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    },
  },
  {
    // The layering rule this repository is built on: `src/core` is the mechanism and knows
    // nothing about a rendering library. Only `src/react` may bind it to React. A core module
    // that imports React is the one architectural mistake that is cheap to make and expensive
    // to undo, so it fails the build rather than a review.
    files: ['packages/*/src/core/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: 'react', message: 'src/core must stay framework-agnostic — bind it in src/react.' },
            { name: 'react-dom', message: 'src/core must stay framework-agnostic — bind it in src/react.' },
          ],
        },
      ],
    },
  },
);
