import axios from 'axios';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/student/courseSchedule';
import { Types } from '@osu-wams/lib';

export const mockCourseSchedule = mocks;

export const getCourseSchedule = (term = 'current'): Promise<Types.CourseSchedule[]> =>
  axios.get(`/api/student/class-schedule?term=${term}`).then(res => res.data);

/**
 * Returns an array of course schedules. A callback function
 * is provided if you want to mutate the data, but it must
 * return an array.
 * @param object containing a term and callback function
 */
export const useCourseSchedule = ({ term = 'current', callback = (data: Types.CourseSchedule[]) => data } = {}) =>
  useAPICall<Types.CourseSchedule[]>({
    api: getCourseSchedule,
    query: term,
    dataTransform: callback,
    initialState: [],
  });
