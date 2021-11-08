import { useQuery, UseQueryOptions } from 'react-query';
import { Types } from '@osu-wams/lib';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';

export const useColleges = (opts: UseQueryOptions<Types.Colleges[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/colleges', opts);
