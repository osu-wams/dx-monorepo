import axios from 'axios';
import { useQuery, BaseQueryOptions, QueryResult } from 'react-query';
import mock from '../mocks/trainings';
import { Types } from '@osu-wams/lib';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';

export const mockTrainings = mock.trainings;
export const mockTrainingTags = mock.trainingTags;

export const getTrainings = (): Promise<Types.Training[]> => axios.get(`/api/trainings`).then(res => res.data);

export const useTrainings = (
  opts: BaseQueryOptions = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.Training[], Error> => useQuery('trainings', getTrainings, opts);

export const getTrainingTags = (): Promise<Types.TrainingTag[]> =>
  axios.get(`/api/trainings/tags`).then(res => res.data);

export const useTrainingTags = (
  opts: BaseQueryOptions = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.TrainingTag[], Error> => useQuery('training-tags', getTrainingTags, opts);
