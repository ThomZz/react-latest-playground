import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import tanstackPluginQuery from '@tanstack/eslint-plugin-query';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended, tanstackPluginQuery.configs['flat/recommended']],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  },
  {
    // Jest globals for co-located test files.
    files: ['**/*.{test,spec}.{ts,tsx}', '**/__tests__/**'],
    languageOptions: {
      globals: globals.jest
    }
  },
  // Runs Prettier as an ESLint rule (so violations show as editor squiggles)
  // and disables ESLint's own formatting rules. Keep this last.
  prettierRecommended,
  {
    // Surface formatting issues as warnings (yellow), distinct from real
    // lint errors (red).
    rules: {
      'prettier/prettier': 'warn'
    }
  }
);
