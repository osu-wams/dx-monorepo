import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { postSettings, useUser, mockUser, INITIAL_USER, updateUserMessage, useMessages } from '../../src/api/user';
import { Types } from '@osu-wams/lib';
import { queryCache } from 'react-query';

const { userClassification, user, settings, userFavoriteResources, userMessage, userMessageItems } = mockUser;
const mockedUser = jest.fn<Types.User, any>(() => user.data);
const mock = new MockAdapter(axios);

afterEach(() => {
  queryCache.clear();
  mock.reset();
});

beforeEach(() => {
  mockedUser.mockReturnValue(user.data);
});

describe('useUser', () => {
  it('gets user on successful returns', async () => {
    mock.onGet('/api/resources/favorites').reply(200, userFavoriteResources);
    mock.onGet('/api/user/classification').reply(200, userClassification);
    mock.onGet('/api/user').reply(200, user.data);
    const { result, waitForNextUpdate } = renderHook(() => useUser());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(user.data);
  });
  it('handles api error', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
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

describe('useMessages', () => {
  it('gets user messages on successful returns', async () => {
    mock.onGet('/api/user/messages').reply(200, userMessageItems);
    const { result, waitForNextUpdate } = renderHook(() => useMessages());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(userMessageItems);
  });
  it('handles api error', async () => {
    mock.onGet('/api/user/messages').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useMessages());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual({ items: [] });
  });
});

describe('updateUserMessage', () => {
  it('returns an updated user message', async () => {
    mock.onPost('/api/user/messages').reply(200, userMessage);
    const result = await updateUserMessage({ messageId: 'message-id-01', status: 'READ' });
    expect(result).toEqual(userMessage);
  });
  it('returns an error', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mock.onPost('/api/user/messages').reply(500);
    await expect(updateUserMessage({ messageId: 'message-id-01', status: 'invalid-status' })).rejects.toThrow();
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
