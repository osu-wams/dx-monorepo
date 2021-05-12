import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { usePeople, getPeople, mockPeople } from '../../src/api/people';
import { wrapper } from '../test-utils';

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe('getPeople', () => {
  it('gets people on successful returns', async () => {
    mock.onGet('/api/people/ross').replyOnce(200, mockPeople.data);
    const result = await getPeople('ross');
    expect(result).toEqual(mockPeople.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/people/ross').replyOnce(500);
    await getPeople('ross').catch(err => expect(err.message).toEqual('Request failed with status code 500'));
  });
});

describe('usePeople', () => {
  it('performs the call', async () => {
    mock.onGet('/api/people/ross').replyOnce(200, mockPeople.data);
    const { result, waitForNextUpdate } = renderHook(() => usePeople('ross'), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('handles an error', async () => {
    mock.onGet('/api/people/ross').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => usePeople('ross'), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(1);
  });
});
