import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useGrades, mockGrades } from '../../../src/api/student/grades';

const mock = new MockAdapter(axios);

describe('useGrades', () => {
  it('gets grades on successful returns', async () => {
    mock.onGet('/api/student/grades').reply(200, mockGrades.data);
    const { result, waitForNextUpdate } = renderHook(() => useGrades());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockGrades.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/student/grades').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useGrades());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
});
