import axios from 'axios';
import { useQuery, BaseQueryOptions, QueryResult } from 'react-query';
import mocks from '../../mocks/student/gpa';
import { Types } from '@osu-wams/lib';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants';

export const mockGpa = mocks;

export const getGpa = (): Promise<Types.GpaLevel[]> => axios.get(`/api/student/gpa`).then(res => res.data);

export const useGpa = (opts: BaseQueryOptions = REACT_QUERY_DEFAULT_CONFIG): QueryResult<Types.GpaLevel[], Error> =>
  useQuery('gpa', getGpa, opts);
