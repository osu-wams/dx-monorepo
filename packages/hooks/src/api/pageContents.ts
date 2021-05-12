import axios from 'axios';
import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import mocks from '../mocks/pageContents';

export const mockPageContents = mocks;

export const getPageContent = (pageTitle: string): Promise<Types.PageContent[]> =>
  axios.get(`/api/page-content/${pageTitle}`).then((res: Types.PageContentData) => res.data ?? []);

// Returns an array of page content data (title, and content)
export const usePageContent = (
  pageTitle: string,
  opts: UseQueryOptions<Types.PageContent[], Error> = REACT_QUERY_DEFAULT_CONFIG,
) => useQuery(['pageContent', pageTitle], () => getPageContent(pageTitle), opts);
