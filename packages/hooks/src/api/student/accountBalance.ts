import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import mocks from '../../mocks/student/accountBalance';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants';

export const mockAccountBalance = mocks;

export const useAccountBalance = (opts: UseQueryOptions<Types.AccountBalance, Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/student/account-balance', opts);
