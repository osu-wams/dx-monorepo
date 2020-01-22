import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useAcademicStatus, mockAcademicStatus } from '../../../src/api/student/academicStatus';

const mock = new MockAdapter(axios);

describe('useAcademicStatus', () => {
  it('gets academic status on successful returns', async () => {
    mock.onGet('/api/student/academic-status').reply(200, mockAcademicStatus.data);
    const { result, waitForNextUpdate } = renderHook(() => useAcademicStatus());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockAcademicStatus.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/student/academic-status').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useAcademicStatus());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual({});
  });
});
