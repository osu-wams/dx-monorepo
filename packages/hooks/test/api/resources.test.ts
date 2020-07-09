import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import {
  useResources,
  mockResources,
  defaultCategoryName,
  useResourcesByQueue,
  useCategories,
  useTrendingResources,
} from '../../src/api/resources';
import { queryCache } from 'react-query';

const mock = new MockAdapter(axios);

afterEach(() => {
  queryCache.clear();
  mock.reset();
});

describe('useResources', () => {
  it('gets resources on successful returns', async () => {
    mock.onGet('/api/resources').reply(200, mockResources.resourcesData);
    const { result, waitForNextUpdate } = renderHook(() => useResources());
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockResources.resourcesData);
  });
  it('handles api error', async () => {
    mock.onGet('/api/resources').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useResources());
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(2);
  });
});

describe('useResourcesByQueue', () => {
  it('gets resources by queue on successful returns', async () => {
    mock.onGet(`/api/resources/category/${defaultCategoryName()}`).reply(200, mockResources.resourcesDataByCategory);
    const { result, waitForNextUpdate } = renderHook(() => useResourcesByQueue(defaultCategoryName()));
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockResources.resourcesDataByCategory);
  });
  it('handles api error', async () => {
    mock.onGet(`/api/resources/category/${defaultCategoryName()}`).reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useResourcesByQueue(defaultCategoryName()));
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(2);
  });
});

describe('useCategories', () => {
  it('gets categories on successful returns', async () => {
    mock.onGet('/api/resources/categories').reply(200, mockResources.categoriesData);
    const { result, waitForNextUpdate } = renderHook(() => useCategories());
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockResources.categoriesData);
  });
  it('handles api error', async () => {
    mock.onGet('/api/resources/categories').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useCategories());
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(2);
  });
});

describe('useTrendingResources', () => {
  it('gets student trending resources on success returns', async () => {
    mock.onGet('/api/resources/trending/7daysAgo/student').reply(200, mockResources.trendingResourcesData);
    const { result, waitForNextUpdate } = renderHook(() => useTrendingResources('7daysAgo', 'student'));
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockResources.trendingResourcesData);
  });
  it('gets trending resources on success returns', async () => {
    mock.onGet('/api/resources/trending/7daysAgo').reply(200, mockResources.trendingResourcesData);
    const { result, waitForNextUpdate } = renderHook(() => useTrendingResources('7daysAgo'));
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockResources.trendingResourcesData);
  });
  it('handles api error', async () => {
    mock.onGet('/api/resources/trending/7daysAgo/student').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useTrendingResources('7daysAgo', 'student'));
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(2);
  });
});
