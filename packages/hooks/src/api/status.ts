import axios from 'axios';
import mocks from '../mocks/status';
import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';

export const mockStatus = mocks;

export const STATUS_SORT: { [k: number]: number } = {
  4: 1,
  3: 2,
  2: 3,
  1: 4,
};

/**
 * Sort first by the status (in descending order) and then by the component name in alphabetical order.
 * This is why the sort key is generated with the status and name so that natural lexigraphical sorting works.
 * @param components the IT System components from the API
 */
export const sortedByStatus = (components?: Types.CachetComponent[]): Types.CachetComponent[] => {
  return (
    components
      ?.map(c => ({ ...c, key: `${STATUS_SORT[c.status]}${c.name}` }))
      .sort((a, b) => (a.key > b.key ? 1 : -1)) ?? []
  );
};

/**
 * Return a list of components having incidents for the Sticky Incident portion of the UI
 * @param components the IT System components from the API
 */
export const withStickyIncidents = (components?: Types.CachetComponent[]): Types.CachetComponent[] => {
  return components?.filter(c => c.incidents.length > 0) ?? [];
};

/**
 * Return whether all components are in the Operational status.
 * @param components the IT System components from the API
 */
export const allOperational = (components?: Types.CachetComponent[]): boolean => {
  return components?.filter(c => c.status > 1).length === 0 ?? false;
};

export const getStatus = (): Promise<Types.CachetComponent[]> => axios.get(`/api/status`).then(res => res.data);

export const useStatus = (opts: UseQueryOptions<Types.CachetComponent[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('status', getStatus, opts);
