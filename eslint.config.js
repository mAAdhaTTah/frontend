import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import storybookPlugin from 'eslint-plugin-storybook';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
  js.configs.recommended,
  // eslint-disable-next-line import/no-named-as-default-member
  nextPlugin.configs.recommended,
  // eslint-disable-next-line import/no-named-as-default-member
  nextPlugin.configs['core-web-vitals'],
  // eslint-disable-next-line import/no-named-as-default-member
  ...storybookPlugin.configs['flat/recommended'],
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  reactHooksPlugin.configs.flat.recommended,
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      'import/resolver': 'typescript',
    },
    rules: {
      'no-unused-vars': 'off',
      'import/named': 2,
      'import/namespace': 2,
      'import/default': 2,
      'import/export': 2,
      'import/no-absolute-path': 2,
      'import/first': 2,
      'import/newline-after-import': 2,
      'import/no-named-as-default': 1,
      'import/no-named-as-default-member': 1,
      'import/no-duplicates': 1,
      'import/no-deprecated': 1,
      'import/order': [
        1,
        {
          groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
          'newlines-between': 'never',
        },
      ],
    },
  },
  {
    files: ['*.stories.js', '*.stories.ts', '*.stories.tsx', '*.stories.jsx'],
    rules: {
      'import/no-anonymous-default-export': 'off',
      'import/no-default-export': 'off',
    },
  },
];
