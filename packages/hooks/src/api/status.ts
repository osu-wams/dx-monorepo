import axios from 'axios';
import mocks from '../mocks/status';
import { useQuery, QueryObserverConfig, QueryResult } from 'react-query';
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
export const sortedByStatus = (components: ICachetComponent[]): ICachetComponent[] => {
  return components
    ?.map(c => ({ ...c, key: `${STATUS_SORT[c.status]}${c.name}` }))
    .sort((a, b) => (a.key > b.key ? 1 : -1));
};

/**
 * Return a list of components having incidents for the Sticky Incident portion of the UI
 * @param components the IT System components from the API
 */
export const withStickyIncidents = (components: ICachetComponent[]): ICachetComponent[] => {
  return components?.filter(c => c.incidents.length > 0) ?? [];
};

/**
 * Return whether all components are in the Operational status.
 * @param components the IT System components from the API
 */
export const allOperational = (components: ICachetComponent[]): boolean => {
  return components?.filter(c => c.status > 1).length === 0 ?? false;
};

export const getStatus = (): Promise<ICachetComponent[]> => axios.get(`/api/status`).then(res => res.data);

export const useStatus = (
  opts: QueryObserverConfig<ICachetComponent[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<ICachetComponent[], Error> => useQuery('status', getStatus, opts);

export interface ICachetIncident {
  id: number;
  name: string;
  message: string;
  duration: number;
  permalink: string;
  status: number;
  statusText: string;
  isResolved: boolean;
  updatedAt: string;
}

export interface ICachetComponent {
  id: number;
  name: string;
  description: string;
  statusText: string;
  status: number;
  updatedAt: string;
  incidents: ICachetIncident[];
}
