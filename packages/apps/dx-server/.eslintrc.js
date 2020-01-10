module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  rules: {
    'import/extensions': 0,
    'new-cap': 0,
    camelcase: 'warn',
    'capitalized-comments': 'warn',
    'no-negated-condition': 'warn',
    'padding-line-between-statements': 'warn',
    '@typescript-eslint/camelcase': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/interface-name-prefix': 'warn',
  },
  overrides: [
    {
      files: ['**/__tests__/*', '**/__mocks__/*'],
      env: {
        jest: true,
      },
    },
  ],
};
