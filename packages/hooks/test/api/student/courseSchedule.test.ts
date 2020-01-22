import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useCourseSchedule, mockCourseSchedule, CourseSchedule } from '../../../src/api/student/courseSchedule';

const mock = new MockAdapter(axios);

describe('useAcademicStatus', () => {
  it('gets academic status for the current term on successful returns', async () => {
    mock.onGet('/api/student/class-schedule?term=current').reply(200, mockCourseSchedule.schedule);
    const { result, waitForNextUpdate } = renderHook(() => useCourseSchedule());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockCourseSchedule.schedule);
  });
  it('gets academic status for another term on successful returns', async () => {
    mock.onGet('/api/student/class-schedule?term=19790101').reply(200, mockCourseSchedule.schedule);
    const { result, waitForNextUpdate } = renderHook(() => useCourseSchedule({ term: '19790101' }));
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockCourseSchedule.schedule);
  });
  it('gets academic status with a custom datatransform successful returns', async () => {
    mock.onGet('/api/student/class-schedule?term=19790101').reply(200, mockCourseSchedule.schedule);
    const { result, waitForNextUpdate } = renderHook(() =>
      useCourseSchedule({
        callback: (d: CourseSchedule[]) => {
          let originalData = d;
          originalData = [];
          return originalData;
        },
      }),
    );
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual([]);
  });
  it('handles api error', async () => {
    mock.onGet('/api/student/class-schedule?term=current').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useCourseSchedule());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
});
