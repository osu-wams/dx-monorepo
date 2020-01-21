import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { usePerson, mockPersons } from '../../../src/api/person/persons';

const mock = new MockAdapter(axios);

describe('usePerson', () => {
  it('gets a person on successful returns', async () => {
    mock.onGet('/api/persons').reply(200, {
      id: mockPersons.personsData.data.id,
      type: 'test',
      attributes: mockPersons.personsData.data,
      links: { self: 'test' },
    });
    const { result, waitForNextUpdate } = renderHook(() => usePerson());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockPersons.personsData.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/persons').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => usePerson());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual(null);
  });
});
