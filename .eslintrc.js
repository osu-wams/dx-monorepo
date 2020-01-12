module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'prettier', 'jsx-a11y', 'import', 'jest-dom'],
  extends: ['xo', 'xo-react', 'react-app', 'prettier', 'prettier/react', 'plugin:jest-dom/recommended'],
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
    'space-before-function-paren': 0,
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
