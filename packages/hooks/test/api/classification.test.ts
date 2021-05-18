import { renderHook } from '@testing-library/react-hooks';
import { wrapper } from '../test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useClassification, mockClassification } from '../../src/api/classification';

const mock = new MockAdapter(axios);

describe('useClassification', () => {
  it('performs the call', async () => {
    mock.onGet('/api/user/classification').replyOnce(200, mockClassification.data);
    const { result, waitForNextUpdate } = renderHook(() => useClassification(), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('handles an error', async () => {
    mock.onGet('/api/user/classification').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => useClassification(), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(1);
  });
});
