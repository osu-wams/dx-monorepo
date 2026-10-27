// jsdom's window.location can no longer be redefined, so tests run against the default
// http://localhost origin. BASEURL is mocked to '' so API mocks can keep using relative paths.
jest.mock('./constants', () => ({ ...jest.requireActual('./constants'), BASEURL: '' }));

afterEach(() => {
  jest.clearAllMocks();
});

/**
 * Mock storage(s) at a global level.
 */
export const storageMock = {
  clear: jest.fn(),
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(global, 'sessionStorage', { value: storageMock });
Object.defineProperty(global, 'localStorage', { value: storageMock });

// Even with latest react, still running into this on a couple of tests where i could not wrap
// things into an async act. maybe some day this will get fixed, but right now it is just an
// annoying useless warning.
const consoleError = console.error;
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (args[0].includes && !args[0].includes('Warning: An update to %s inside a test was not wrapped in act')) {
      consoleError(...args);
    }
  });
});
