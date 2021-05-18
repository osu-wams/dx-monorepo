import { Types } from '@osu-wams/lib';
import mocks from '../../mocks/person/addresses';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants';

export const mockAddresses = mocks;

export const useAddresses = (opts: UseQueryOptions<Types.PersonsAttributes, Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/persons/addresses', opts);
