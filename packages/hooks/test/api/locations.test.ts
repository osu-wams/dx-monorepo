import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useLocations, mockLocations } from '../../src/api/locations';
import { wrapper } from '../test-utils';

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe('useLocations', () => {
  it('performs the call', async () => {
    mock.onGet('/api/locations/cascade').replyOnce(200, mockLocations.data);
    const { result, waitForNextUpdate } = renderHook(() => useLocations('cascade'), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('handles an error', async () => {
    mock.onGet('/api/locations/cascade').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => useLocations('cascade'), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(1);
  });
});
