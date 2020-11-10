import axios from 'axios';
import { useQuery, QueryObserverConfig, QueryResult } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants';
import mocks from '../../mocks/student/courseSchedule';
import { Types } from '@osu-wams/lib';

export const mockCourseSchedule = mocks;

export const getCourseSchedule = (term: string = 'current'): Promise<Types.CourseSchedule[]> =>
  axios.get(`/api/student/class-schedule?term=${term}`).then(res => res.data);

/**
 * Returns an array of course schedules.
 */
export const useCourseSchedule = (
  term?: string,
  opts: QueryObserverConfig<Types.CourseSchedule[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.CourseSchedule[], Error> => {
  return useQuery(['courseSchedule', term], () => getCourseSchedule(term), opts);
};
