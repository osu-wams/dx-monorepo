import { renderHook } from '@testing-library/react-hooks';
import { wrapper } from '../test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useResetApiCache } from './../../src/api/admin';

const mock = new MockAdapter(axios);

describe('useResetApiCache', () => {
  it('performs the call', async () => {
    mock.onGet('/api/admin/reset-api-cache').replyOnce(200);
    const { result, waitForNextUpdate } = renderHook(() => useResetApiCache(), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('handles an error', async () => {
    mock.onGet('/api/admin/reset-api-cache').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => useResetApiCache(), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(1);
  });
});
