import axios from 'axios';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/student/courseSchedule';

export const mockCourseSchedule = mocks;

export const getCourseSchedule = (term = 'current'): Promise<CourseSchedule[]> =>
  axios.get(`/api/student/class-schedule?term=${term}`).then(res => res.data);

/**
 * Returns an array of course schedules. A callback function
 * is provided if you want to mutate the data, but it must
 * return an array.
 * @param object containing a term and callback function
 */
export const useCourseSchedule = ({ term = 'current', callback = (data: CourseSchedule[]) => data } = {}) =>
  useAPICall<CourseSchedule[]>({
    api: getCourseSchedule,
    query: term,
    dataTransform: callback,
    initialState: [],
  });

export interface Faculty {
  email: string;
  name: string;
  primary: boolean;
}

export interface MeetingTime {
  beginDate: string;
  beginTime: string;
  building: string;
  buildingDescription: string;
  campus: string;
  creditHourSession: number;
  endDate: string;
  endTime: string;
  hoursPerWeek: number;
  room: string;
  scheduleType: string;
  scheduleDescription: string;
  weeklySchedule: string[];
}

export interface CourseSchedule {
  id: string;
  attributes: CourseScheduleAttributes;
  links: { self: string | null };
  type: string;
}

export interface CourseScheduleAttributes {
  academicYear: string;
  academicYearDescription: string;
  continuingEducation: boolean;
  courseNumber: string;
  courseReferenceNumber: string;
  courseSubject: string;
  courseSubjectDescription: string;
  courseTitle: string;
  creditHours: number;
  faculty: Faculty[];
  gradingMode: string;
  meetingTimes: MeetingTime[];
  registrationStatus: string;
  scheduleDescription: string;
  scheduleType: string;
  sectionNumber: string;
  term: string;
  termDescription: string;
}
