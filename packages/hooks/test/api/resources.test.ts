import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { wrapper } from '../test-utils';
import {
  useResources,
  useResourcesState,
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
    mock.onGet('/api/resources').reply(200, mockResources.resourcesData.data);
    const { result, waitForNextUpdate } = renderHook(() => useResources());
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.data).toEqual(mockResources.resourcesData.data);
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

describe('useResourcesState', () => {
  it('gets resources on successful returns', async () => {
    mock.onGet('/api/resources').reply(200, mockResources.resourcesData.data);
    const { result, waitForNextUpdate } = renderHook(() => useResourcesState(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.resources.isLoading).toBeFalsy();
    expect(result.current.resources.isError).toBeFalsy();
    expect(result.current.resources.data).toEqual(mockResources.resourcesData.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/resources').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useResourcesState(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.resources.isLoading).toBeTruthy();
    expect(result.current.resources.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.resources.data).toEqual([]);
    expect(result.current.resources.isLoading).toBeTruthy();
    expect(result.current.resources.isSuccess).toBeFalsy();
  });
});

describe('useResourcesByQueue', () => {
  it('gets resources by queue on successful returns', async () => {
    mock
      .onGet(`/api/resources/category/${defaultCategoryName()}`)
      .reply(200, mockResources.resourcesDataByCategory.data);
    const { result, waitForNextUpdate } = renderHook(() => useResourcesByQueue(defaultCategoryName()));
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.data).toEqual(mockResources.resourcesDataByCategory.data);
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
    mock.onGet('/api/resources/categories').reply(200, mockResources.categoriesData.data);
    const { result, waitForNextUpdate } = renderHook(() => useCategories());
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.data).toEqual(mockResources.categoriesData.data);
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
    mock.onGet('/api/resources/trending/7daysAgo/student').reply(200, mockResources.trendingResourcesData.data);
    const { result, waitForNextUpdate } = renderHook(() => useTrendingResources('7daysAgo', 'student'));
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.data).toEqual(mockResources.trendingResourcesData.data);
  });
  it('gets trending resources on success returns', async () => {
    mock.onGet('/api/resources/trending/7daysAgo').reply(200, mockResources.trendingResourcesData.data);
    const { result, waitForNextUpdate } = renderHook(() => useTrendingResources('7daysAgo'));
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.data).toEqual(mockResources.trendingResourcesData.data);
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
