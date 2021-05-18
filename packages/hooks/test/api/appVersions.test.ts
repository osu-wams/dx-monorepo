import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useAppVersions } from '../../src/api/appVersions';
import { wrapper } from '../test-utils';

const mock = new MockAdapter(axios);

describe('useAppVersions', () => {
  it('gets versions on successful returns', async () => {
    mock.onGet('/healthcheck').reply(200, { version: 'server-tested-version' });
    mock.onGet('/app_version').reply(200, 'client-tested-version');
    const { result, waitForNextUpdate } = renderHook(() => useAppVersions(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.appVersion.isLoading).toBeFalsy();
    expect(result.current.healthCheck.isLoading).toBeFalsy();
    expect(result.current.appVersion.data).toEqual('client-tested-version');
    expect(result.current.healthCheck.data).toEqual({ version: 'server-tested-version' });
  });
  it('handles api errors with default data', async () => {
    mock.onGet('/healthcheck').reply(500);
    mock.onGet('/app_version').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useAppVersions(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.appVersion.isLoading).toBeFalsy();
    expect(result.current.healthCheck.isLoading).toBeFalsy();
    expect(result.current.appVersion.failureCount).toEqual(1);
    expect(result.current.healthCheck.failureCount).toEqual(1);
  });
});
