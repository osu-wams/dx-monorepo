import axios from 'axios';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/student/holds';

export const mockHolds = mocks;

export const getHolds = (): Promise<Hold[]> => axios.get('/api/student/holds').then(res => res.data);

export const useHolds = () =>
  useAPICall<Hold[]>({ api: getHolds, dataTransform: (data: Hold[]) => data, initialState: [] });

export type Hold = {
  description: string;
};
