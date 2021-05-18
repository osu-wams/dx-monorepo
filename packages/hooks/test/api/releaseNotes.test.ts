import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useReleaseNotes, mockReleaseNotes } from '../../src/api/releaseNotes';
import { wrapper } from '../test-utils';

const mock = new MockAdapter(axios);

const api = '/api/release-notes';

afterEach(() => {
  mock.reset();
});

describe('useReleaseNotes', () => {
  it('gets page contents on successful returns', async () => {
    mock.onGet(api).reply(200, mockReleaseNotes.releaseNotesData);
    const { result, waitForNextUpdate } = renderHook(() => useReleaseNotes(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockReleaseNotes.releaseNotesData);
  });

  it('handles api error', async () => {
    mock.onGet(api).reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useReleaseNotes(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(2);
  });
});
