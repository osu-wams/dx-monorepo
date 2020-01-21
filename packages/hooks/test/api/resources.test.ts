import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import {
  useResources,
  mockResources,
  defaultCategoryName,
  useResourcesByQueue,
  useCategories,
} from '../../src/api/resources';

const mock = new MockAdapter(axios);

describe('useResources', () => {
  it('gets resources on successful returns', async () => {
    mock.onGet('/api/resources').reply(200, mockResources.resourcesData);
    const { result, waitForNextUpdate } = renderHook(() => useResources());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockResources.resourcesData);
  });
  it('handles api error', async () => {
    mock.onGet('/api/resources').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useResources());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
});

describe('useResourcesByQueue', () => {
  it('gets resources by queue on successful returns', async () => {
    mock.onGet(`/api/resources/category/${defaultCategoryName()}`).reply(200, mockResources.resourcesDataByCategory);
    const { result, waitForNextUpdate } = renderHook(() => useResourcesByQueue(defaultCategoryName()));
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockResources.resourcesDataByCategory);
  });
  it('handles api error', async () => {
    mock.onGet(`/api/resources/category/${defaultCategoryName()}`).reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useResourcesByQueue(defaultCategoryName()));
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual({ entityQueueTitle: '', items: [] });
  });
});

describe('useCategories', () => {
  it('gets categories on successful returns', async () => {
    mock.onGet('/api/resources/categories').reply(200, mockResources.categoriesData);
    const { result, waitForNextUpdate } = renderHook(() => useCategories());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockResources.categoriesData);
  });
  it('handles api error', async () => {
    mock.onGet('/api/resources/categories').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useCategories());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
});
