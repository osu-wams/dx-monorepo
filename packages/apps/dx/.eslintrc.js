module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['react-hooks'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    'react/prop-types': 0,
    'new-cap': 0,
    'capitalized-comments': 0,
    'padding-line-between-statements': 'warn',
    camelcase: 'warn',
    eqeqeq: 'warn',
    'no-else-return': 'warn',
    'no-negated-condition': 'warn',
    'spaced-comment': 'warn',
    'no-implicit-coercion': 'warn',
    'no-unneeded-ternary': 'warn',
    'no-case-declarations': 'warn',
    'prefer-regex-literals': 'warn',
    'one-var': 'warn',
    'prefer-const': 'warn',
    'no-return-assign': 'warn',
    '@typescript-eslint/no-unused-expressions': 'warn',
    '@typescript-eslint/camelcase': 'warn',
    '@typescript-eslint/interface-name-prefix': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/ban-types': 'warn',
    'react/jsx-fragments': 'warn',
    'react/jsx-sort-props': 'warn',
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-curly-newline': 'warn',
    'react/no-array-index-key': 'warn',
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
