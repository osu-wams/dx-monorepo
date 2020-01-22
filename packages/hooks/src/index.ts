import useAPICall from './useAPICall';
import * as Announcements from './api/announcements';
import { useAnnouncements } from './api/announcements';
import * as AppVersions from './api/appVersions';
import { useAppVersions } from './api/appVersions';
import * as Alerts from './api/alerts';
import { useDxAlerts, useRaveAlerts } from './api/alerts';
import * as Classification from './api/classification';
import * as Errors from './api/errors';
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
import { useResources, useCategories, useResourcesByQueue } from './api/resources';
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
} from './api/student';

export {
  Announcements,
  AppVersions,
  Alerts,
  Classification,
  Errors,
  InfoButtons,
  Masquerade,
  PageContents,
  Person,
  ReleaseNotes,
  Resources,
  Status,
  Student,
  useAcademicStatus,
  useAccountBalance,
  useAccountTransactions,
  useAddresses,
  useAnnouncements,
  useAPICall,
  useAppVersions,
  useCategories,
  useCourseSchedule,
  useDxAlerts,
  useGpa,
  useGrades,
  useInfoButtons,
  useMealPlans,
  usePageContent,
  usePerson,
  useRaveAlerts,
  useReleaseNotes,
  useResources,
  useResourcesByQueue,
  useStatus,
};
