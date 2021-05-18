import { useQuery, UseQueryOptions } from 'react-query';
import mock from '../mocks/pageSearchIndex';
import { Types } from '@osu-wams/lib';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { pageSearchIndexState } from '../state/searchIndex';

export const mockPageSearchIndex = mock;

export const usePageSearchIndex = (
  opts: UseQueryOptions<Types.PageSearchIndex[], Error> = REACT_QUERY_DEFAULT_CONFIG,
) => useQuery('/api/searchIndex/pages', opts);

/**
 * Fetch the data from the api hook and persist in shared state
 * @returns data and setter for page search index state
 */
export const usePageSearchIndexState = () => {
  const api = usePageSearchIndex();
  const [pageSearchIndex, setPageSearchIndex] = useRecoilState(pageSearchIndexState);

  useEffect(() => {
    const { isLoading, isSuccess, isError, data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (isSuccess && data && data !== pageSearchIndex.data) {
      setPageSearchIndex({ data, isLoading, isSuccess, isError });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api.data, api.isSuccess]);

  return { pageSearchIndex, setPageSearchIndex };
};
