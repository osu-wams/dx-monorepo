import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import { localistEventsState } from '../state/events';
import mocks from '../mocks/events';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';

export const mockEvents = mocks;

export const useAcademicCalendarEvents = (
  opts: UseQueryOptions<Types.AcademicEvent[], Error> = REACT_QUERY_DEFAULT_CONFIG,
) => useQuery('/api/events/academic-calendar', opts);

export const useAffiliationEvents = (
  affiliation: string,
  opts: UseQueryOptions<Types.LocalistEvent[], Error> = REACT_QUERY_DEFAULT_CONFIG,
) => {
  const apiUrl = '/api/events';
  const endpoint = affiliation.toLowerCase();
  const url = endpoint === 'student' ? apiUrl : `${apiUrl}/${endpoint}`;
  return useQuery(url, opts);
};

export const useCampusEvents = (
  campus: string,
  opts: UseQueryOptions<Types.LocalistEvent[], Error> = REACT_QUERY_DEFAULT_CONFIG,
) => useQuery(`/api/events/campus/${campus}`, opts);

/**
 * Fetch the data from the api hook and persist in shared state
 * @param affiliation the users affiliation to load events for
 * @returns data and setter for event state
 */
export const useAffiliationEventsState = (affiliation: string) => {
  const api = useAffiliationEvents(affiliation, {
    ...REACT_QUERY_DEFAULT_CONFIG,
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 30,
  });
  const [events, setEvents] = useRecoilState(localistEventsState({ affiliation }));

  useEffect(() => {
    const { isError, isLoading, isSuccess, data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (isSuccess && data && data !== events.data) {
      setEvents({ data, isLoading, isSuccess, isError, param: { affiliation } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api.data, api.isSuccess]);

  return { events, setEvents };
};

/**
 * Fetch the data from the api hook and persist in shared state
 * @param campus the name of the campus to load events for
 * @returns data and setter for event state
 */
export const useCampusEventsState = (campus: string) => {
  const api = useCampusEvents(campus, {
    ...REACT_QUERY_DEFAULT_CONFIG,
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 30,
  });
  const [events, setEvents] = useRecoilState(localistEventsState({ campus }));

  useEffect(() => {
    const { isError, isLoading, isSuccess, data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (isSuccess && data && data !== events.data) {
      setEvents({ data, isLoading, isSuccess, isError, param: { campus } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api.data, api.isSuccess]);

  return { events, setEvents };
};
