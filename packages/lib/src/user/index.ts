import { User } from '../types';
import {
  atCampus,
  getAffiliation,
  hasAudience,
  hasPrimaryAffiliation,
  isFirstYear,
  isGraduate,
  isInternational,
  settingIsDefault,
  settingIsOverridden,
  usersCampus,
  usersSettings,
} from './utils';
import mocks from '../mocks/user';

const mockUser = mocks;

const DEFAULT_THEME = 'light';
const DEFAULT_CAMPUS = 'C';

const CLASSIFICATIONS = {
  firstYear: ['freshman', 'vet med-first year'],
  graduate: ['graduate', 'cascades partner grad course', 'e-campus graduate course'],
};

const CLASSIFICATION_AUDIENCES = {
  firstYear: 'First Year',
  international: 'International Student',
  graduate: 'Graduate Student',
};

const CAMPUS_CODES: { [key: string]: string } = {
  bend: 'B',
  corvallis: 'C',
  ecampus: 'DSC',
};

const AFFILIATIONS = {
  employee: 'employee',
  student: 'student',
};

const GROUPS = {
  admin: 'admin',
  masquerade: 'masquerade',
};

const INITIAL_USER: User = {
  classification: {},
  audienceOverride: {},
  isAdmin: false,
  groups: [],
  theme: DEFAULT_THEME,
  primaryAffiliation: AFFILIATIONS.employee,
};

export {
  mockUser,
  AFFILIATIONS,
  CAMPUS_CODES,
  CLASSIFICATION_AUDIENCES,
  CLASSIFICATIONS,
  DEFAULT_CAMPUS,
  DEFAULT_THEME,
  GROUPS,
  INITIAL_USER,
  atCampus,
  getAffiliation,
  hasAudience,
  hasPrimaryAffiliation,
  isFirstYear,
  isGraduate,
  isInternational,
  settingIsDefault,
  settingIsOverridden,
  usersCampus,
  usersSettings,
};
