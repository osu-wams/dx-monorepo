import axios from 'axios';
import useAPICall from '../useAPICall';

interface Versions {
  serverVersion: string;
  appVersion: string;
}

const getAppVersions = async (): Promise<Versions> => {
  const healthCheck: { version: string } = await axios
    .get('/healthcheck')
    .then(res => res.data)
    .catch(err => {
      console.error(`Failed fetching server deployed version. ${err}`);
      return { version: 'failed-to-fetch' };
    });
  const appVersion: string = await axios
    .get('/app_version')
    .then(res => res.data)
    .catch(err => {
      console.error(`Failed fetching client deployed version. ${err}`);
      return 'failed-to-fetch';
    });
  return {
    serverVersion: healthCheck.version,
    appVersion,
  };
};

const useAppVersions = (initialState: Versions) =>
  useAPICall<Versions>({ api: getAppVersions, dataTransform: (data: any) => data, initialState });

export { Versions, getAppVersions, useAppVersions };
