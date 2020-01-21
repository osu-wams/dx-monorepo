import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useAddresses, mockAddresses } from '../../../src/api/person/addresses';

const mock = new MockAdapter(axios);

describe('useAddresses', () => {
  it('gets mailing addresses on successful returns', async () => {
    mock.onGet('/api/persons/addresses').reply(200, mockAddresses.personsMailingAddressData.data);
    const { result, waitForNextUpdate } = renderHook(() => useAddresses());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockAddresses.personsMailingAddressData.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/persons/addresses').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useAddresses());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual(null);
  });
});
