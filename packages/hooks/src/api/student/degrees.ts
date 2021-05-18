import mocks from '../../mocks/student/degrees';
import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants';

export const mockDegrees = mocks;

export const useDegrees = (
  term = 'current',
  opts: UseQueryOptions<{ attributes: Types.Degree }[], Error> = {
    ...REACT_QUERY_DEFAULT_CONFIG,
  },
) => useQuery(`/api/student/degrees?term=${term}`, opts);
