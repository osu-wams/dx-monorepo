import axios from 'axios';
import { useQuery, QueryObserverConfig, QueryResult } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants';
import mocks from '../../mocks/student/grades';
import { Types } from '@osu-wams/lib';

export const mockGrades = mocks;

export const getGrades = (): Promise<Types.Grades[]> => axios.get(`/api/student/grades`).then(res => res.data);

export const useGrades = (
  opts: QueryObserverConfig<Types.Grades[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.Grades[], Error> => {
  return useQuery('grades', () => getGrades(), opts);
};
