import axios from 'axios';
import { useQuery, BaseQueryOptions, QueryResult } from 'react-query';
import mocks from '../../mocks/student/plannertItems';
import { Types } from '@osu-wams/lib';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants';

export const mockPlannerItems = mocks;

export const getPlannerItems = (): Promise<any> => axios.get('/api/student/planner-items').then(res => res.data);

export const usePlannerItems = (
  opts: BaseQueryOptions = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.PlannerItem[], Error> => useQuery('planner-items', getPlannerItems, opts);
