import axios from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';

export const useMasqueradeUser = (opts: UseQueryOptions<any, Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/masquerade', opts);

export const postMasqueradeUser = (masqueradeId?: string, masqueradeReason?: string): Promise<any> =>
  masqueradeId ? axios.post(`api/masquerade`, { masqueradeId, masqueradeReason }) : axios.post(`api/masquerade`);
