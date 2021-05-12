import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { usePageContent, mockPageContents } from '../../src/api/pageContents';
import { wrapper } from '../test-utils';

const mock = new MockAdapter(axios);
afterEach(() => {
  mock.reset();
});
describe('usePageContent', () => {
  it('gets page contents on successful returns', async () => {
    mock.onGet('/api/page-content/about-page-title').reply(200, mockPageContents.pageContentData);
    const { result, waitForNextUpdate } = renderHook(() => usePageContent('about-page-title'), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockPageContents.pageContentData);
  });
  it('handles api error', async () => {
    mock.onGet('/api/page-content/about-page-title').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => usePageContent('about-page-title'), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(2);
  });
});
