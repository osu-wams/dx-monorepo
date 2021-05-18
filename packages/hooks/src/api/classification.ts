import mocks from '../mocks/classification';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import { Types } from '@osu-wams/lib';

export const mockClassification = mocks;

export const useClassification = (
  opts: UseQueryOptions<Types.UserClassification, Error> = REACT_QUERY_DEFAULT_CONFIG,
) => useQuery('/api/user/classification', opts);
