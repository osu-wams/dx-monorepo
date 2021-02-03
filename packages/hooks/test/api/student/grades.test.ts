import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useGrades, mockGrades } from '../../../src/api/student/grades';
import { queryCache } from 'react-query';

const mock = new MockAdapter(axios);

afterEach(() => {
  queryCache.clear();
  mock.reset();
});

describe('useGrades', () => {
  it('gets grades on successful returns', async () => {
    mock.onGet('/api/student/grades').replyOnce(200, mockGrades.data);
    const { result, waitForNextUpdate } = renderHook(() => useGrades());
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockGrades.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/student/grades').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => useGrades());
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(2);
  });
});
