/**
 * Address
 */
export interface Address {
  id: string;
  type: string;
  attributes: {
    id: string;
    addressType: string;
    addressTypeDescription: string;
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
    lastUsedDate: string;
    lastUsedPlace: string;
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
  birthDate: string;
  firstName: string | null;
  middleName: string | null;
  lastName: string;
  displayFirstName: string | null;
  displayMiddleName: string | null;
  displayLastName: string | null;
  previousRecords: [] | never;
  homePhone: string | null;
  alternatePhone: string | null;
  osuUID: string;
  primaryPhone: string | null;
  mobilePhone: string | null;
  currentStudent: boolean;
  currentEmployee: boolean;
  employeeStatus: string;
  email: string;
  username: string;
  confidential: boolean;
}

interface Persons {
  id: string;
  type: string;
  attributes: PersonsAttributes;
  links: { self: string };
}

export interface PersonsResponse {
  links: { self: string };
  data: Persons;
}
