import axios from 'axios';
import { Types } from '@osu-wams/lib';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/student/accountTransactions';

export const mockAccountTransactions = mocks;

export const getAccountTransactions = (): Promise<Types.AccountTransactions> =>
  axios.get('/api/student/account-transactions').then(res => res.data);
export const useAccountTransactions = () =>
  useAPICall<Types.AccountTransactions | undefined>({
    api: getAccountTransactions,
    dataTransform: (data: Types.AccountTransactions) => data,
    initialState: undefined,
  });
