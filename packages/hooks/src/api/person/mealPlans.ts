import axios from 'axios';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/person/mealPlans';

export const mockMealPlans = mocks;

export const getMealPlans = (): Promise<MealPlans[]> => axios.get(`/api/persons/meal-plans`).then(res => res.data);

export const useMealPlans = ({ callback = (data: MealPlans[]) => data } = {}) =>
  useAPICall<MealPlans[]>({ api: getMealPlans, dataTransform: callback, initialState: [] });

export interface MealPlans {
  attributes: MealPlansAttributes;
  id: string;
  links: { self: string };
  type: string;
}

export interface MealPlansAttributes {
  mealPlan: string;
  balance: number;
  lastUsedDate: string;
  lastUsedPlace: string | null;
}
