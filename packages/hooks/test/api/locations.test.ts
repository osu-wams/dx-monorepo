import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useLocations, getLocations, mockLocations } from '../../src/api/locations';
import { wrapper } from '../test-utils';

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe('getLocations', () => {
  it('gets locations on successful returns', async () => {
    mock.onGet('/api/locations/cascade').replyOnce(200, mockLocations.data);
    const result = await getLocations('cascade');
    expect(result).toEqual(mockLocations.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/locations/cascade').replyOnce(500);
    await getLocations('cascade').catch(err => expect(err.message).toEqual('Request failed with status code 500'));
  });
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
