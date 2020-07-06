import axios from 'axios';
import mocks from '../mocks/classification';
import { Types } from '@osu-wams/lib';

export const mockClassification = mocks;

export const getClassification = (): Promise<Types.UserClassification> =>
  axios.get(`/api/user/classification`).then(res => res.data);
