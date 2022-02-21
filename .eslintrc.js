module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    requireConfigFile: false,
  },
  plugins: ['react', 'prettier', 'jsx-a11y', 'import'],
  extends: ['react-app', 'prettier'],
  globals: {
    expect: true,
    describe: true,
    it: true,
    fixture: true,
    test: true,
    jest: true,
    document: true,
    window: true,
    fetch: true,
    navigator: true,
  },
  rules: {
    '@typescript-eslint/no-redeclare': 0,
    'space-before-function-paren': 0,
    'import/no-anonymous-default-export': 0,
    quotes: 0,
    'operator-linebreak': 0,
    'react/jsx-tag-spacing': [
      'error',
      {
        beforeSelfClosing: 'always',
      },
    ],
  },
};
