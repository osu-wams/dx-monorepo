import axios from 'axios';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/student/gpa';

export const mockGpa = mocks;

export const gpaInitialState: GpaLevel[] = [{ gpa: '', gpaType: '', level: '' }];
export const getGpa = (): Promise<GpaLevel> => axios.get(`/api/student/gpa`).then(res => res.data);
export const useGpa = () =>
  useAPICall<GpaLevel[]>({
    api: getGpa,
    dataTransform: (data: GpaLevel[]) => data,
    initialState: gpaInitialState,
  });

export type GpaLevel = {
  gpa: string;
  gpaType: string;
  level: string;
};
