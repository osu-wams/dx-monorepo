import { useEffect, useState } from 'react';
import { storageCache } from '@osu-wams/utils';

/* eslint-disable react-hooks/exhaustive-deps */

/**
 * Exhaustive deps has been disabled in linting because this hook shouldn't
 * trigger any time one of the referenced methods changes upstream.
 */

export interface APICall<T> {
  api: Function;
  dataTransform: Function;
  errorCallback?: Function;
  initialState: T;
  postError?: Function;
  query?: string;
  skipPostErrorStatuses?: number[];
  useCache?: boolean;
}

export interface APIResult<T> {
  data: T;
  error: boolean;
  loading: boolean;
  setData: Function;
}

/**
 * An abstract method to make an API method call, include an arbitrary query string,
 * optionally perform some data transformation along with an initial state for the hook
 * to start with. All API calls want this behavior and are wrapped into this consistent hook.
 *
 * Process flow;
 * * If cached data is found;
 * *  - Check if data is cached in the browser, set the loading to false and return the data if it was cached.
 * * If cached data is not found;
 * *  - Set loading state to true so that skeletons/spinner could be rendered
 * *  - Call the API function
 * *  - Perform the Data Transformation
 * *  - Set the data state and loading state to false
 * *  - If an error is caught, set the loading state to false and the error state to true
 * @param options [APICall] - the options for the related API call
 */
const useAPICall = <T>(options: APICall<T>): APIResult<T> => {
  const {
    api,
    initialState,
    query,
    dataTransform,
    errorCallback,
    postError,
    useCache,
    skipPostErrorStatuses,
  } = options;

  const [data, setData] = useState<T>(initialState);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const cacheKey = `${api.name}:${query}:${dataTransform.name}`;

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    api(query)
      .then((result: T) => {
        const transformed = dataTransform(result);
        storageCache.setItem(cacheKey, transformed);
        setData(transformed);
        setLoading(false);
      })
      .catch(async (e: any) => {
        setError(true);
        setLoading(false);
        // API calls fail when the cookie expires, this causes the front-end to
        // flow through the login process while providing the backend the target
        // url to redirect the user to after a successful login.
        if (e.response?.status === 401) {
          window.location.assign(`/login?return=${window.location.pathname}`);
        } else {
          // Gives the ability for an API call to bypass posting an error to the server in
          // certain circumstances, such as an HTTP 403 from Planner Item API call when the user
          // has not yet opted-in for Canvas. This is an expected error response and needs not
          // be posted to the backend for monitoring.
          if (!skipPostErrorStatuses?.includes(e.response?.status) && postError) {
            await postError(e);
          }

          storageCache.removeItem(cacheKey);
          if (errorCallback) errorCallback();
        }
      });
  };

  useEffect(() => {
    const cached = storageCache.getItem(cacheKey);
    if (useCache !== false && cached) {
      setData(cached);
      setLoading(false);
    } else {
      fetchData();
    }
  }, [query]);

  return { data, loading, error, setData };
};

export default useAPICall;

/* eslint-enable react-hooks/exhaustive-deps */
