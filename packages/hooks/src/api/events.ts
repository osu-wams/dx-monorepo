import axios from 'axios';
import { Types } from '@osu-wams/lib';
import { useQuery, QueryObserverConfig, QueryResult } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import mocks from '../mocks/events';

export const mockEvents = mocks;

const getAcademicCalendarEvents = (): Promise<Types.AcademicEvent[]> =>
  axios.get('/api/events/academic-calendar').then(res => res.data);

export const useAcademicCalendarEvents = (
  opts: QueryObserverConfig<Types.AcademicEvent[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.AcademicEvent[], Error> =>
  useQuery('academicCalendarEvents', () => getAcademicCalendarEvents(), opts);

const getAffiliationEvents = (affiliation: string): Promise<Types.LocalistEvent[]> => {
  const url = '/api/events';
  switch (affiliation.toLowerCase()) {
    case 'student':
      return axios.get(url).then(res => res.data);

    default:
      return axios.get(`${url}/${affiliation.toLowerCase()}`).then(res => res.data);
  }
};

export const useAffiliationEvents = (
  affiliation: string,
  opts: QueryObserverConfig<Types.LocalistEvent[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.LocalistEvent[], Error> =>
  useQuery(['events', affiliation], () => getAffiliationEvents(affiliation), opts);

export const getCampusEvents = (name: string): Promise<Types.LocalistEvent[]> =>
  axios.get(`/api/events/campus/${name}`).then(res => res.data);

export const useCampusEvents = (
  campus: string,
  opts: QueryObserverConfig<Types.LocalistEvent[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.LocalistEvent[], Error> => useQuery(['campusEvents', campus], () => getCampusEvents(campus), opts);
