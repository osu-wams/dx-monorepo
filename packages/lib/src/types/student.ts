/**
 * Apigee API Types for Student Data
 */

/**
 * Degree
 */
export interface DegreeResponse {
  attributes: Degree;
}

export interface Degree {
  termDescription: string;
  academicYear: string;
  academicYearDescription: string;
  programNumber: number | null;
  primaryDegree: boolean | null;
  degree: string | null;
  level: string | null;
  college: string | null;
  degreeAwardCategory: string | null;
  majors: {
    first: DegreeMajors | null;
    second: DegreeMajors | null;
    third: DegreeMajors | null;
    fourth: DegreeMajors | null;
  };
  minors: {
    first: string | null;
    second: string | null;
    third: string | null;
    fourth: string | null;
  };
  dualDegree?: {
    degree?: string;
    level?: string;
    college?: string;
    major?: string;
    programClassification?: string;
  };
  honorsInd?: boolean;
}

interface DegreeMajors {
  major: string | null;
  programClassification: string | null;
  department: string | null;
  firstConcentration: string | null;
  secondConcentration: string | null;
  thirdConcentration: string | null;
}

/**
 * Canvas Planner Items
 */

export interface PlannerItem {
  context_type: string;
  course_id: number;
  plannable_id: number;
  planner_override?: PlannerItemOverride;
  plannable_type: string;
  new_activity: boolean;
  submissions?: PlannerItemSubmissions;
  plannable_date: string;
  plannable: PlannerItemPlannable;
  html_url?: string;
  context_name: string;
  context_image?: undefined;
}

interface PlannerItemOverride {
  id: number; // Id of the planner override
  plannable_type: string; // Type of associated object for the planner override
  plannable_id: number; // Id of the object for the planner override
  user_id: number; // Id of the user for the planner override
  assignment_id?: number; // Id of the plannable's associated assignment, if it has one
  workflow_state?: string; // Current published state of the item, synced with associated object
  marked_complete: boolean; // Controls whether or not the associated plannable item is marked complete in the planner
  dismissed: boolean; // Controls whether or not the associated plannable item shows up in the opportunties list
  created_at: string; // The datetime of when the planner override was created
  updated_at?: string; // The datetime of when the planner override was updated
  deleted_at?: string; // The datetime of when the planner override was deleted, if applicable
}

interface PlannerItemSubmissions {
  submitted: boolean;
  excused: boolean;
  graded: boolean;
  late: boolean;
  missing: boolean;
  needs_grading: boolean;
  has_feedback: boolean;
  feedback?: PlannerItemFeedback;
}

interface PlannerItemFeedback {
  comment: string;
  is_media: boolean;
  author_name: string;
  author_avatar_url?: string;
}

interface PlannerItemPlannable {
  id: number;
  title: string;
  todo_date?: null;
  unread_count: number;
  read_state: string;
  created_at: string;
  updated_at: string;
  assignment_id: number;
  points_possible: number;
  due_at: string;
}

/**
 * Class Schedule
 * Course Schedule
 */

export interface CourseScheduleFaculty {
  email: string;
  name: string;
  primary: boolean;
}

export interface CourseScheduleMeetingTime {
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
  type: string;
  attributes: CourseScheduleAttributes;
  links: { self: string | null };
}

interface CourseScheduleAttributes {
  academicYear: string;
  academicYearDescription: string;
  continuingEducation: boolean;
  courseNumber: string;
  courseReferenceNumber: string;
  courseSubject: string;
  courseSubjectDescription: string;
  courseTitle: string;
  creditHours: number;
  faculty: CourseScheduleFaculty[];
  gradingMode: string;
  meetingTimes: CourseScheduleMeetingTime[];
  registrationStatus: string;
  scheduleDescription: string;
  scheduleType: string;
  sectionNumber: string;
  term: string;
  termDescription: string;
}

export interface CourseScheduleResponse {
  links: { self: string };
  data: CourseSchedule[];
}
/**
 * Classification
 */

export interface Classification {
  id: string;
  attributes: {
    level: string;
    classification: string;
    campus: string;
    campusCode: string;
    status: string;
    isInternational: boolean;
  };
}

export interface ClassificationResponse {
  links: { self: string };
  data: Classification;
}

/**
 * GPA
 */
export interface GpaLevel {
  gpa: string;
  gpaType: string;
  level: string;
  levelCode: string;
}

/**
 * Past Course Grades
 */

interface GradesAttributes {
  courseLevel: string;
  courseNumber: string;
  courseReferenceNumber: string;
  courseSubject: string;
  courseSubjectDescription: string;
  courseTitle: string;
  creditHours: number;
  gradeFinal: string;
  gradeMode: string;
  gradeModeDescription: string;
  registrationStatus?: string;
  repeatedCourseInd?: string;
  scheduleDescription?: string;
  scheduleType?: string;
  sectionNumber?: string;
  term: string;
  termDescription: string;
}

export interface Grades {
  type: string;
  id: string;
  links: string;
  attributes: GradesAttributes;
}
