import { useQuery, UseQueryOptions } from 'react-query';
import mocks from '../mocks/people';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import { Types } from '@osu-wams/lib';

export const mockPeople = mocks.peopleData;

export const usePeople = (name: string, opts: UseQueryOptions<Types.Directory[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery(`/api/people/${name}`, opts);
