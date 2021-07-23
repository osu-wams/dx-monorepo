/**
 * Address
 */
export interface Address {
  id: string;
  type: string;
  attributes: {
    addressType: {
      code: string;
      description: string | null;
    };
    addressLine1: string;
    addressLine2: string | null;
    addressLine3: string | null;
    addressLine4: string | null;
    houseNumber: string | null;
    city: string;
    stateCode: string;
    state: string;
    postalCode: string;
    countyCode: string;
    county: string;
    nationCode: string | null;
    nation: string | null;
    lastModified: string;
  };
  links: { self: string };
}

export interface AddressesResponse {
  links: { self: string };
  data: Address[];
}

/**
 * Meal Plans
 * Synonyms: Orange Cash
 */
export interface MealPlan {
  id: string;
  type: string;
  attributes: {
    mealPlans: string;
    balance: number;
    lastUsed: {
      dateTime: string;
      location: string;
    };
  };
  links: { self: string };
}

export interface MealPlansResponse {
  links: { self: string };
  data: MealPlan[];
}

/**
 * Persons
 * Synonyms: Profile
 */

export interface PersonsAttributes {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  citizen: {
    code: string;
    description: string;
  };
  sex: string;
  displayFirstName: string;
  displayMiddleName: string;
  displayLastName: string;
  onid: string;
  confidentialInd: boolean;
  currentStudentInd: boolean;
  employeeStatus: {
    code: string;
    description: string;
  };
  ssnStatus: string;
  lastPaidDate: string;
}

export interface Persons {
  id: string;
  type: string;
  attributes: PersonsAttributes;
  links: { self: string };
}

export interface PersonsResponse {
  links: { self: string };
  data: Persons;
}

/**
 * Phones
 */

export interface PhoneAttributes {
  areaCode: string;
  phoneNumber: string;
  phoneExtension: string;
  primaryInd: boolean;
  phoneType: {
    code: string;
    description: string;
  };
  addressType: {
    code: string;
    description: string;
  };
  fullPhoneNumber: string;
  lastModified: string;
}

export interface Phone {
  id: string;
  type: string;
  attributes: PhoneAttributes;
  links: { self: string };
}

/**
 * Emails
 */
interface EmailAttributes {
  emailType: {
    code: string;
    description: string;
  };
  emailAddress: string;
  comment: string;
  preferredInd: boolean;
  lastActivityDate: string;
}

export interface Email {
  id: string;
  type: string;
  attributes: EmailAttributes;
  links: { self: string };
}

/* Medical Codes
LD - Learning Disabled
MU - mumps missing
ID - inpatient diagnosis
IP - inpatient practitioner
TW - temp immunization waiver signd
CA - completed all immunizations
MBEM - MenB Exception Medical
AA - Alcohol Dependent
HH - Health History missing
M2 - Second measles missing
CT - Clear T.B. requirement
DISABSURV - Disability Survey
HAC - Haven Complete
HAR - Haven Required
NHB - Needs Hepatitis B requirement
NVAR - Needs Varicella Requirement
CICR - CIC Required
MBB1 - Bexsero 1
MBB2 - Bexsero 2
AI - All immunizations missing
TA - T.B. Testing needed
FO - Health History Form Only
AR - Archives
CICC - CIC Complete
MBEN - MenB Exception Non-Medical
RU - Rubella missing
TE - Taking INH
TG - T.B. testing complete
WD - Withdrawn
TH - Needing INH Counseling
TK - Completed INH Counseling
AER - Alcohol.edu Required
NMCV - Needs MCV4 requirement
MBT1 - Trumenba 1
PP - Paraplegic
M1 - First measles missing
TB - T.B. CXR needed
IA - Inpatient Admit/Discharge
NMB - Meng B Form - Not Proof of Vax
CI - Completed MMR and MCV4 Reqmnt
TC - T.B. F.U. needed
TD - PPD positive
TF - Completed INH
CICW - CIC Waived
ST - Storage
NTD - Needs Tdap Requirement
COVIDVACC - COVID-19 Vaccine Completed
MBT3 - Trumenba 3
MBFA - MenB Former Academic Exception
ER - Early Registration
OC - Occupational Medicine
PW - Perm Immunization Waiver Signd
CH - Clear Health Hist requirement
AEC - Alcohol.edu Complete
NMMR - Needs MMR requirement
MBT2 - Trumenba 2
*/
export interface Medical {
  id: string;
  code:
    | 'LD'
    | 'MU'
    | 'ID'
    | 'IP'
    | 'TW'
    | 'CA'
    | 'MBEM'
    | 'AA'
    | 'HH'
    | 'M2'
    | 'CT'
    | 'DISABSURV'
    | 'HAC'
    | 'HAR'
    | 'NHB'
    | 'NVAR'
    | 'CICR'
    | 'MBB1'
    | 'MBB2'
    | 'AI'
    | 'TA'
    | 'FO'
    | 'AR'
    | 'CICC'
    | 'MBEN'
    | 'RU'
    | 'TE'
    | 'TG'
    | 'WD'
    | 'TH'
    | 'TK'
    | 'AER'
    | 'NMCV'
    | 'MBT1'
    | 'PP'
    | 'M1'
    | 'TB'
    | 'IA'
    | 'NMB'
    | 'CI'
    | 'TC'
    | 'TD'
    | 'TF'
    | 'CICW'
    | 'ST'
    | 'NTD'
    | 'COVIDVACC'
    | 'MBT3'
    | 'MBFA'
    | 'ER'
    | 'OC'
    | 'PW'
    | 'CH'
    | 'AEC'
    | 'NMMR'
    | 'MBT2';
  description: string;
  codeDate?: string;
}
