import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { postSettings, useUser, mockUser, INITIAL_USER } from '../../src/api/user';
import { User } from '@osu-wams/lib/dist/user/types';

const { userClassification, user, settings } = mockUser;
const mockedUser = jest.fn<User, any>(() => user.data);
const mock = new MockAdapter(axios);

beforeEach(() => {
  mockedUser.mockReturnValue(user.data);
});

describe('useUser', () => {
  it('gets user on successful returns', async () => {
    mock.onGet('/api/user/classification').reply(200, userClassification);
    mock.onGet('/api/user').reply(200, user.data);
    const { result, waitForNextUpdate } = renderHook(() => useUser());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(user.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/user/classification').reply(500);
    mock.onGet('/api/user').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useUser());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual(INITIAL_USER);
  });
});

describe('postSettings', () => {
  it('returns an updated settings', async () => {
    mock.onPost('/api/user/settings').reply(200, settings.data);
    const result = await postSettings({ audienceOverride: { campusCode: 'C' } });
    expect(result).toEqual(settings.data);
  });
  it('returns an error', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mock.onPost('/api/user/settings').reply(500);
    await expect(postSettings({ audienceOverride: { campusCode: 'C' } })).rejects.toThrow();
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
