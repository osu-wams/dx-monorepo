import axios from 'axios';
import useAPICall from '../useAPICall';
import mocks from '../mocks/releaseNotes';

export const mockReleaseNotes = mocks;

export const getReleaseNotes = (): Promise<ReleaseNotes[]> =>
  axios.get(`/api/release-notes`).then((res: ReleaseNotesData) => res.data ?? []);

export const useReleaseNotes = () =>
  useAPICall<ReleaseNotes[]>({
    api: getReleaseNotes,
    dataTransform: (data: ReleaseNotes[]) => data,
    initialState: [],
  });

export interface ReleaseNotes {
  title: string;
  content: string;
  date: string;
}

export interface ReleaseNotesData {
  data: ReleaseNotes[];
}
