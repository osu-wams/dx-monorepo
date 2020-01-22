import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useHolds, mockHolds } from '../../../src/api/student/holds';

const mock = new MockAdapter(axios);

describe('useHolds', () => {
  it('gets holds on successful returns', async () => {
    mock.onGet('/api/student/holds').reply(200, mockHolds.data);
    const { result, waitForNextUpdate } = renderHook(() => useHolds());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockHolds.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/student/holds').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useHolds());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
});
