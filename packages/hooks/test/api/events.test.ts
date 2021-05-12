import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useAcademicCalendarEvents, useCampusEvents, useAffiliationEvents, mockEvents } from '../../src/api/events';
import { wrapper } from '../test-utils';

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe('useAcademicCalendarEvents', () => {
  it('gets academic calendar events on successful returns', async () => {
    mock.onGet('/api/events/academic-calendar').replyOnce(200, mockEvents.academicCalendar3.data);
    const { result, waitForNextUpdate } = renderHook(() => useAcademicCalendarEvents(), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.error).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.data).toEqual(mockEvents.academicCalendar3.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/events/academic-calendar').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => useAcademicCalendarEvents(), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(1);
  });
});

describe('useCampuseEvents', () => {
  it('gets campus events on successful returns', async () => {
    mock.onGet('/api/events/campus/corvallis').replyOnce(200, mockEvents.studentExperienceEvents.data);
    const { result, waitForNextUpdate } = renderHook(() => useCampusEvents('corvallis'), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.error).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.data).toEqual(mockEvents.studentExperienceEvents.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/events/campus/corvallis').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => useCampusEvents('corvallis'), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(1);
  });
});

describe('useAffiliationEvents for Employees', () => {
  it('gets employee events on successful returns', async () => {
    mock.onGet('/api/events/employee').replyOnce(200, mockEvents.employeeEvents.data);
    const { result, waitForNextUpdate } = renderHook(() => useAffiliationEvents('employee'), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.error).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.data).toEqual(mockEvents.employeeEvents.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/events/employee').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => useAffiliationEvents('employee'), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(1);
  });
});

describe('useAffiliationEvetns for Students', () => {
  it('gets student events on successful returns', async () => {
    mock.onGet('/api/events').replyOnce(200, mockEvents.studentExperienceEvents.data);
    const { result, waitForNextUpdate } = renderHook(() => useAffiliationEvents('student'), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.error).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.data).toEqual(mockEvents.studentExperienceEvents.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/events').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => useAffiliationEvents('student'), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(1);
  });
});
