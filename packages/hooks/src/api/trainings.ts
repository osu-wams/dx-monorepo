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

export const useTrainings = (opts: UseQueryOptions<Types.Training[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/trainings', opts);

export const useTrainingTags = (opts: UseQueryOptions<Types.TrainingTag[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/trainings/tags', opts);

export const useTrainingAudiences = (
  opts: UseQueryOptions<Types.TrainingAudience[], Error> = REACT_QUERY_DEFAULT_CONFIG,
) => useQuery('/api/trainings/audiences', opts);

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
