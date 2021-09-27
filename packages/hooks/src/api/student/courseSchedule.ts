import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants';
import mocks from '../../mocks/student/courseSchedule';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { courseState } from '../../state/courses';

export const mockCourseSchedule = mocks;

/**
 * Returns an array of course schedules.
 */
export const useCourseSchedule = (
  term?: string,
  opts: UseQueryOptions<Types.CourseSchedule[], Error> = REACT_QUERY_DEFAULT_CONFIG,
) => {
  return useQuery(`/api/student/class-schedule${term ? `?term=${term}` : ''}`, opts);
};

/**
 * Fetch the data from the api hook and persist in shared state
 * @returns data and setter for course schedule state
 */
export const useCourseScheduleState = () => {
  const api = useCourseSchedule('current');
  const [courses, setCourses] = useRecoilState(courseState);

  useEffect(() => {
    const { isError, isLoading, isSuccess, data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (isSuccess && data && data !== courses.data) {
      setCourses({ data, isLoading, isSuccess, isError });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api.data, api.isSuccess]);

  return { courses, setCourses };
};
