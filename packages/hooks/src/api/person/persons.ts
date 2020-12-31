import axios from 'axios';
import { useQuery, QueryObserverConfig, QueryResult } from 'react-query';
import { Types } from '@osu-wams/lib';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants';
import mocks from '../../mocks/person/persons';

export const mockPersons = mocks;

export const getPerson = (): Promise<Types.PersonsAttributes> =>
  axios.get(`/api/persons`).then(res => {
    return res.data;
  });

export const getEmails = (): Promise<Types.EmailAttributes> =>
  axios.get(`/api/persons/emails`).then(res => {
    return res.data;
  });

export const getPhones = (): Promise<Types.PhoneAttributes> =>
  axios.get(`/api/persons/phones`).then(res => {
    return res.data;
  });

export const usePerson = (
  opts: QueryObserverConfig<Types.PersonsAttributes, Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.PersonsAttributes, Error> => useQuery('person', getPerson, opts);
