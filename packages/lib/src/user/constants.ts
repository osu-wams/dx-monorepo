import { Types } from '../';

/**
 * Classification Academic References
    - `00` - Level Not Declared
    - `02` - Graduate
    - `03` - Postbac Degree Seeking
    - `01` - Undergraduate
    - `04` - Non-Degree / Credential
    - `05` - Professional
    - `CP` - Cascades Partner
    - `CG` - Cascades Partner Grad Course
    - `CX` - Obsolete - Do not use
    - `D1` - E-Campus Undergraduate Course
    - `D2` - E-Campus Graduate Course
    - `DO` - E-Campus Overlay Course
    - `DR` - E-Campus Intermediate Course
    - `NC` - Non Credit
    - `06` - INTO OSU GE/AE/Pathways
    - `D3` - ECampus CCLP & Couseling PHD
 */
export const DEFAULT_THEME = 'light';
export const DEFAULT_CAMPUS = 'C';

export const CLASSIFICATIONS = {
  firstYear: ['freshman', 'vet med-first year'],
  graduate: ['02', 'cg', 'd2'],
  undergraduate: ['01', 'cp', 'd1', '00', '03', '04', '05', 'do', 'dr', 'nc', '06', 'd3'],
};

export const CLASSIFICATION_AUDIENCES = {
  firstYear: 'First Year',
  international: 'International Student',
  graduate: 'Graduate Student',
  undergraduate: 'Undergraduate Student',
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

export const INITIAL_USER: Types.User = {
  classification: {},
  audienceOverride: {},
  isAdmin: false,
  groups: [],
  theme: DEFAULT_THEME,
  primaryAffiliation: AFFILIATIONS.employee,
  favoriteResources: [],
};
