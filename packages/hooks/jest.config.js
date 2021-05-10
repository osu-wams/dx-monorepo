global.window = {};
window.__DEV__ = true;

module.exports = {
  preset: 'ts-jest',
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/mocks/**/*.{ts,tsx}', '!src/**/index.{ts,tsx}'],
  testMatch: ['<rootDir>/test/**/*.(spec|test).{ts,tsx}'],
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
};
