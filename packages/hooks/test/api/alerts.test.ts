import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useDxAlerts, useRaveAlerts, mockAlerts } from '../../src/api/alerts';
import { wrapper } from '../test-utils';

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe('useRaveAlerts', () => {
  it('performs the call', async () => {
    mock.onGet('/api/alerts').replyOnce(200, mockAlerts.raveAlerts.data);
    const { result, waitForNextUpdate } = renderHook(() => useRaveAlerts(), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('handles an error', async () => {
    mock.onGet('/api/alerts').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => useRaveAlerts(), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(1);
  });
});

describe('useDxAlerts', () => {
  it('performs the call', async () => {
    mock.onGet('/api/alerts/dx').replyOnce(200, mockAlerts.dxAlerts.data);
    const { result, waitForNextUpdate } = renderHook(() => useDxAlerts(), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('handles an error', async () => {
    mock.onGet('/api/alerts/dx').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => useDxAlerts(), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(1);
  });
});
