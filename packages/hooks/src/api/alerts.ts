import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import * as mocks from '../mocks/alerts';

export const mockAlerts = mocks;

export const useRaveAlerts = (opts: UseQueryOptions<Types.Alert[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/alerts', opts);
export const useDxAlerts = (opts: UseQueryOptions<Types.Alert[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/alerts/dx', opts);
