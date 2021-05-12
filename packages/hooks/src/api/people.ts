import axios from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import mocks from '../mocks/people';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import { Types } from '@osu-wams/lib';

export const mockPeople = mocks.peopleData;

export const getPeople = (name: string): Promise<Types.Directory[]> =>
  axios.get(`/api/people/${name}`).then(res => res.data);

export const usePeople = (name: string, opts: UseQueryOptions<Types.Directory[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery(['people', name], () => getPeople(name), opts);
