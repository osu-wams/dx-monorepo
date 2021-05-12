import axios from 'axios';
import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import * as mocks from '../mocks/alerts';

export const mockAlerts = mocks;

export const getRaveAlerts = () => axios.get('/api/alerts').then(res => res.data);
export const getDxAlerts = () => axios.get('/api/alerts/dx').then(res => res.data);
export const useRaveAlerts = (opts: UseQueryOptions<Types.Alert[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('rave-alerts', getRaveAlerts, opts);
export const useDxAlerts = (opts: UseQueryOptions<Types.Alert[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('dx-alerts', () => getDxAlerts(), opts);
