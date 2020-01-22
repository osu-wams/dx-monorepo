import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useGpa, mockGpa } from '../../../src/api/student/gpa';

const mock = new MockAdapter(axios);

describe('useGpa', () => {
  it('gets gpa on successful returns', async () => {
    mock.onGet('/api/student/gpa').reply(200, mockGpa.gpaData);
    const { result, waitForNextUpdate } = renderHook(() => useGpa());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockGpa.gpaData);
  });
  it('handles api error', async () => {
    mock.onGet('/api/student/gpa').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useGpa());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([{ gpa: '', gpaType: '', level: '' }]);
  });
});
