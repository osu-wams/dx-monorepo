import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { wrapper } from '../test-utils';
import { mockGrouper, useGrouper } from '../../src/api/grouper';

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe('useGrouper', () => {
  it('gets grouper group on successful returns', async () => {
    mock.onGet('/api/grouper?group=covidvac-student').reply(200, mockGrouper);
    const { result, waitForNextUpdate } = renderHook(() => useGrouper('covidvac-student'), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toBeDefined;
    expect(Object.keys(result.current.data![0]).sort).toEqual(Object.keys(mockGrouper[0]).sort);
  });
  it('handles api error', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mock.onGet('/api/grouper?group=covidvac-student').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useGrouper('covidvac-student'), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(2)
  });
});
