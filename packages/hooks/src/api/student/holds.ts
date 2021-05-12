import axios from 'axios';
import { Types } from '@osu-wams/lib';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/student/holds';

export const mockHolds = mocks;

export const getHolds = (): Promise<Types.Hold[]> => axios.get('/api/student/holds').then(res => res.data);

export const useHolds = () =>
  useAPICall<Types.Hold[]>({ api: getHolds, dataTransform: (data: Types.Hold[]) => data, initialState: [] });
