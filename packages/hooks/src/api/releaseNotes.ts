import axios from 'axios';
import { useQuery, QueryObserverConfig, QueryResult } from 'react-query';
import mocks from '../mocks/releaseNotes';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';

export const mockReleaseNotes = mocks;

export const getReleaseNotes = (): Promise<ReleaseNotes[]> =>
  axios.get(`/api/release-notes`).then((res: ReleaseNotesData) => res.data ?? []);

export const useReleaseNotes = (
  opts: QueryObserverConfig<ReleaseNotes[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<ReleaseNotes[], Error> => useQuery('releaseNotes', getReleaseNotes, opts);

export interface ReleaseNotes {
  title: string;
  content: string;
  date: string;
}

export interface ReleaseNotesData {
  data: ReleaseNotes[];
}
