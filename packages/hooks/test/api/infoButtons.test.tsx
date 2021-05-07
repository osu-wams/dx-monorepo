import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useInfoButtons, mockInfoButtons, useInfoButtonsState } from '../../src/api/infoButtons';
import { wrapper } from '../test-utils';

const mock = new MockAdapter(axios);

describe('useInfoButtons', () => {
  it('gets info buttons on successful returns', async () => {
    mock.onGet('/api/info-buttons').reply(200, mockInfoButtons.data);
    const { result, waitForNextUpdate } = renderHook(() => useInfoButtons());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockInfoButtons.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/info-buttons').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useInfoButtons());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
});

describe('useInfoButtonsState', () => {
  it('gets info buttons on successful returns', async () => {
    mock.onGet('/api/info-buttons').reply(200, mockInfoButtons.data);
    const { result, waitForNextUpdate } = renderHook(() => useInfoButtonsState(), { wrapper });
    expect(result.current.infoButtons).toEqual([]);
    await waitForNextUpdate();
    expect(result.current.infoButtons).toEqual(mockInfoButtons.data);
  });
});
