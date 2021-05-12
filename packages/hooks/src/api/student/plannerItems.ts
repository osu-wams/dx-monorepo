import axios from 'axios';
import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import mocks from '../../mocks/student/plannertItems';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants';
import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userState } from '../../state/application';
import { plannerItemState } from '../../state/plannerItems';

export const mockPlannerItems = mocks;

export const getPlannerItems = (): Promise<any> => axios.get('/api/student/planner-items').then(res => res.data);

export const usePlannerItems = (opts: UseQueryOptions<Types.PlannerItem[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('planner-items', getPlannerItems, opts);

/**
 * Fetch the data from the api hook and persist in shared state
 * @returns data and setter for planner items state
 */
export const usePlannerItemsState = () => {
  const user = useRecoilValue<Types.UserState>(userState);
  const api = usePlannerItems({
    ...REACT_QUERY_DEFAULT_CONFIG,
    enabled: user.isCanvasOptIn,
    retry: false,
    // If the user had previously approved Canvas, but planner-items fails on the server side due to invalid oauth,
    // a 403 is returned to the frontend, the user isCanvasOptIn should be changed to false and the hook disabled, causing the
    // component to render the "Authorize Canvas" button giving the user the ability to opt-in again.
    // @ts-ignore never read
    onError: (err: any) => {
      if (err.response) {
        const {
          response: { status },
        } = err;
        if (user.setUser && user.isCanvasOptIn && status === 403) {
          // This hook needs to reach into the UserState and call the underlying
          // setter on the user object rather than the `setUser` on the
          // recoil state itself.
          user.setUser((prevUser: Types.UserState) => ({
            ...prevUser,
            isCanvasOptIn: false,
            data: { ...prevUser.data, isCanvasOptIn: false },
          }));
        }
      }
    },
  });
  const [plannerItems, setPlannerItems] = useRecoilState(plannerItemState);

  useEffect(() => {
    const { isError, error, isLoading, isSuccess, data } = api;
    if (data && data !== plannerItems.data) {
      setPlannerItems({
        data,
        isLoading,
        error,
        isError,
        isSuccess,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api.data, api.isSuccess]);

  return { plannerItems, setPlannerItems };
};
