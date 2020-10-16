import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useStatus, mockStatus, sortedByStatus, allOperational, withStickyIncidents } from '../../src/api/status';
import { queryCache } from 'react-query';

const mock = new MockAdapter(axios);

afterEach(() => {
  queryCache.clear();
  mock.reset();
});

describe('useStatus', () => {
  it('gets all statuses', async () => {
    mock.onGet('/api/status').reply(200, mockStatus.statusData);
    const { result, waitForNextUpdate } = renderHook(() => useStatus());
    await waitForNextUpdate();

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockStatus.statusData);
  });

  it('sorts the components based on the status', async () => {
    mock.onGet('/api/status').reply(200, mockStatus.statusData);
    const { result, waitForNextUpdate } = renderHook(() => useStatus());
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(sortedByStatus(result.current.data).map(c => c.statusText)).toStrictEqual([
      'Major Outage',
      'Performance Issues',
      'Operational',
      'Operational',
    ]);
  });
  it('returns that some components have non operational status', async () => {
    mock.onGet('/api/status').reply(200, mockStatus.statusData);
    const { result, waitForNextUpdate } = renderHook(() => useStatus());
    await waitForNextUpdate();
    expect(allOperational(result.current.data)).toBeFalsy();
  });
  it('returns that all components are operational', async () => {
    mock.onGet('/api/status').reply(
      200,
      mockStatus.statusData.map(c => ({ ...c, status: 1 })),
    );
    const { result, waitForNextUpdate } = renderHook(() => useStatus());
    await waitForNextUpdate();
    expect(allOperational(result.current.data)).toBeTruthy();
  });
  it('returns components with sticky incidents', async () => {
    mock.onGet('/api/status').reply(200, mockStatus.statusData);
    const { result, waitForNextUpdate } = renderHook(() => useStatus());
    await waitForNextUpdate();
    expect(withStickyIncidents(result.current.data)).toHaveLength(1);
  });
  it('returns no components with sticky incidents', async () => {
    mock.onGet('/api/status').reply(
      200,
      mockStatus.statusData.map(c => ({ ...c, incidents: [] })),
    );
    const { result, waitForNextUpdate } = renderHook(() => useStatus());
    await waitForNextUpdate();
    expect(withStickyIncidents(result.current.data)).toHaveLength(0);
  });
});
