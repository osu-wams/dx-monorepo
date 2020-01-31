import axios from 'axios';
import useAPICall from '../useAPICall';
import mocks from '../mocks/announcements';

export const mockAnnouncements = mocks;

export interface Category {
  id: string;
  name: string;
  icon: string;
}
/**
 * Interface for an Announcement.
 */
export interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string;
  bg_image?: string;
  affiliation: string[];
  audiences: string[];
  locations: string[];
  pages: string[];
  action?: object;
}

const getAnnouncements = (type: string): Promise<any> => axios.get(`/api/announcements/${type}`).then(res => res.data);
export const useAnnouncements = (type: string) =>
  useAPICall<any[]>({
    api: getAnnouncements,
    query: type,
    dataTransform: (d: any[]) => d,
    initialState: [],
  });

/**
 * Filter callback to see if the announcement has the same affiliation or if the announcement affiliations are blank.
 * @param affiliation Affiliation name to find
 * @param announcement Announcement to filter against
 * @returns {boolean} true or false based on the affiliation of the user and the affiliation of the announcement
 */
export const hasAffiliation = (affiliation: string, announcement: Announcement): boolean => {
  if (!announcement?.affiliation) return true;

  return (
    announcement?.affiliation?.length === 0 ||
    announcement?.affiliation?.findIndex(s => s.toLowerCase().includes(affiliation.toLowerCase())) > -1
  );
};
