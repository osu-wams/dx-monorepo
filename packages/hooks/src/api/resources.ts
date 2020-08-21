import axios from 'axios';
import { useQuery, QueryObserverConfig, QueryResult } from 'react-query';
import { Types } from '@osu-wams/lib';
import mocks from '../mocks/resources';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';

export const mockResources = mocks;

/**
 * Resources
 */
export const getResources = (): Promise<Types.Resource[]> =>
  axios.get(`/api/resources`).then(res => {
    return res.data;
  });

export const useResources = (
  opts: QueryObserverConfig<Types.Resource[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.Resource[], Error> => useQuery('resources', getResources, opts);

/**
 * ResourcesByQueue
 */
export const getResourcesByQueue = (category: string): Promise<Types.ResourceEntityQueue> =>
  axios.get(`/api/resources/category/${category}`).then(res => res.data);

export const useResourcesByQueue = (
  category: string,
  opts: QueryObserverConfig<Types.ResourceEntityQueue, Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.ResourceEntityQueue, Error> =>
  useQuery(['resources-by-queue', category], () => getResourcesByQueue(category), opts);

/**
 * Categories
 */
export const getCategories = (): Promise<Types.Category[]> =>
  axios.get('/api/resources/categories').then(res => res.data);

/**
 * Gets data from the Categories API
 * @param callback (optional) data transformation function
 */
export const useCategories = (
  opts: QueryObserverConfig<Types.Category[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.Category[], Error> => useQuery('categories', getCategories, opts);

// Category selected by default. Currently the 'featured' category id
export const defaultCategoryName = () => 'featured';

/**
 * Gets data from FavoriteResources
 */
export const getFavorites = (): Promise<Types.FavoriteResource[]> =>
  axios.get('/api/resources/favorites').then(res => res.data);

// Adds/updates data for Favorite Resources
export const postFavorite = (resourceId: string, active: boolean, order: number): Promise<Types.FavoriteResource> =>
  axios
    .post('/api/resources/favorites', { resourceId, active, order })
    .then(res => res.data)
    .catch(e => {
      console.error(e);
      throw e;
    });

/**
 * Get a list of trending resources from a number of days in the past
 * @param query url path for filtering trending resources, eg. '7daysAgo', or '7daysAgo/student'
 */
export const getTrendingResources = (query: string): Promise<Types.TrendingResource[]> =>
  axios.get(`/api/resources/trending/${query}`).then(res => {
    return res.data;
  });

/**
 * Hook for fetching trending resources
 * @param daysAgo days to look back for trending resources, eg. '7daysAgo'
 * @param affiliation optionally filter trending resources for a type of user, eg. 'student'
 */
export const useTrendingResources = (
  daysAgo: string,
  affiliation?: string,
  opts: QueryObserverConfig<Types.TrendingResource[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.TrendingResource[], Error> => {
  const affiliationPath = affiliation ? `/${affiliation}` : '';
  const query = `${daysAgo}${affiliationPath}`;
  return useQuery(['trending-resources', daysAgo, affiliation], () => getTrendingResources(query), opts);
};
