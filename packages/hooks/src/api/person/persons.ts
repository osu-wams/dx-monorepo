import axios from 'axios';
import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants';
import mocks from '../../mocks/person/persons';

export const mockPersons = mocks;

export const getPerson = (): Promise<Types.PersonsAttributes> =>
  axios.get(`/api/persons`).then(res => {
    return res.data;
  });

export const getEmails = (): Promise<Types.Email[]> =>
  axios.get(`/api/persons/emails`).then(res => {
    return res.data;
  });

export const getPhones = (): Promise<Types.Phone[]> =>
  axios.get(`/api/persons/phones`).then(res => {
    return res.data;
  });

export const usePerson = (opts: UseQueryOptions<Types.PersonsAttributes, Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('person', getPerson, opts);

export const useEmails = (opts: UseQueryOptions<Types.Email[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('personEmails', getEmails, opts);

export const usePhones = (opts: UseQueryOptions<Types.Phone[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('personPhones', getPhones, opts);
