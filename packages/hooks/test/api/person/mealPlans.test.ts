import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useMealPlans, mockMealPlans } from '../../../src/api/person/mealPlans';
import { wrapper } from '../../test-utils';

const mock = new MockAdapter(axios);

describe('useMealPlans', () => {
  it('gets meal plans on successful returns', async () => {
    mock.onGet('/api/persons/meal-plans').reply(200, mockMealPlans.data);
    const { result, waitForNextUpdate } = renderHook(() => useMealPlans(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockMealPlans.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/persons/meal-plans').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useMealPlans(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBeUndefined();
  });
});
