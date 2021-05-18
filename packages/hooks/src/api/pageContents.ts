import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import mocks from '../mocks/pageContents';

export const mockPageContents = mocks;

// Returns an array of page content data (title, and content)
export const usePageContent = (
  pageTitle: string,
  opts: UseQueryOptions<Types.PageContent[], Error> = REACT_QUERY_DEFAULT_CONFIG,
) => useQuery(`/api/page-content/${pageTitle}`, opts);
