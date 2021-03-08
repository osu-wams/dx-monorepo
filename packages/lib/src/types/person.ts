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
