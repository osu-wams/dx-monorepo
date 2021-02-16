import axios from 'axios';
import { useQuery, QueryObserverConfig, QueryResult } from 'react-query';
import mocks from '../mocks/locations';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import { Types } from '@osu-wams/lib';

export const mockLocations = mocks.locationsData;

export const getLocations = (location: string): Promise<Types.Location[]> =>
  axios.get(`/api/locations/${location}`).then(res => res.data);

export const useLocations = (
  location: string,
  opts: QueryObserverConfig<Types.Location[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.Location[], Error> => useQuery(['locations', location], () => getLocations(location), opts);
