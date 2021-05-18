import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';

export const useResetApiCache = (opts: UseQueryOptions<any, Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/admin/reset-api-cache', { ...opts, retry: false });
