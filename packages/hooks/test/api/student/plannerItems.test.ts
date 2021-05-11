import axios from 'axios';
import { wrapperWithUser } from '../../test-utils';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import {
  usePlannerItemsState,
  usePlannerItems,
  mockPlannerItems,
  getPlannerItems,
} from '../../../src/api/student/plannerItems';
import { queryCache } from 'react-query';

const mock = new MockAdapter(axios);

afterEach(() => {
  queryCache.clear();
  mock.reset();
});
describe('getPlannerItems', () => {
  it('gets trainings on successful returns', async () => {
    mock.onGet('/api/student/planner-items').replyOnce(200, mockPlannerItems.data);
    const result = await getPlannerItems();
    expect(result).toEqual(mockPlannerItems.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/student/planner-items').replyOnce(500);
    await getPlannerItems().catch(err => expect(err.message).toEqual('Request failed with status code 500'));
  });
});

describe('usePlannerItems', () => {
  it('gets planner items on successful returns', async () => {
    mock.onGet('/api/student/planner-items').reply(200, mockPlannerItems.data);
    const { result, waitForNextUpdate } = renderHook(() => usePlannerItems());
    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.data).toEqual(mockPlannerItems.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/student/planner-items').reply(500, '');
    const { result, waitForNextUpdate } = renderHook(() => usePlannerItems());
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(1);
  });
});

describe('usePlannerItemsState', () => {
  it('performs the call', async () => {
    mock.onGet('/api/student/planner-items').reply(200, mockPlannerItems.data);
    const { result, waitForNextUpdate } = renderHook(() => usePlannerItemsState(), { wrapper: wrapperWithUser });
    await waitForNextUpdate();
    expect(result.current.plannerItems.isLoading).toBeFalsy();
    expect(result.current.plannerItems.data).toEqual(mockPlannerItems.data);
  });

  it('handles an error', async () => {
    mock.onGet('/api/student/planner-items').reply(500, '');
    const { result, waitForNextUpdate } = renderHook(() => usePlannerItemsState(), { wrapper: wrapperWithUser });
    await waitForNextUpdate();
    expect(result.current.plannerItems.data).toEqual([]);
    expect(result.current.plannerItems.isLoading).toBeFalsy();
    expect(result.current.plannerItems.isSuccess).toBeFalsy();
  });
});
