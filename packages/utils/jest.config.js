global.window = {};
window.__DEV__ = true;

process.env.TZ = 'UTC';

/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // ts-jest resolves `axios` once per export condition under `moduleResolution: bundler`, producing
        // duplicate (incompatible) type identities. Classic resolution avoids that for the test compile only;
        // builds and `yarn typecheck` keep the package tsconfig as-is.
        tsconfig: { moduleResolution: 'node10', ignoreDeprecations: '6.0' },
      },
    ],
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/mocks/**/*.{ts,tsx}', '!src/**/index.{ts,tsx}'],
  testMatch: ['<rootDir>/test/**/*.(spec|test).{ts,tsx}'],
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
};
