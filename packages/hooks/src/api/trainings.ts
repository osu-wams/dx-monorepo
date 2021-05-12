import axios from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import mock from '../mocks/trainings';
import { Types } from '@osu-wams/lib';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { trainingState } from '../state/trainings';

export const mockTrainings = mock.trainings;
export const mockTrainingTags = mock.trainingTags;
export const mockTrainingAudiences = mock.trainingAudiences;

export const getTrainings = (): Promise<Types.Training[]> => axios.get(`/api/trainings`).then(res => res.data);

export const useTrainings = (opts: UseQueryOptions<Types.Training[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('trainings', getTrainings, opts);

export const getTrainingTags = (): Promise<Types.TrainingTag[]> =>
  axios.get(`/api/trainings/tags`).then(res => res.data);

export const useTrainingTags = (opts: UseQueryOptions<Types.TrainingTag[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('training-tags', getTrainingTags, opts);

export const getTrainingAudiences = (): Promise<Types.TrainingAudience[]> =>
  axios.get(`/api/trainings/audiences`).then(res => res.data);

export const useTrainingAudiences = (
  opts: UseQueryOptions<Types.TrainingAudience[], Error> = REACT_QUERY_DEFAULT_CONFIG,
) => useQuery('training-audiences', getTrainingAudiences, opts);

/**
 * Fetch the data from the api hook and persist in shared state
 * @returns data and setter for trainings state
 */
export const useTrainingsState = () => {
  const api = useTrainings();
  const [trainings, setTrainings] = useRecoilState(trainingState);

  useEffect(() => {
    const { isError, isLoading, isSuccess, data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (isSuccess && data && data !== trainings.data) {
      setTrainings({
        data,
        isLoading,
        isSuccess,
        isError,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api.data, api.isSuccess]);

  return { trainings, setTrainings };
};
