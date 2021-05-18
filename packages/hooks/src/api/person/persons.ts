import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants';
import mocks from '../../mocks/person/persons';

export const mockPersons = mocks;

export const usePerson = (opts: UseQueryOptions<Types.PersonsAttributes, Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/persons', opts);

export const useEmails = (opts: UseQueryOptions<Types.Email[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/persons/emails', opts);

export const usePhones = (opts: UseQueryOptions<Types.Phone[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/persons/phones', opts);
