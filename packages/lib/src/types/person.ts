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
AA - Alcohol Dependent
AEC - Alcohol.edu Complete
AER - Alcohol.edu Required
AI - All immunizations missing
AR - Archives
CA - completed all immunizations
CH - Clear Health Hist requirement
CI - Completed MMR and MCV4 Reqmnt
CICC - CIC Complete
CICR - CIC Required
CICW - CIC Waived
COVIDVACC - COVID-19 Vaccine Completed
CT - Clear T.B. requirement
DISABSURV - Disability Survey
ER - Early Registration
FO - Health History Form Only
HAC - Haven Complete
HAR - Haven Required
HH - Health History missing
IA - Inpatient Admit/Discharge
ID - inpatient diagnosis
IP - inpatient practitioner
LD - Learning Disabled
M1 - First measles missing
M2 - Second measles missing
MBB1 - Bexsero 1
MBB2 - Bexsero 2
MBEM - MenB Exception Medical
MBEN - MenB Exception Non-Medical
MBFA - MenB Former Academic Exception
MBT1 - Trumenba 1
MBT2 - Trumenba 2
MBT3 - Trumenba 3
MU - mumps missing
NHB - Needs Hepatitis B requirement
NMB - Meng B Form - Not Proof of Vax
NMCV - Needs MCV4 requirement
NMMR - Needs MMR requirement
NTD - Needs Tdap Requirement
NVAR - Needs Varicella Requirement
OC - Occupational Medicine
PP - Paraplegic
PW - Perm Immunization Waiver Signd
RU - Rubella missing
ST - Storage
TA - T.B. Testing needed
TB - T.B. CXR needed
TC - T.B. F.U. needed
TD - PPD positive
TE - Taking INH
TF - Completed INH
TG - T.B. testing complete
TH - Needing INH Counseling
TK - Completed INH Counseling
TW - temp immunization waiver signd
WD - Withdrawn
*/
export interface Medical {
  id: string;
  code:
    | 'AA'
    | 'AEC'
    | 'AER'
    | 'AI'
    | 'AR'
    | 'CA'
    | 'CH'
    | 'CI'
    | 'CICC'
    | 'CICR'
    | 'CICW'
    | 'COVIDVACC'
    | 'CT'
    | 'DISABSURV'
    | 'ER'
    | 'FO'
    | 'HAC'
    | 'HAR'
    | 'HH'
    | 'IA'
    | 'ID'
    | 'IP'
    | 'LD'
    | 'M1'
    | 'M2'
    | 'MBB1'
    | 'MBB2'
    | 'MBEM'
    | 'MBEN'
    | 'MBFA'
    | 'MBT1'
    | 'MBT2'
    | 'MBT3'
    | 'MU'
    | 'NHB'
    | 'NMB'
    | 'NMCV'
    | 'NMMR'
    | 'NTD'
    | 'NVAR'
    | 'OC'
    | 'PP'
    | 'PW'
    | 'RU'
    | 'ST'
    | 'TA'
    | 'TB'
    | 'TC'
    | 'TD'
    | 'TE'
    | 'TF'
    | 'TG'
    | 'TH'
    | 'TK'
    | 'TW'
    | 'WD';
  description: string;
  codeDate?: string;
}
