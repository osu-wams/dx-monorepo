import axios from 'axios';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/student/plannertItems';
import { Types } from '@osu-wams/lib';

export const mockPlannerItems = mocks;

export const getPlannerItems = (): Promise<any> => axios.get('/api/student/planner-items').then(res => res.data);

export const usePlannerItems = (errorCallback: Function) =>
  useAPICall<Types.PlannerItem[]>({
    api: getPlannerItems,
    dataTransform: (data: any[]) => data,
    initialState: [],
    errorCallback,
    skipPostErrorStatuses: [403],
  });
