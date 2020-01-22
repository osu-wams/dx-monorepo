import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import {
  useAcademicCalendarEvents,
  useCampusEvents,
  useEmployeeEvents,
  useStudentExperienceEvents,
  mockEvents,
} from '../../src/api/events';

const mock = new MockAdapter(axios);

describe('useAcademicCalendarEvents', () => {
  it('gets academic calendar events on successful returns', async () => {
    mock.onGet('/api/events/academic-calendar').reply(200, mockEvents.academicCalendar3.data);
    const { result, waitForNextUpdate } = renderHook(() => useAcademicCalendarEvents());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockEvents.academicCalendar3.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/events/academic-calendar').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useAcademicCalendarEvents());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
});

describe('useCampuseEvents', () => {
  it('gets campus events on successful returns', async () => {
    mock.onGet('/api/events/campus/corvallis').reply(200, mockEvents.studentExperienceEvents.data);
    const { result, waitForNextUpdate } = renderHook(() => useCampusEvents('corvallis'));
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockEvents.studentExperienceEvents.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/events/campus/corvallis').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useCampusEvents('corvallis'));
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
});

describe('useEmployeeEvents', () => {
  it('gets employee events on successful returns', async () => {
    mock.onGet('/api/events/employee').reply(200, mockEvents.employeeEvents.data);
    const { result, waitForNextUpdate } = renderHook(() => useEmployeeEvents());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockEvents.employeeEvents.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/events/employee').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useEmployeeEvents());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
});

describe('useStudentExperienceEvents', () => {
  it('gets student events on successful returns', async () => {
    mock.onGet('/api/events').reply(200, mockEvents.studentExperienceEvents.data);
    const { result, waitForNextUpdate } = renderHook(() => useStudentExperienceEvents());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockEvents.studentExperienceEvents.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/events').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useStudentExperienceEvents());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
});
