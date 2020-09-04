import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { usePerson, mockPersons } from '../../../src/api/person/persons';
import { queryCache } from 'react-query';

const mock = new MockAdapter(axios);

afterEach(() => {
  queryCache.clear();
  mock.reset();
});

describe('usePerson', () => {
  it('gets a person on successful returns', async () => {
    mock.onGet('/api/persons').reply(200, mockPersons.personsData.data);

    const { result, waitForNextUpdate } = renderHook(() => usePerson());
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.isSuccess).toBeTruthy();
    expect(result.current.data).toEqual(mockPersons.personsData.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/persons').reply(500);

    const { result, waitForNextUpdate } = renderHook(() => usePerson());
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(2);
  });
});
