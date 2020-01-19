import useAPICall from '../src/useAPICall';
import { renderHook } from '@testing-library/react-hooks';

interface IAPICall {
  api: jest.Mock<any, any>;
  query: string | undefined;
  dataTransform: jest.Mock<any, any>;
  initialState: {} | undefined;
  useCache: boolean;
  errorCallback: jest.Mock<any, any>;
  postError: jest.Mock<any, any>;
}

const testArgs: IAPICall = {
  api: jest.fn(() => Promise.resolve({})),
  query: undefined,
  dataTransform: jest.fn(),
  initialState: {},
  useCache: false,
  errorCallback: jest.fn(),
  postError: jest.fn(),
};

describe('useAPICall', () => {
  it('performs the call', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAPICall(testArgs));
    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(testArgs.dataTransform).toHaveBeenCalled();
    expect(testArgs.errorCallback).not.toHaveBeenCalled();
    expect(testArgs.postError).not.toHaveBeenCalled();
  });

  it('handles an HTTP 401', async () => {
    testArgs.api.mockRejectedValue({ response: { status: 401 } });
    const { result, waitForNextUpdate } = renderHook(() => useAPICall(testArgs));
    await waitForNextUpdate();

    expect(testArgs.errorCallback).not.toHaveBeenCalled();
    expect(testArgs.postError).not.toHaveBeenCalled();
    expect(result.current.loading).toBeFalsy();
    expect(window.location.assign).toHaveBeenCalled();
  });

  it('handles an HTTP 403', async () => {
    testArgs.api.mockRejectedValue({ response: { status: 403 } });
    const { result, waitForNextUpdate } = renderHook(() => useAPICall(testArgs));
    await waitForNextUpdate();
    expect(testArgs.errorCallback).toHaveBeenCalled();
    expect(testArgs.postError).toHaveBeenCalled();
    expect(result.current.loading).toBeFalsy();
  });

  it('handles an HTTP 500', async () => {
    testArgs.api.mockRejectedValue({ response: { status: 500 } });
    const { result, waitForNextUpdate } = renderHook(() => useAPICall(testArgs));
    await waitForNextUpdate();
    expect(testArgs.errorCallback).toHaveBeenCalled();
    expect(testArgs.postError).toHaveBeenCalled();
    expect(result.current.loading).toBeFalsy();
  });
});
