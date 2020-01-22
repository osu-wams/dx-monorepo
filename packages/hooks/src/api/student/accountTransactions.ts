import axios from 'axios';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/student/accountTransactions';

export const mockAccountTransactions = mocks;

export const getAccountTransactions = (): Promise<AccountTransactions> =>
  axios.get('/api/student/account-transactions').then(res => res.data);
export const useAccountTransactions = () =>
  useAPICall<AccountTransactions | undefined>({
    api: getAccountTransactions,
    dataTransform: (data: AccountTransactions) => data,
    initialState: undefined,
  });

export interface AccountTransactions {
  attributes: { transactions: [Transaction] };
  id: string;
  links: { self: null };
  type: string;
}

export interface Transaction {
  amount: number;
  category: string;
  description: string;
  entryDate: Date;
  term: string;
  transactionType: string;
}
