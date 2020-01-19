import useAPICall, { APICall } from '../src/useAPICall';
import { renderHook } from '@testing-library/react-hooks';

const mockedGetItem = jest.fn();
const mockedRemoveItem = jest.fn();
const mockedSetItem = jest.fn();
jest.mock('@osu-wams/utils', () => ({
  __esModule: true,
  storageCache: {
    getItem: () => mockedGetItem(),
    removeItem: () => mockedRemoveItem(),
    setItem: () => mockedSetItem(),
    clear: jest.fn(),
  },
}));

const mockedApi = jest.fn(() => Promise.resolve([]));
const mockedDataTransform = jest.fn();
const mockedErrorCallback = jest.fn();
const mockedPostError = jest.fn();
let testArgs: APICall<string[]>;

describe('useAPICall', () => {
  beforeEach(() => {
    testArgs = {
      api: () => mockedApi(),
      dataTransform: () => mockedDataTransform(),
      initialState: [],
      useCache: false,
      errorCallback: () => mockedErrorCallback(),
      postError: () => mockedPostError(),
    };
  });

  it('performs the call', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAPICall(testArgs));
    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(mockedDataTransform).toHaveBeenCalled();
    expect(mockedGetItem).toHaveBeenCalled();
    expect(mockedSetItem).toHaveBeenCalled();
    expect(mockedRemoveItem).not.toHaveBeenCalled();
    expect(mockedErrorCallback).not.toHaveBeenCalled();
    expect(mockedPostError).not.toHaveBeenCalled();
  });

  it('performs the call returning cached data', async () => {
    mockedGetItem.mockReturnValueOnce(['bob', 'ross']);
    testArgs.initialState = [];
    testArgs.useCache = true;
    const { result } = renderHook(() => useAPICall(testArgs));

    expect(result.current.loading).toBeFalsy();
    expect(result.current.data).toEqual(['bob', 'ross']);
    expect(mockedDataTransform).not.toHaveBeenCalled();
    expect(mockedGetItem).toHaveBeenCalled();
    expect(mockedSetItem).not.toHaveBeenCalled();
    expect(mockedRemoveItem).not.toHaveBeenCalled();
    expect(mockedErrorCallback).not.toHaveBeenCalled();
    expect(mockedPostError).not.toHaveBeenCalled();
  });

  it('handles an HTTP 401', async () => {
    mockedApi.mockRejectedValue({ response: { status: 401 } });
    const { result, waitForNextUpdate } = renderHook(() => useAPICall(testArgs));
    await waitForNextUpdate();

    expect(mockedErrorCallback).not.toHaveBeenCalled();
    expect(mockedPostError).not.toHaveBeenCalled();
    expect(result.current.loading).toBeFalsy();
    expect(mockedGetItem).toHaveBeenCalled();
    expect(mockedSetItem).not.toHaveBeenCalled();
    expect(mockedRemoveItem).not.toHaveBeenCalled();
    expect(window.location.assign).toHaveBeenCalled();
  });

  it('handles an HTTP 403', async () => {
    mockedApi.mockRejectedValue({ response: { status: 403 } });
    const { result, waitForNextUpdate } = renderHook(() => useAPICall(testArgs));
    await waitForNextUpdate();
    expect(mockedErrorCallback).toHaveBeenCalled();
    expect(mockedPostError).toHaveBeenCalled();
    expect(result.current.loading).toBeFalsy();
    expect(mockedGetItem).toHaveBeenCalled();
    expect(mockedSetItem).not.toHaveBeenCalled();
    expect(mockedRemoveItem).toHaveBeenCalled();
  });

  it('skips handling an HTTP 403', async () => {
    mockedApi.mockRejectedValue({ response: { status: 403 } });
    const { result, waitForNextUpdate } = renderHook(() => useAPICall({ ...testArgs, skipPostErrorStatuses: [403] }));
    await waitForNextUpdate();
    expect(mockedErrorCallback).toHaveBeenCalled();
    expect(mockedPostError).not.toHaveBeenCalled();
    expect(result.current.loading).toBeFalsy();
    expect(mockedGetItem).toHaveBeenCalled();
    expect(mockedSetItem).not.toHaveBeenCalled();
    expect(mockedRemoveItem).toHaveBeenCalled();
  });

  it('will not post an error api call or errorcallback', async () => {
    mockedApi.mockRejectedValue({ response: { status: 500 } });
    const { result, waitForNextUpdate } = renderHook(() =>
      useAPICall({ ...testArgs, postError: undefined, errorCallback: undefined }),
    );
    await waitForNextUpdate();
    expect(mockedErrorCallback).not.toHaveBeenCalled();
    expect(mockedPostError).not.toHaveBeenCalled();
    expect(result.current.loading).toBeFalsy();
    expect(mockedGetItem).toHaveBeenCalled();
    expect(mockedSetItem).not.toHaveBeenCalled();
    expect(mockedRemoveItem).toHaveBeenCalled();
  });

  it('handles an HTTP 500', async () => {
    mockedApi.mockRejectedValue({ response: { status: 500 } });
    const { result, waitForNextUpdate } = renderHook(() => useAPICall(testArgs));
    await waitForNextUpdate();
    expect(mockedErrorCallback).toHaveBeenCalled();
    expect(mockedPostError).toHaveBeenCalled();
    expect(result.current.loading).toBeFalsy();
    expect(mockedGetItem).toHaveBeenCalled();
    expect(mockedSetItem).not.toHaveBeenCalled();
    expect(mockedRemoveItem).toHaveBeenCalled();
  });
});
