import axios from 'axios';
import { useQuery, BaseQueryOptions, QueryResult } from 'react-query';
import mock from '../mocks/trainings';
import { Types } from '@osu-wams/lib';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';

export const mockTrainings = mock.trainings;
export const mockTrainingTypes = mock.trainingTypes;

export const getTrainings = (): Promise<Types.Training[]> => axios.get(`/api/trainings`).then(res => res.data);

export const useTrainings = (
  opts: BaseQueryOptions = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.Training[], Error> => useQuery('trainings', getTrainings, opts);

export const getTrainingTypes = (): Promise<Types.TrainingType[]> =>
  axios.get(`/api/trainings/types`).then(res => res.data);

export const useTrainingTypes = (
  opts: BaseQueryOptions = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.TrainingType[], Error> => useQuery('training-types', getTrainingTypes, opts);
