import { UseQueryOptions } from 'react-query';

const REACT_QUERY_DEFAULT_CONFIG: UseQueryOptions<any, any> = {
  /**
   * Set this to `false` to disable automatic refetching when the query mounts or changes query keys.
   * To refetch the query, use the `refetch` method returned from the `useQuery` instance.
   */
  enabled: true,
  /**
   * Query results that are currently rendered on the screen (via useQuery and similar hooks) will become
   * "stale" immediately after they are resolved and will be refetched automatically in the background when
   * they are rendered or used again. To change this, you can alter the default staleTime for queries
   * to something other than 0 milliseconds.
   */
  staleTime: 1000 * 60 * 5,
  /**
   * Query results that become unused (all instances of the query are unmounted) will still be cached
   * in case they are used again for a default of 5 minutes before they are garbage collected. To change
   * this, you can alter the default cacheTime for queries to something other than 1000 * 60 * 5 milliseconds.
   */
  cacheTime: 1000 * 60 * 10,
  /**
   * Stale queries will automatically be refetched in the background when the browser window is refocused
   * by the user. You can disable this using the refetchOnWindowFocus option in queries or the global config.
   */
  refetchOnWindowFocus: true,
};

const BASEURL = window.location.protocol ? `${window.location.protocol}//${window.location.host}` : '';

export { BASEURL, REACT_QUERY_DEFAULT_CONFIG };
