import axios from 'axios';
import { wrapper } from '../test-utils';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useCardsState, useCards, mockCards } from '../../src/api/cards';
import { queryCache } from 'react-query';

const mock = new MockAdapter(axios);

afterEach(() => {
  queryCache.clear();
  mock.reset();
});

describe('useCards', () => {
  it('gets cards on successful returns', async () => {
    mock.onGet('/api/cards').reply(200, mockCards.cardsData.data);
    const { result, waitForNextUpdate } = renderHook(() => useCards());
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.data).toEqual(mockCards.cardsData.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/cards').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useCards());
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(2);
  });
});

describe('useCardsState', () => {
  it('performs the call', async () => {
    mock.onGet('/api/cards').reply(200, mockCards.cardsData.data);
    const { result, waitForNextUpdate } = renderHook(() => useCardsState(), { wrapper });
    expect(result.current.cards.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.cards.isLoading).toBeFalsy();
    expect(result.current.cards.data).toEqual(mockCards.cardsData.data);
  });

  it('handles an error', async () => {
    mock.onGet('/api/cards').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useCardsState(), { wrapper });
    expect(result.current.cards.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.cards.data).toEqual([]);
    expect(result.current.cards.isLoading).toBeTruthy();
    expect(result.current.cards.isSuccess).toBeFalsy();
  });
});
