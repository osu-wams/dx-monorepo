import axios from 'axios';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/student/gpa';
import { Types } from '@osu-wams/lib';

export const mockGpa = mocks;

export const gpaInitialState: Types.GpaLevel[] = [{ gpa: '', gpaType: '', level: '' }];
export const getGpa = (): Promise<Types.GpaLevel> => axios.get(`/api/student/gpa`).then(res => res.data);
export const useGpa = () =>
  useAPICall<Types.GpaLevel[]>({
    api: getGpa,
    dataTransform: (data: Types.GpaLevel[]) => data,
    initialState: gpaInitialState,
  });
