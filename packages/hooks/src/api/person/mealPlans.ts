import axios from 'axios';
import { Types } from '@osu-wams/lib';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/person/mealPlans';

export const mockMealPlans = mocks;

export const getMealPlans = (): Promise<Types.MealPlan[]> => axios.get(`/api/persons/meal-plans`).then(res => res.data);

export const useMealPlans = ({ callback = (data: Types.MealPlan[]) => data } = {}) =>
  useAPICall<Types.MealPlan[]>({ api: getMealPlans, dataTransform: callback, initialState: [] });
