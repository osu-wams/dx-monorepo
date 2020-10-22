import axios from 'axios';
import { useQuery, QueryObserverConfig, QueryResult } from 'react-query';
import { Types } from '@osu-wams/lib';
import mocks from '../mocks/cards';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';

export const mockCards = mocks;

/**
 * Cards
 */
export const getCards = (): Promise<Types.DynamicCard[]> =>
  axios.get(`/api/cards`).then(res => {
    return res.data;
  });

export const useCards = (
  opts: QueryObserverConfig<Types.DynamicCard[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.DynamicCard[], Error> => useQuery('cards', getCards, opts);
