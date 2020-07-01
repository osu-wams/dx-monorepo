import axios from 'axios';
import mock from '../mocks/trainings';
import { Types } from '@osu-wams/lib';

export const mockTrainings = mock;

export const getTrainings = (): Promise<Types.Training[]> => axios.get(`/api/trainings`).then(res => res.data);
