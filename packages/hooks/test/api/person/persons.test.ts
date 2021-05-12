import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { usePerson, useEmails, usePhones, mockPersons } from '../../../src/api/person/persons';
import { wrapper } from '../../test-utils';

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe('usePerson', () => {
  it('gets a person on successful returns', async () => {
    mock.onGet('/api/persons').reply(200, mockPersons.personsData.data);

    const { result, waitForNextUpdate } = renderHook(() => usePerson(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.isSuccess).toBeTruthy();
    expect(result.current.data).toEqual(mockPersons.personsData.data);
  });

  it('gets emails on successful returns', async () => {
    mock.onGet('/api/persons/emails').reply(200, mockPersons.emailsData.data);

    const { result, waitForNextUpdate } = renderHook(() => useEmails(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.isSuccess).toBeTruthy();
    expect(result.current.data).toEqual(mockPersons.emailsData.data);
  });

  it('gets phones on successful returns', async () => {
    mock.onGet('/api/persons/phones').reply(200, mockPersons.phonesData.data);

    const { result, waitForNextUpdate } = renderHook(() => usePhones(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.isSuccess).toBeTruthy();
    expect(result.current.data).toEqual(mockPersons.phonesData.data);
  });

  it('handles api error', async () => {
    mock.onGet('/api/persons').reply(500);

    const { result, waitForNextUpdate } = renderHook(() => usePerson(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(2);
  });
});
