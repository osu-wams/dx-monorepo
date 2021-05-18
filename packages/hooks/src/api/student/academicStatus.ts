import { Types } from '@osu-wams/lib';
import mocks from '../../mocks/student/academicStatus';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants';

export const mockAcademicStatus = mocks;

export const useAcademicStatus = (opts: UseQueryOptions<Types.AcademicStatus, Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/student/academic-status', opts);
