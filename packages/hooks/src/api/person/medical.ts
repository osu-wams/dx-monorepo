import { Types } from '@osu-wams/lib';
import mocks from '../../mocks/person/medical';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants';

export const mockMedical = mocks;

export const useMedical = (opts: UseQueryOptions<Types.Medical[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/persons/medical', opts);
