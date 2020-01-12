module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/src/types/', '/src/mocks', '/dist/'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  modulePathIgnorePatterns: ['/dist/'],
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}', '!src/setupTests.ts', '!src/types/**/*', '!src/mocks/**/*'],
  coverageReporters: ['json', 'lcovonly', 'text', 'clover'],
};
