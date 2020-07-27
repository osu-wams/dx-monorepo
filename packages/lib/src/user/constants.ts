import { Types } from '../';

export const DEFAULT_THEME = 'light';
export const DEFAULT_CAMPUS = 'C';

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
export const LEVEL_CODE = {
  notDeclared: '00',
  undergraduate: '01',
  graduate: '02',
  postBac: '03',
  nonDegree: '04',
  professional: '05',
  intoOSU: '06',
  cascadesPartner: 'cp',
  cascadesPartnerGrad: 'cg',
  obsolete: 'cx',
  nonCredit: 'nc',
  ecampusUndegrad: 'd1',
  ecampusGrad: 'd2',
  ecampusOverlay: 'dO',
  ecampusIntermediate: 'dr',
  ecampusCCLPHD: 'd3',
};

export const CLASSIFICATIONS = {
  firstYear: ['freshman', 'vet med-first year'],
  graduate: [LEVEL_CODE.graduate, LEVEL_CODE.cascadesPartnerGrad, LEVEL_CODE.ecampusGrad],
  undergraduate: [
    LEVEL_CODE.undergraduate,
    LEVEL_CODE.notDeclared,
    LEVEL_CODE.postBac,
    LEVEL_CODE.nonCredit,
    LEVEL_CODE.nonDegree,
    LEVEL_CODE.intoOSU,
    LEVEL_CODE.cascadesPartner,
    LEVEL_CODE.professional,
    LEVEL_CODE.ecampusCCLPHD,
    LEVEL_CODE.ecampusIntermediate,
    LEVEL_CODE.ecampusOverlay,
    LEVEL_CODE.ecampusUndegrad,
    LEVEL_CODE.obsolete,
  ],
};

/** Classification / Attributes / Classification enum
  - Freshman
  - Sophomore
  - Junior
  - Senior
  - Vet Med-First Year
  - Determine from Student Type
  - Continuing Higher Education
  - Vet Med-Second Year
  - Vet Med-Third Year
  - Vet Med-Fourth Year
  - Auditor Only
*/

export const SUBCLASSIFICATION = {
  freshman: 'Freshman',
  sophomore: 'Sophomore',
  junior: 'Junior',
  senior: 'Senior',
  vetmed1: 'Vet Med-First Year',
  vetmed2: 'Vet Med-Second Year',
  vetmed3: 'Vet Med-Third Year',
  vetmed4: 'Vet Med-Fourth Year',
  auditor: 'Auditor Only',
  continuing: 'Continuing Higher Education',
  determine: 'Determine from Student Type',
};

export const CLASSIFICATION_AUDIENCES = {
  firstYear: 'First Year',
  international: 'International Student',
  graduate: 'Graduate Student',
  undergraduate: 'Undergraduate Student',
};

/**
 * Campus Code References
 * B - Oregon State - Cascades
 * 2 - Central Oregon - COCC, Bend
 * DSC - Dist. Degree Corvallis Student
 * DSB - Dist. Degree Cascades Student
 * D0 - Ecampus-Distance Ed Bvrton/Hil
 * D7 - Ecampus-Distance Ed Astoria/CC
 * D8 - Ecampus-Distance Ed Ontario
 * D9 - Ecampus-Distance Ed Pdleton/BM
 * DA - Ecampus-Distance Ed Ashld/SOU
 * DE - Ecampus-Distance Ed Eugene/UO
 * DH - Ecampus-Distance Ed PDX/OHSU
 * DK - Ecampus-Distance Ed Klmth Fals
 * DL - Ecampus-Distance Ed LaGd/EOU
 * DM - Ecampus-Distance Ed Monmth/WOU
 * DN - Ecampus-Distance Ed Newpt/HMSC
 * DO - Ecampus-Distance Ed PDX-OCATE
 * DP - Ecampus-Distance Ed PDX - PSU
 * DQ - Ecampus-Distance Ed WRM SPRS
 * DS - Ecampus-Distance Ed Other US
 * DV - Ecampus-Distance Ed Hood River
 * DX - Ecampus-Distance Ed Medfrd
 * DY - Ecampus-Distance Ed /MHCC
 * DZ - Ecampus-Distance Ed Internatl
 * D1 - Ecampus-Distance Ed Overlay
 * DI - Ecampus-Distance Education-LD
 * DB - Ecampus-Distance Education-UD
 * DR - Ecampus-Dist Ed Intermediate
 * DJ - Ecampus-Distance Ed OSU Campus
 * D2 - Ecampus-Distance Ed Centl. OR
 * DC - Ecampus-Dist Ed-UD-Cascades
 * DT - Ecampus-Dist ED Clackamas
 * DLP - ECampus-Comm Coll Leadrshp Pgm
 * D3 - Ecampus-Distance Ed Salem/CCC
 * D4 - Ecampus-Distance Ed PDX/PCC
 * D5 - Ecampus-Distance Ed CosBaySWOC
 * D6 - Ecampus-Distance Ed Albany LBC
 * I - OBSOLETE Dist & Online Courses
 * A - Ashland/SOU
 * O - Portland - OCATE Center
 * E - Eugene/UO
 * H - Portland/OHSU
 * M - Monmouth/WOU
 * N - Newport/HMSC
 * P - Portland/PSU
 * K - Klamath Falls/KCC/OIT
 * L - LaGrande/EOU
 * C - Oregon State - Corvallis
 * S - Other States (Non-Oregon)
 * J - Corvallis - OSU Campus, Statew
 * Z - International Sites
 * Q - Central Oregon - Warm Springs
 * 3 - Salem/CCC
 * 4 - Portland/PCC
 * 5 - Coos Bay/SWOCC
 * 6 - Albany/LBCC
 * 7 - Astoria/CCC
 * 8 - Ontario/TVCC
 * 9 - Pendleton/BMCC
 * V - Hood River/The Dalles
 * X - Medford/Grants Pass
 * Y - Gresham/MHCC
 * 0 - Beaverton/Hillsboro/Cptl Cntr
 */
export const CAMPUS_CODES: { [key: string]: string[] } = {
  bend: ['B', '2'],
  corvallis: [
    'C',
    'A',
    'J',
    'O',
    'E',
    'H',
    'M',
    'N',
    'P',
    'K',
    'L',
    'C',
    'S',
    'Z',
    'Q',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'V',
    'X',
    'Y',
    '0',
  ],
  ecampus: [
    'DSC',
    'DSB',
    'D0',
    'D7',
    'D8',
    'D9',
    'DA',
    'DE',
    'DH',
    'DK',
    'DL',
    'DM',
    'DN',
    'DO',
    'DP',
    'DQ',
    'DS',
    'DV',
    'DX',
    'DY',
    'DZ',
    'D1',
    'DI',
    'DB',
    'DR',
    'DJ',
    'D2',
    'DC',
    'DT',
    'DLP',
    'D3',
    'D4',
    'D5',
    'D6',
    'I',
  ],
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
  affiliations: [AFFILIATIONS.employee],
  theme: DEFAULT_THEME,
  primaryAffiliation: AFFILIATIONS.employee,
  favoriteResources: [],
};
