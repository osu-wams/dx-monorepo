import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useGradesState, useGrades, mockGrades } from '../../../src/api/student/grades';
import { wrapper } from '../../test-utils';

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe('useGrades', () => {
  it('gets grades on successful returns', async () => {
    mock.onGet('/api/student/grades').replyOnce(200, mockGrades.data);
    const { result, waitForNextUpdate } = renderHook(() => useGrades(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockGrades.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/student/grades').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => useGrades(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(2);
  });
});

describe('useGradesState', () => {
  it('performs the call', async () => {
    mock.onGet('/api/student/grades').replyOnce(200, mockGrades.data);
    const { result, waitForNextUpdate } = renderHook(() => useGradesState(), { wrapper });
    expect(result.current.grades.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.grades.isLoading).toBeFalsy();
    expect(result.current.grades.data).toEqual(mockGrades.data);
  });

  it('handles an error', async () => {
    mock.onGet('/api/student/grades').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => useGradesState(), { wrapper });
    expect(result.current.grades.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.grades.data).toEqual([]);
    expect(result.current.grades.isLoading).toBeTruthy();
    expect(result.current.grades.isSuccess).toBeFalsy();
  });
});
