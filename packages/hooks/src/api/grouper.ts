import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import { grouperData } from '../mocks/grouper';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { covidvacStudentState } from '../state/grouper';

export const mockGrouper = grouperData;

/**
 * Returns an array of grouper
 */
export const useGrouper = (
  group: string,
  opts: UseQueryOptions<Types.Grouper[], Error> = REACT_QUERY_DEFAULT_CONFIG,
) => {
  return useQuery(`/api/grouper?group=${group}`, opts);
};

export const useHasMember = (
  group: string,
  opts: UseQueryOptions<Types.Grouper[], Error> = REACT_QUERY_DEFAULT_CONFIG,
) => {
  return useQuery(`/api/grouper/hasMember?group=${group}`, opts);
};

/**
 * Fetch the data from the api hook and persist in shared state
 * @returns data and setter for course schedule state
 */
export const useCovidvacStudentState = () => {
  const api = useGrouper('covidvac-student');
  const [covidvacStudent, setcovidvacStudent] = useRecoilState(covidvacStudentState);

  useEffect(() => {
    const { isError, isLoading, isSuccess, data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (isSuccess && data && data !== covidvacStudent.data) {
      setcovidvacStudent({ data, isLoading, isSuccess, isError });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api.data, api.isSuccess]);

  return { covidvacStudent, setcovidvacStudent };
};
