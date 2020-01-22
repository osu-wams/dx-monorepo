import axios from 'axios';
import useAPICall from '../useAPICall';
import mocks from '../mocks/events';

export const mockEvents = mocks;

export interface Event {
  content: string;
  contentSnippet: string;
  isoDate: string;
  link: string;
  pubDate: string;
  title: string;
}

export type Events = Event[];

export const getAcademicCalendarEvents = (): Promise<Events> =>
  axios.get('/api/events/academic-calendar').then(res => res.data);

export const useAcademicCalendarEvents = () =>
  useAPICall<Events>({
    api: getAcademicCalendarEvents,
    dataTransform: (data: Events) => data,
    initialState: [],
  });

// Employee Events for use in the EmployeeDashboard
export const getEmployeeEvents = (): Promise<Events> => axios.get('/api/events/employee').then(res => res.data);

export const useEmployeeEvents = () =>
  useAPICall<Events>({ api: getEmployeeEvents, dataTransform: (data: Events) => data, initialState: [] });

export const getStudentExperienceEvents = () => axios.get('/api/events').then(res => res.data);

export const useStudentExperienceEvents = () =>
  useAPICall({ api: getStudentExperienceEvents, dataTransform: (data: Events) => data, initialState: [] });

export const getCampusEvents = (name: string) => axios.get(`/api/events/campus/${name}`).then(res => res.data);

export const useCampusEvents = (name: string) =>
  useAPICall({ api: getCampusEvents, query: name, dataTransform: (data: Events) => data, initialState: [] });
