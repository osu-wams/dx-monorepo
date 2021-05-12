import axios from 'axios';
import { wrapper } from '../test-utils';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { usePageSearchIndexState, usePageSearchIndex, mockPageSearchIndex } from '../../src/api/searchIndex';

const mock = new MockAdapter(axios);
afterEach(() => {
  mock.reset();
});
describe('usePageSearchIndex', () => {
  it('gets page contents on successful returns', async () => {
    mock.onGet('/api/searchIndex/pages').reply(200, mockPageSearchIndex.pageSearchIndexData);
    const { result, waitForNextUpdate } = renderHook(() => usePageSearchIndex(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockPageSearchIndex.pageSearchIndexData);
  });

  it('handles api error', async () => {
    mock.onGet('/api/searchIndex/pages').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => usePageSearchIndex(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(2);
  });
});

describe('usePageSearchIndexState', () => {
  it('performs the call', async () => {
    mock.onGet('/api/searchIndex/pages').reply(200, mockPageSearchIndex.pageSearchIndexData);
    const { result, waitForNextUpdate } = renderHook(() => usePageSearchIndexState(), { wrapper });
    expect(result.current.pageSearchIndex.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.pageSearchIndex.isLoading).toBeFalsy();
    expect(result.current.pageSearchIndex.data).toEqual(mockPageSearchIndex.pageSearchIndexData);
  });

  it('handles an error', async () => {
    mock.onGet('/api/searchIndex/pages').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => usePageSearchIndexState(), { wrapper });
    expect(result.current.pageSearchIndex.isLoading).toBeTruthy();
    expect(result.current.pageSearchIndex.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.pageSearchIndex.data).toEqual([]);
    expect(result.current.pageSearchIndex.isLoading).toBeTruthy();
    expect(result.current.pageSearchIndex.isSuccess).toBeFalsy();
  });
});
