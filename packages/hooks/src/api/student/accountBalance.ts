import axios from 'axios';
import { Types } from '@osu-wams/lib';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/student/accountBalance';

export const mockAccountBalance = mocks;

export const getAccountBalance = (): Promise<Types.AccountBalance> =>
  axios.get('/api/student/account-balance').then(res => res.data);
export const useAccountBalance = () =>
  useAPICall<Types.AccountBalance | undefined>({
    api: getAccountBalance,
    dataTransform: (data: Types.AccountBalance) => data,
    initialState: undefined,
  });
