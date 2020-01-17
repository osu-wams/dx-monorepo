import '@testing-library/jest-dom/extend-expect';

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

window.location.assign = jest.fn();

beforeEach(() => {});
