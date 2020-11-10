import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useCourseSchedule, mockCourseSchedule } from '../../../src/api/student/courseSchedule';
import { queryCache } from 'react-query';

const mock = new MockAdapter(axios);

afterEach(() => {
  queryCache.clear();
  mock.reset();
});

describe('useAcademicStatus', () => {
  it('gets academic status for the current term on successful returns', async () => {
    mock.onGet('/api/student/class-schedule?term=current').reply(200, mockCourseSchedule.courseScheduleData);
    const { result, waitForNextUpdate } = renderHook(() => useCourseSchedule());
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockCourseSchedule.courseScheduleData);
  });
  it('gets academic status for another term on successful returns', async () => {
    mock.onGet('/api/student/class-schedule?term=19790101').reply(200, mockCourseSchedule.courseScheduleData);
    const { result, waitForNextUpdate } = renderHook(() => useCourseSchedule('19790101'));
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockCourseSchedule.courseScheduleData);
  });

  it('handles api error', async () => {
    mock.onGet('/api/student/class-schedule?term=current').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useCourseSchedule());
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(2);
  });
});
