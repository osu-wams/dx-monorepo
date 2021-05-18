import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useGpa, mockGpa } from '../../../src/api/student/gpa';
import { wrapper } from '../../test-utils';

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe('useGpa', () => {
  it('gets gpa on successful returns', async () => {
    mock.onGet('/api/student/gpa').reply(200, mockGpa.gpaData);
    const { result, waitForNextUpdate } = renderHook(() => useGpa(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockGpa.gpaData);
  });
  it('handles api error', async () => {
    mock.onGet('/api/student/gpa').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useGpa(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(2);
  });
});
