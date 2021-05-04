import { Types } from '@osu-wams/lib';
import { format } from './helpers';
/**
 * Hacky method (that's being kind) which tries to find a course that the student is
 * currently enrolled in that matches the course context name for an assignment being
 * rendered. This method *depends* on the fact that courses are defined a certain way
 * in Canvas. *see the example contextName*
 *
 * If there are no matches found for any reason (the format of the contextName changes, there are
 * no courses returned from the API, etc) then return undefined.
 * * example contextName = "INTRO NATIVE AMERICAN STUDIES (ES_241_400_F2019)"
 * @param contextName the course context name from Canvas, not included in every kind of planner item (ie. planner_note)
 * @param courseList the array of courses for the student
 */
export const matchedCourseContext = (
  courses: Types.CourseSchedule[],
  contextName?: string,
): { courseSubject: string; courseNumber: string } | undefined => {
  if (!contextName) return undefined;

  // Expecting the context name to include something like "(PSY_240_400_F2019)"
  // and matching groups as subject "PSY" and number "240"
  const matches = contextName.match(/\((?<courseSubject>\w+)_(?<courseNumber>\w+)_\w+_\w+\)/);
  if (matches && matches.groups) {
    const { courseSubject, courseNumber } = matches.groups;
    const course = courses.find(
      c =>
        c.attributes.courseSubject.toLowerCase() === courseSubject.toLowerCase() &&
        c.attributes.courseNumber.toLowerCase() === courseNumber.toLowerCase(),
    );
    if (course) {
      return { courseSubject, courseNumber };
    }
  }
  return undefined;
};

/**
 * Optionally return a formatted data for Canvas planner items depending on type
 * @param contextType the canvas planner item context type
 * @param date an optional date provided for the plannable item
 */
export const plannerItemDate = (contextType: string, date?: any) => {
  if (!date || contextType === 'announcement') {
    return;
  }

  if (contextType && date) {
    if (contextType === 'calendar_event') {
      return format(date);
    } else {
      return `Due ${format(date, 'dueAt')}`;
    }
  }
  return;
};
