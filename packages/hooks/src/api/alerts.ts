import axios from 'axios';
import { useQuery, QueryObserverConfig, QueryResult } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import * as mocks from '../mocks/alerts';
import { Types } from '@osu-wams/lib';

export const mockAlerts = mocks;

export const getRaveAlerts = () => axios.get('/api/alerts').then(res => res.data);
export const getDxAlerts = () => axios.get('/api/alerts/dx').then(res => res.data);
export const useRaveAlerts = (
  opts: QueryObserverConfig<Types.Alert[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.Alert[], Error> => useQuery('rave-alerts', () => getRaveAlerts(), opts);
export const useDxAlerts = (
  opts: QueryObserverConfig<Types.Alert[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.Alert[], Error> => useQuery('dx-alerts', () => getDxAlerts(), opts);
