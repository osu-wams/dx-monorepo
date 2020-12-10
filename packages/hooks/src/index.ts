import useAPICall from './useAPICall';
import * as Announcements from './api/announcements';
import { useAnnouncements } from './api/announcements';
import * as AppVersions from './api/appVersions';
import { useAppVersions } from './api/appVersions';
import * as Alerts from './api/alerts';
import { useDxAlerts, useRaveAlerts } from './api/alerts';
import * as Classification from './api/classification';
import * as Errors from './api/errors';
import * as Events from './api/events';
import {
  useAcademicCalendarEvents,
  useCampusEvents,
  useEmployeeEvents,
  useStudentExperienceEvents,
} from './api/events';
import * as InfoButtons from './api/infoButtons';
import { useInfoButtons } from './api/infoButtons';
import * as Masquerade from './api/masquerade';
import * as PageContents from './api/pageContents';
import { usePageContent } from './api/pageContents';
import * as Person from './api/person';
import { useAddresses, useMealPlans, usePerson } from './api/person';
import * as ReleaseNotes from './api/releaseNotes';
import { useReleaseNotes } from './api/releaseNotes';
import * as Resources from './api/resources';
import { useResources, useCategories, useResourcesByQueue, useTrendingResources } from './api/resources';
import * as Cards from './api/cards';
import { useCards } from './api/cards';
import * as Status from './api/status';
import { useStatus } from './api/status';
import * as Student from './api/student';
import {
  useAcademicStatus,
  useAccountBalance,
  useAccountTransactions,
  useCourseSchedule,
  useGpa,
  useGrades,
  useHolds,
  usePlannerItems,
  useDegrees,
} from './api/student';
import * as User from './api/user';
import { useMessages, useUser } from './api/user';
import * as Trainings from './api/trainings';
import { useTrainings, useTrainingAudiences, useTrainingTags } from './api/trainings';
import * as Admin from './api/admin';
import * as Constants from './constants';

export {
  Admin,
  Announcements,
  AppVersions,
  Alerts,
  Cards,
  Classification,
  Constants,
  Errors,
  Events,
  InfoButtons,
  Masquerade,
  PageContents,
  Person,
  ReleaseNotes,
  Resources,
  Status,
  Student,
  Trainings,
  User,
  useCards,
  useDegrees,
  useAcademicCalendarEvents,
  useAcademicStatus,
  useAccountBalance,
  useAccountTransactions,
  useAddresses,
  useAnnouncements,
  useAPICall,
  useAppVersions,
  useCampusEvents,
  useCategories,
  useCourseSchedule,
  useDxAlerts,
  useEmployeeEvents,
  useGpa,
  useGrades,
  useHolds,
  useInfoButtons,
  useMealPlans,
  useMessages,
  usePageContent,
  usePerson,
  usePlannerItems,
  useRaveAlerts,
  useReleaseNotes,
  useResources,
  useResourcesByQueue,
  useStatus,
  useStudentExperienceEvents,
  useTrainings,
  useTrainingAudiences,
  useTrainingTags,
  useTrendingResources,
  useUser,
};
