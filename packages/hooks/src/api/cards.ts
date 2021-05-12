import axios from 'axios';
import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import mocks from '../mocks/cards';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { dynamicCardState } from '../state/dynamicCards';

export const mockCards = mocks;

/**
 * Cards
 */
export const getCards = (): Promise<Types.DynamicCard[]> =>
  axios.get(`/api/cards`).then(res => {
    return res.data;
  });

export const useCards = (opts: UseQueryOptions<Types.DynamicCard[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('cards', getCards, opts);

/**
 * Fetch the data from the api hook and persist in shared state
 * @returns data and setter for event state
 */
export const useCardsState = () => {
  const api = useCards();
  const [cards, setCards] = useRecoilState(dynamicCardState);

  useEffect(() => {
    const { isLoading, isSuccess, data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (isSuccess && data && data !== cards.data) {
      setCards({ data, isLoading, isSuccess });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api.data, api.isSuccess]);

  return { cards, setCards };
};
