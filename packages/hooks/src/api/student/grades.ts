import axios from 'axios';
import { useQuery, QueryObserverConfig, QueryResult } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants';
import mocks from '../../mocks/student/grades';
import { Types } from '@osu-wams/lib';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { gradesState } from '../../state/grades';

export const mockGrades = mocks;

export const getGrades = (): Promise<Types.Grades[]> => axios.get(`/api/student/grades`).then(res => res.data);

export const useGrades = (
  opts: QueryObserverConfig<Types.Grades[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.Grades[], Error> => {
  return useQuery('grades', () => getGrades(), opts);
};

/**
 * Fetch the data from the api hook and persist in shared state
 * @returns data and setter for grades state
 */
export const useGradesState = () => {
  const api = useGrades();
  const [grades, setGrades] = useRecoilState(gradesState);

  useEffect(() => {
    const { isError, isLoading, isSuccess, data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (isSuccess && data && data !== grades.data) {
      setGrades({ data, isLoading, isSuccess, isError });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api.data, api.isSuccess]);

  return { grades, setGrades };
};
