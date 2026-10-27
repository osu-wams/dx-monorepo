import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['**/dist/**', '**/coverage/**', '**/node_modules/**', '**/.sf/**'] },
  // Older eslint-disable comments remain in the code for rules this config does not enable.
  { linterOptions: { reportUnusedDisableDirectives: 'off' } },
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    languageOptions: { globals: { ...globals.node, ...globals.jest, ...globals.browser } },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      react.configs.flat.recommended,
      jsxA11y.flatConfigs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node, ...globals.jest, fixture: true },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      'react/prop-types': 'off',
      'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      // React Compiler rules introduced in eslint-plugin-react-hooks 7; the existing effects that sync
      // react-query results into recoil state are intentional.
      'react-hooks/immutability': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    // Ambient declarations legitimately use `declare var`.
    files: ['**/*.d.ts'],
    rules: { 'no-var': 'off' },
  },
  prettier,
);
