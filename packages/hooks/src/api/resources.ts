import axios from 'axios';
import useAPICall from '../useAPICall';
import mocks from '../mocks/resources';

export const mockResources = mocks;

export interface IResourceResult {
  id: string;
  title: string;
  iconName?: string;
  link: string;
  synonyms: string[];
  categories: string[];
  audiences: string[];
  affiliation: string[];
}

export interface IEntityQueueResourceResult {
  entityQueueTitle: string;
  items: IResourceResult[];
}

export interface ICategory {
  id: string;
  name: string;
  icon: string;
}

/**
 * Resources
 */
export const getResources = (): Promise<IResourceResult[]> =>
  axios.get(`/api/resources`).then(res => {
    return res.data;
  });

export const useResources = () => {
  return useAPICall<IResourceResult[]>({
    api: getResources,
    dataTransform: (d: IResourceResult[]): IResourceResult[] => d,
    initialState: [],
  });
};

/**
 * ResourcesByQueue
 */
export const getResourcesByQueue = (category: string): Promise<IResourceResult[]> =>
  axios.get(`/api/resources/category/${category}`).then(res => res.data);

export const useResourcesByQueue = (category: string) =>
  useAPICall<IEntityQueueResourceResult>({
    api: getResourcesByQueue,
    query: category,
    dataTransform: (d: IEntityQueueResourceResult): IEntityQueueResourceResult => d,
    initialState: {
      entityQueueTitle: '',
      items: [],
    },
  });

/**
 * Categories
 */
export const getCategories = (): Promise<ICategory[]> => axios.get('/api/resources/categories').then(res => res.data);

/**
 * Gets data from the Categories API
 * @param callback (optional) data transformation function
 */
export const useCategories = (callback: Function = (data: any) => data) => {
  return useAPICall<ICategory[]>({ api: getCategories, dataTransform: callback, initialState: [] });
};

// Category selected by default. Currently the 'featured' category id
export const defaultCategoryName = () => 'featured';
