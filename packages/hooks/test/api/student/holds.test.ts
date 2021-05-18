import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useHolds, mockHolds } from '../../../src/api/student/holds';
import { wrapper } from '../../test-utils';

const mock = new MockAdapter(axios);

describe('useHolds', () => {
  it('gets holds on successful returns', async () => {
    mock.onGet('/api/student/holds').reply(200, mockHolds.data);
    const { result, waitForNextUpdate } = renderHook(() => useHolds(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockHolds.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/student/holds').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useHolds(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.failureCount).toEqual(1);
    expect(result.current.data).toBeUndefined();
  });
});
