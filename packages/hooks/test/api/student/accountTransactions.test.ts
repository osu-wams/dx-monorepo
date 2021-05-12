import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useAccountTransactions, mockAccountTransactions } from '../../../src/api/student/accountTransactions';
import { wrapper } from '../../test-utils';

const mock = new MockAdapter(axios);

describe('useAccountTransactions', () => {
  it('gets academic status on successful returns', async () => {
    mock.onGet('/api/student/account-transactions').reply(200, mockAccountTransactions.data);
    const { result, waitForNextUpdate } = renderHook(() => useAccountTransactions(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockAccountTransactions.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/student/account-transactions').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useAccountTransactions(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual(undefined);
  });
});
