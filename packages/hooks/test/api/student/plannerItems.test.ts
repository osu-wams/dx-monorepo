import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { usePlannerItems, mockPlannerItems } from '../../../src/api/student/plannerItems';

const mock = new MockAdapter(axios);

describe('usePlannerItems', () => {
  it('gets planner items on successful returns', async () => {
    mock.onGet('/api/student/planner-items').reply(200, mockPlannerItems.data);
    const { result, waitForNextUpdate } = renderHook(() =>
      usePlannerItems(() => console.log('test called error callback')),
    );
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockPlannerItems.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/student/planner-items').reply(500);
    const { result, waitForNextUpdate } = renderHook(() =>
      usePlannerItems(() => console.log('test called error callback')),
    );
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
});
