import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useDegrees, mockDegrees } from '../../../src/api/student/degrees';

const mock = new MockAdapter(axios);

// Shape the data back to how it looks like in Apigee
const apigeeResponse = { data: [{ attributes: mockDegrees.data[0] }] };

describe('useDegrees', () => {
  it('gets degree on successful returns', async () => {
    mock.onGet('/api/student/degrees?term=current').reply(200, apigeeResponse);
    const { result, waitForNextUpdate } = renderHook(() => useDegrees());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockDegrees.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/student/degrees?term=current').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useDegrees());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
});
