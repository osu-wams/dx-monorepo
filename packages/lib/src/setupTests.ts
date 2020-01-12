import '@testing-library/jest-dom/extend-expect';
import * as cache from './react/util/cache';

jest.spyOn(window.location, 'assign').mockImplementation(url => console.log(url));

afterEach(() => {
  jest.clearAllMocks();
});

// Mock sessionStorage interface
beforeEach(() => {
  Storage.prototype.clear = jest.fn();
  Storage.prototype.getItem = jest.fn();
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.removeItem = jest.fn();
  cache.clear();
});
