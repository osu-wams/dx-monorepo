import axios from 'axios';
import { useQuery, QueryObserverConfig, QueryResult } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import mocks from '../mocks/pageContents';

export const mockPageContents = mocks;

export const getPageContent = (pageTitle: string): Promise<PageContent[]> =>
  axios.get(`/api/page-content/${pageTitle}`).then((res: PageContentData) => res.data ?? []);

// Returns an array of page content data (title, and content)
export const usePageContent = (
  pageTitle: string,
  opts: QueryObserverConfig<PageContent[], Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<PageContent[], Error> => useQuery(['pageContent', pageTitle], () => getPageContent(pageTitle), opts);

export interface PageContent {
  title: string;
  content: string;
}

export interface PageContentData {
  data: PageContent[];
}
