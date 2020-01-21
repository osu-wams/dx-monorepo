import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { usePageContent, mockPageContents } from '../../src/api/pageContents';

const mock = new MockAdapter(axios);

describe('usePageContent', () => {
  it('gets page contents on successful returns', async () => {
    mock.onGet('/api/page-content/beta-page-title').reply(200, mockPageContents.data);
    const { result, waitForNextUpdate } = renderHook(() => usePageContent('beta-page-title'));
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockPageContents.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/page-content/beta-page-title').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => usePageContent('beta-page-title'));
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
});
