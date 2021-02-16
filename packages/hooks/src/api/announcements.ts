import axios from 'axios';
import { useQuery, QueryObserverConfig, QueryResult } from 'react-query';
import mocks from '../mocks/announcements';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';

export const mockAnnouncements = mocks;

const getAnnouncements = (type: string): Promise<any> => axios.get(`/api/announcements/${type}`).then(res => res.data);

export const useAnnouncements = (
  type: string,
  opts: QueryObserverConfig<any, Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<any, Error> => useQuery(['announcements', type], () => getAnnouncements(type), opts);
