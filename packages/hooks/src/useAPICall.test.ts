import useAPICall from './useAPICall';
import { act, renderHook } from '@testing-library/react-hooks';

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
  api: jest.fn(),
  query: undefined,
  dataTransform: jest.fn(),
  initialState: {},
  useCache: false,
  errorCallback: jest.fn(),
  postError: jest.fn(),
};

describe('useAPICall', () => {
  it('performs the call', () => {
    const { result } = renderHook(() =>
      useAPICall(
        testArgs.api,
        testArgs.query,
        testArgs.dataTransform,
        testArgs.initialState,
        testArgs.useCache,
        testArgs.errorCallback,
        testArgs.postError,
      ),
    );
    act(() => {
      result.current.data = {};
    });

    expect(result.current.loading).toBeFalsy();
  });
});
