import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useDxAlerts, useRaveAlerts, mockAlerts } from '../../src/api/alerts';

const mock = new MockAdapter(axios);

describe('getRaveAlerts', () => {
  it('gets versions on successful returns', async () => {
    mock.onGet('/api/alerts').reply(200, mockAlerts.raveAlerts.data);
    const { result, waitForNextUpdate } = renderHook(() => useRaveAlerts());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockAlerts.raveAlerts.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/alerts').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useRaveAlerts());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
});

describe('getDxAlerts', () => {
  it('gets versions on successful returns', async () => {
    mock.onGet('/api/alerts/dx').reply(200, mockAlerts.dxAlerts.data);
    const { result, waitForNextUpdate } = renderHook(() => useDxAlerts());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockAlerts.dxAlerts.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/alerts/dx').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useDxAlerts());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
});
