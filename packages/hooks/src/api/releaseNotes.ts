import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import mocks from '../mocks/releaseNotes';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';

export const mockReleaseNotes = mocks;

export const useReleaseNotes = (opts: UseQueryOptions<Types.ReleaseNotes[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/release-notes', opts);
