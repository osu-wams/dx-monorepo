import { User } from '../types';

export const DEFAULT_THEME = 'light';
export const DEFAULT_CAMPUS = 'C';

export const CLASSIFICATIONS = {
  firstYear: ['freshman', 'vet med-first year'],
  graduate: ['graduate', 'cascades partner grad course', 'e-campus graduate course'],
};

export const CLASSIFICATION_AUDIENCES = {
  firstYear: 'First Year',
  international: 'International Student',
  graduate: 'Graduate Student',
};

export const CAMPUS_CODES: { [key: string]: string } = {
  bend: 'B',
  corvallis: 'C',
  ecampus: 'DSC',
};

export const AFFILIATIONS = {
  employee: 'employee',
  student: 'student',
};

export const GROUPS = {
  admin: 'admin',
  masquerade: 'masquerade',
};

export const INITIAL_USER: User = {
  classification: {},
  audienceOverride: {},
  isAdmin: false,
  groups: [],
  theme: DEFAULT_THEME,
  primaryAffiliation: AFFILIATIONS.employee,
};
