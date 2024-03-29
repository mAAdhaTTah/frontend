/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'plugin:@next/next/recommended',
    'react-app',
    'prettier',
    'plugin:storybook/recommended',
  ],
  rules: {
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
  overrides: [
    {
      files: ['*.stories.js'],
      rules: {
        'import/no-anonymous-default-export': 'off',
        'import/no-default-export': 'off',
      },
    },
  ],
};
