import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useAccountBalance, mockAccountBalance } from '../../../src/api/student/accountBalance';
import { wrapper } from '../../test-utils';

const mock = new MockAdapter(axios);

describe('useAccountBalance', () => {
  it('gets account balance on successful returns', async () => {
    mock.onGet('/api/student/account-balance').reply(200, mockAccountBalance.data);
    const { result, waitForNextUpdate } = renderHook(() => useAccountBalance(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockAccountBalance.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/student/account-balance').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useAccountBalance(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.failureCount).toEqual(1);
    expect(result.current.data).toBeUndefined();
  });
});
