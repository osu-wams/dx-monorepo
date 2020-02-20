import axios from 'axios';
import { Types } from '@osu-wams/lib';
import useAPICall from '../useAPICall';
import mocks from '../mocks/resources';

export const mockResources = mocks;

/**
 * Resources
 */
export const getResources = (): Promise<Types.Resource[]> =>
  axios.get(`/api/resources`).then(res => {
    return res.data;
  });

export const useResources = () => {
  return useAPICall<Types.Resource[]>({
    api: getResources,
    dataTransform: (d: Types.Resource[]): Types.Resource[] => d,
    initialState: [],
  });
};

/**
 * ResourcesByQueue
 */
export const getResourcesByQueue = (category: string): Promise<Types.Resource[]> =>
  axios.get(`/api/resources/category/${category}`).then(res => res.data);

export const useResourcesByQueue = (category: string) =>
  useAPICall<Types.ResourceEntityQueue>({
    api: getResourcesByQueue,
    query: category,
    dataTransform: (d: Types.ResourceEntityQueue): Types.ResourceEntityQueue => d,
    initialState: {
      entityQueueTitle: '',
      items: [],
    },
  });

/**
 * Categories
 */
export const getCategories = (): Promise<Types.Category[]> =>
  axios.get('/api/resources/categories').then(res => res.data);

/**
 * Gets data from the Categories API
 * @param callback (optional) data transformation function
 */
export const useCategories = (callback: Function = (data: any) => data) => {
  return useAPICall<Types.Category[]>({ api: getCategories, dataTransform: callback, initialState: [] });
};

// Category selected by default. Currently the 'featured' category id
export const defaultCategoryName = () => 'featured';

/**
 * Gets data from FavoriteResources
 */
export const getFavorites = (): Promise<Types.FavoriteResource[]> =>
  axios.get('/api/resources/favorites').then(res => res.data);

/**
 * Gets data from the FavoriteResources API
 */
export const useFavorites = () => {
  return useAPICall<Types.FavoriteResource[]>({
    api: getFavorites,
    dataTransform: (d: Types.FavoriteResource[]): Types.FavoriteResource[] => d,
    initialState: [],
  });
};

// Adds/updates data for Favorite Resources
export const postFavorite = (resourceId: string, active: boolean, order: number): Promise<Types.FavoriteResource> =>
  axios
    .post('/api/resources/favorites', { resourceId, active, order })
    .then(res => res.data)
    .catch(e => {
      console.error(e);
      throw e;
    });
