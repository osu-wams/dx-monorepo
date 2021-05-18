import { useQuery, UseQueryOptions } from 'react-query';
import { User } from '@osu-wams/lib';
import mocks from '../mocks/announcements';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import { userState } from '../state/application';
import { announcementsFilterState, announcementState, filteredAnnouncements } from '../state/announcements';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const mockAnnouncements = mocks;

export const useAnnouncements = (type: string, opts: UseQueryOptions<any, Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery(`/api/announcements/${type}`, opts);

const { getAffiliation } = User;

/**
 * Fetch the data from the api hook and persist in shared state
 * @param page the page name to filter announcements for
 * @returns data, setter, and a filter method related to the announcement state
 */
export const useAnnouncementsState = (page: string) => {
  const api = useAnnouncements(page);
  const [announcements, setAnnouncements] = useRecoilState(announcementState(page));

  const user = useRecoilValue(userState);
  const [filter, setFilter] = useRecoilState(announcementsFilterState(page));
  const filtered = useRecoilValue(filteredAnnouncements(page));

  useEffect(() => {
    if (!user.loading) {
      const affiliation = getAffiliation(user.data);
      if (!filter.affiliation || (filter.affiliation && filter.affiliation !== affiliation)) {
        setFilter({ affiliation, page });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, user.data, user.loading]);

  useEffect(() => {
    const { isError, isLoading, isSuccess, data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (isSuccess && data && data !== announcements.data) {
      setAnnouncements({ data, isLoading, isSuccess, isError, page });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api.data, api.isSuccess]);

  return { announcements, setAnnouncements, filtered };
};
