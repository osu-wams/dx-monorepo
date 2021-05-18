import { Types } from '@osu-wams/lib';
import mocks from '../../mocks/student/holds';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants';

export const mockHolds = mocks;

export const useHolds = (opts: UseQueryOptions<Types.Hold[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/student/holds', opts);
