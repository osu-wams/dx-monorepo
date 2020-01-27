import {
  atCampus,
  getAffiliation,
  hasAudience,
  hasPrimaryAffiliation,
  isFirstYear,
  isGraduate,
  isUndergraduate,
  isInternational,
  settingIsDefault,
  settingIsOverridden,
  usersCampus,
  usersSettings,
} from './utils';
import {
  AFFILIATIONS,
  CAMPUS_CODES,
  CLASSIFICATION_AUDIENCES,
  CLASSIFICATIONS,
  DEFAULT_CAMPUS,
  DEFAULT_THEME,
  GROUPS,
  INITIAL_USER,
} from './constants';
import mocks from '../mocks/user';

export {
  mocks as mockUser,
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
  isUndergraduate,
  settingIsDefault,
  settingIsOverridden,
  usersCampus,
  usersSettings,
};
