import axios from 'axios';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/student/accountBalance';

export const mockAccountBalance = mocks;

export const getAccountBalance = (): Promise<AccountBalance> =>
  axios.get('/api/student/account-balance').then(res => res.data);
export const useAccountBalance = () =>
  useAPICall<AccountBalance | undefined>({
    api: getAccountBalance,
    dataTransform: (data: AccountBalance) => data,
    initialState: undefined,
  });

export interface AccountBalance {
  attributes: AccountBalanceAttributes;
  id: number;
  links: { self: null };
  type: string;
}

export type AccountBalanceAttributes = {
  currentBalance: number;
};
