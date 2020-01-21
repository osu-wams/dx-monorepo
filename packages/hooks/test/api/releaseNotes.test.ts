import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useReleaseNotes, mockReleaseNotes } from '../../src/api/releaseNotes';

const mock = new MockAdapter(axios);

describe('useReleaseNotes', () => {
  it('gets page contents on successful returns', async () => {
    mock.onGet('/api/release-notes').reply(200, mockReleaseNotes.data);
    const { result, waitForNextUpdate } = renderHook(() => useReleaseNotes());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockReleaseNotes.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/release-notes').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useReleaseNotes());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
});
