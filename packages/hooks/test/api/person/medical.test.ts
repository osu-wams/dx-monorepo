import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useMedical, mockMedical } from '../../../src/api/person/medical';
import { wrapper } from '../../test-utils';

const mock = new MockAdapter(axios);

describe('useMedical', () => {
  it('gets medical information on successful returns', async () => {
    mock.onGet('/api/persons/medical').reply(200, mockMedical.data);
    const { result, waitForNextUpdate } = renderHook(() => useMedical(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockMedical.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/persons/medical').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useMedical(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.failureCount).toEqual(1);
    expect(result.current.data).toBeUndefined();
  });
});
