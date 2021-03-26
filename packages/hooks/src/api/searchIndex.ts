import axios from 'axios';
import { useQuery, QueryObserverConfig, QueryResult } from 'react-query';
import mock from '../mocks/pageSearchIndex';
import { Types } from '@osu-wams/lib';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';

export const mockPageSearchIndex = mock;

export const getPageSearchIndex = (): Promise<Types.PageSearchIndex[]> =>
  axios.get(`/api/searchIndex/pages`).then(res => res.data);

export const usePageSearchIndex = (
  opts: QueryObserverConfig<Types.PageSearchIndex[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.PageSearchIndex[], Error> => useQuery('pageSearchIndex', getPageSearchIndex, opts);
