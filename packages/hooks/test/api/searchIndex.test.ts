import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { usePageSearchIndex, mockPageSearchIndex } from '../../src/api/searchIndex';
import { queryCache } from 'react-query';

const mock = new MockAdapter(axios);
afterEach(() => {
  queryCache.clear();
  mock.reset();
});
describe('usePageContent', () => {
  it('gets page contents on successful returns', async () => {
    mock.onGet('/api/searchIndex/pages').reply(200, mockPageSearchIndex.pageSearchIndexData);
    const { result, waitForNextUpdate } = renderHook(() => usePageSearchIndex());
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockPageSearchIndex.pageSearchIndexData);
  });

  it('handles api error', async () => {
    mock.onGet('/api/searchIndex/pages').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => usePageSearchIndex());
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(2);
  });
});
