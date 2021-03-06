import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useDegrees, mockDegrees } from '../../../src/api/student/degrees';
import { wrapper } from '../../test-utils';

const mock = new MockAdapter(axios);

// Shape the data back to how it looks like in Apigee
const serverResponse = [{ attributes: mockDegrees.data[0] }];

describe('useDegrees', () => {
  it('gets degree on successful returns', async () => {
    mock.onGet('/api/student/degrees?term=current').reply(200, serverResponse);
    const { result, waitForNextUpdate } = renderHook(() => useDegrees(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(serverResponse);
  });
  it('handles api error', async () => {
    mock.onGet('/api/student/degrees?term=current').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useDegrees(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.failureCount).toEqual(1);
    expect(result.current.data).toBeUndefined();
  });
});
