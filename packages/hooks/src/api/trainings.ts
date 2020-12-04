import axios from 'axios';
import { useQuery, QueryObserverConfig, QueryResult } from 'react-query';
import mock from '../mocks/trainings';
import { Types } from '@osu-wams/lib';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';

export const mockTrainings = mock.trainings;
export const mockTrainingTags = mock.trainingTags;
export const mockTrainingAudiences = mock.trainingAudiences;

export const getTrainings = (): Promise<Types.Training[]> => axios.get(`/api/trainings`).then(res => res.data);

export const useTrainings = (
  opts: QueryObserverConfig<Types.Training[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.Training[], Error> => useQuery('trainings', getTrainings, opts);

export const getTrainingTags = (): Promise<Types.TrainingTag[]> =>
  axios.get(`/api/trainings/tags`).then(res => res.data);

export const useTrainingTags = (
  opts: QueryObserverConfig<Types.TrainingTag[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.TrainingTag[], Error> => useQuery('training-tags', getTrainingTags, opts);

export const getTrainingAudiences = (): Promise<Types.TrainingAudience[]> =>
  axios.get(`/api/trainings/audiences`).then(res => res.data);

export const useTrainingAudiences = (
  opts: QueryObserverConfig<Types.TrainingAudience[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.TrainingAudience[], Error> => useQuery('training-audiences', getTrainingAudiences, opts);
