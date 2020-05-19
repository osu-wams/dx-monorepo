import axios from 'axios';
import { Types } from '@osu-wams/lib';
import useAPICall from '../useAPICall';
import mocks from '../mocks/events';

export const mockEvents = mocks;

export interface Event extends Types.AcademicEvent {}
export type Events = Event[];
export type AcademicEvents = Event[];
export type LocalistEvents = Types.LocalistEvent[];

export const getAcademicCalendarEvents = (): Promise<Events> =>
  axios.get('/api/events/academic-calendar').then(res => res.data);

export const useAcademicCalendarEvents = () =>
  useAPICall<Events>({
    api: getAcademicCalendarEvents,
    dataTransform: (data: Events) => data,
    initialState: [],
  });

// Employee Events for use in the EmployeeDashboard
export const getEmployeeEvents = (): Promise<LocalistEvents> => axios.get('/api/events/employee').then(res => res.data);

export const useEmployeeEvents = () =>
  useAPICall<LocalistEvents>({
    api: getEmployeeEvents,
    dataTransform: (data: LocalistEvents) => data,
    initialState: [],
  });

export const getStudentExperienceEvents = (): Promise<LocalistEvents> => axios.get('/api/events').then(res => res.data);

export const useStudentExperienceEvents = () =>
  useAPICall<LocalistEvents>({
    api: getStudentExperienceEvents,
    dataTransform: (data: LocalistEvents) => data,
    initialState: [],
  });

export const getCampusEvents = (name: string): Promise<LocalistEvents> =>
  axios.get(`/api/events/campus/${name}`).then(res => res.data);

export const useCampusEvents = (name: string) =>
  useAPICall<LocalistEvents>({
    api: getCampusEvents,
    query: name,
    dataTransform: (data: LocalistEvents) => data,
    initialState: [],
  });
