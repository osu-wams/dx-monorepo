import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { usePlannerItemsState, usePlannerItems, mockPlannerItems } from '../../../src/api/student/plannerItems';
import { wrapper } from '../../test-utils';

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe('usePlannerItems', () => {
  it('gets planner items on successful returns', async () => {
    mock.onGet('/api/student/planner-items').reply(200, mockPlannerItems.data);
    const { result, waitForNextUpdate } = renderHook(() => usePlannerItems(), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.data).toEqual(mockPlannerItems.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/student/planner-items').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => usePlannerItems(), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(1);
  });
});

describe('usePlannerItemsState', () => {
  it('performs the call', async () => {
    mock.onGet('/api/student/planner-items').reply(200, mockPlannerItems.data);
    const { result, waitForNextUpdate } = renderHook(() => usePlannerItemsState(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.plannerItems.isLoading).toBeFalsy();
    expect(result.current.plannerItems.data).toEqual(mockPlannerItems.data);
  });

  xit('handles an error', async () => {
    mock.onGet('/api/student/planner-items').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => usePlannerItemsState(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.plannerItems.data).toEqual([]);
    expect(result.current.plannerItems.isLoading).toBeFalsy();
    expect(result.current.plannerItems.isSuccess).toBeFalsy();
  });
});
