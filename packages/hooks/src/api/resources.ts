import axios from 'axios';
import { useEffect } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import { Types } from '@osu-wams/lib';
import { resourceState } from '../state/resources';
import { useRecoilState } from 'recoil';
import mocks from '../mocks/resources';
import { BASEURL, REACT_QUERY_DEFAULT_CONFIG } from '../constants';

export const mockResources = mocks;

/**
 * Resources
 */
export const useResources = (opts: UseQueryOptions<Types.Resource[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/resources', opts);

/**
 * ResourcesByQueue
 */
export const useResourcesByQueue = (
  category: string,
  opts: UseQueryOptions<Types.ResourceEntityQueue, Error> = REACT_QUERY_DEFAULT_CONFIG,
) => useQuery(`/api/resources/category/${category}`, opts);

/**
 * Categories
 */
export const useCategories = (opts: UseQueryOptions<Types.Category[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/resources/categories', opts);

// Category selected by default. Currently the 'featured' category id
export const defaultCategoryName = () => 'featured';

/**
 * Gets data from FavoriteResources
 */
export const useFavorites = (opts: UseQueryOptions<Types.FavoriteResource[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/resources/favorites', opts);

// Adds/updates data for Favorite Resources
export const postFavorite = (
  favorites: { resourceId: string; active: boolean; order: number }[],
): Promise<Types.FavoriteResource[]> =>
  axios
    .post(`${BASEURL}/api/resources/favorites`, favorites)
    .then(res => res.data)
    .catch(e => {
      console.error(e);
      throw e;
    });

/**
 * Hook for fetching trending resources
 * @param daysAgo days to look back for trending resources, eg. '7daysAgo'
 * @param affiliation optionally filter trending resources for a type of user, eg. 'student'
 */
export const useTrendingResources = (
  daysAgo: string,
  affiliation?: string,
  opts: UseQueryOptions<Types.TrendingResource[], Error> = REACT_QUERY_DEFAULT_CONFIG,
) => {
  const affiliationPath = affiliation ? `/${affiliation}` : '';
  const query = `${daysAgo}${affiliationPath}`;
  return useQuery(`/api/resources/trending/${query}`, opts);
};

/**
 * Fetch the data from the api hook and persist in shared state
 * @returns data and setter for resourceState
 */
export const useResourcesState = () => {
  const api = useResources();
  const [resources, setResources] = useRecoilState(resourceState);

  useEffect(() => {
    const { isError, isLoading, isSuccess, data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (isSuccess && data && data !== resources.data) {
      setResources({
        data,
        isLoading,
        isSuccess,
        isError,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api.data, api.isSuccess]);

  return { resources, setResources };
};
