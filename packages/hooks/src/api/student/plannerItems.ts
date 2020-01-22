import axios from 'axios';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/student/plannertItems';

export const mockPlannerItems = mocks;

export const getPlannerItems = (): Promise<any> => axios.get('/api/student/planner-items').then(res => res.data);

// ! Should create an appropriate PlannerItem interface
export const usePlannerItems = (errorCallback: Function) =>
  useAPICall<any[]>({
    api: getPlannerItems,
    dataTransform: (data: any[]) => data,
    initialState: [],
    errorCallback,
    skipPostErrorStatuses: [403],
  });
