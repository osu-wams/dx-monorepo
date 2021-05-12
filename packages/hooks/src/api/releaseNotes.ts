import axios from 'axios';
import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import mocks from '../mocks/releaseNotes';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';

export const mockReleaseNotes = mocks;

export const getReleaseNotes = (): Promise<Types.ReleaseNotes[]> =>
  axios.get(`/api/release-notes`).then((res: Types.ReleaseNotesData) => res.data ?? []);

export const useReleaseNotes = (opts: UseQueryOptions<Types.ReleaseNotes[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('releaseNotes', getReleaseNotes, opts);
