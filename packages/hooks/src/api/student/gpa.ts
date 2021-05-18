import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import mocks from '../../mocks/student/gpa';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants';

export const mockGpa = mocks;

export const useGpa = (opts: UseQueryOptions<Types.GpaLevel[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/student/gpa', opts);
