import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useCourseScheduleState, useCourseSchedule, mockCourseSchedule } from '../../../src/api/student/courseSchedule';
import { wrapper } from '../../test-utils';

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe('useCouseSchedule', () => {
  it('gets academic status for the current term on successful returns', async () => {
    mock.onGet('/api/student/class-schedule?term=current').reply(200, mockCourseSchedule.courseScheduleData);
    const { result, waitForNextUpdate } = renderHook(() => useCourseSchedule(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockCourseSchedule.courseScheduleData);
  });
  it('gets academic status for another term on successful returns', async () => {
    mock.onGet('/api/student/class-schedule?term=19790101').reply(200, mockCourseSchedule.courseScheduleData);
    const { result, waitForNextUpdate } = renderHook(() => useCourseSchedule('19790101'), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockCourseSchedule.courseScheduleData);
  });

  it('handles api error', async () => {
    mock.onGet('/api/student/class-schedule?term=current').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useCourseSchedule(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(2);
  });
});

describe('useCouseScheduleState', () => {
  it('performs the call', async () => {
    mock.onGet('/api/student/class-schedule?term=current').reply(200, mockCourseSchedule.courseScheduleData);
    const { result, waitForNextUpdate } = renderHook(() => useCourseScheduleState(), { wrapper });
    expect(result.current.courses.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.courses.isLoading).toBeFalsy();
    expect(result.current.courses.data).toEqual(mockCourseSchedule.courseScheduleData);
  });

  it('handles an error', async () => {
    mock.onGet('/api/student/class-schedule?term=current').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useCourseScheduleState(), { wrapper });
    expect(result.current.courses.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.courses.data).toEqual([]);
    expect(result.current.courses.isLoading).toBeTruthy();
    expect(result.current.courses.isSuccess).toBeFalsy();
  });
});
