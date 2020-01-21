import axios from 'axios';
import useAPICall from '../useAPICall';
import mocks from '../mocks/pageContents';

export const mockPageContents = mocks;

export const getPageContent = (pageTitle: string): Promise<PageContent[]> =>
  axios.get(`/api/page-content/${pageTitle}`).then((res: PageContentData) => res.data ?? []);

export const usePageContent = (pageTitle: string) =>
  useAPICall<PageContent[]>({
    api: getPageContent,
    query: pageTitle,
    dataTransform: (data: PageContent[]) => data,
    initialState: [],
  });

export interface PageContent {
  title: string;
  content: string;
}

export interface PageContentData {
  data: PageContent[];
}
