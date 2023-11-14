import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import { grouperData } from '../mocks/grouper';

export const mockGrouper = grouperData;

/**
 * Returns an array of grouper
 */
export const useGrouper = (
  group: string,
  opts: UseQueryOptions<Types.Grouper[], Error> = REACT_QUERY_DEFAULT_CONFIG,
) => {
  return useQuery(`/api/grouper?group=${group}`, opts);
};

/**
 * Returns true if current user is in grouper group
 */
export const useHasMember = (
  group: string,
  opts: UseQueryOptions<Types.Grouper[], Error> = REACT_QUERY_DEFAULT_CONFIG,
) => {
  return useQuery(`/api/grouper/hasMember?group=${group}`, opts);
};
