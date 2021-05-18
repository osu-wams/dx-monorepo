import { Types } from '@osu-wams/lib';
import mocks from '../../mocks/person/mealPlans';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants';

export const mockMealPlans = mocks;

export const useMealPlans = (opts: UseQueryOptions<Types.PersonsAttributes, Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/persons/meal-plans', opts);
