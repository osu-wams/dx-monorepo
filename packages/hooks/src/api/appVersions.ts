import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import { useQuery, UseQueryOptions } from 'react-query';

const useHealthCheck = (opts: UseQueryOptions<{ version: string }, Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/healthcheck', { ...opts, retry: false });
const useAppVersion = (opts: UseQueryOptions<string, Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/app_version', { ...opts, retry: false });

export const useAppVersions = (opts: UseQueryOptions<any, Error> = REACT_QUERY_DEFAULT_CONFIG) => {
  const healthCheck = useHealthCheck(opts);
  const appVersion = useAppVersion(opts);
  return { healthCheck, appVersion };
};
