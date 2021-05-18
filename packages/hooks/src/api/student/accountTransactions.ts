import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import mocks from '../../mocks/student/accountTransactions';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants';

export const mockAccountTransactions = mocks;

export const useAccountTransactions = (
  opts: UseQueryOptions<Types.AccountTransactions, Error> = REACT_QUERY_DEFAULT_CONFIG,
) => useQuery('/api/student/account-transactions', opts);
