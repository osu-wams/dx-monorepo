import axios from 'axios';
import useAPICall from '../useAPICall';
import * as Classification from './classification';
import { useEffect, useState } from 'react';
import mocks from '../mocks/user';

export const mockUser = mocks;

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

export interface UserClassificationAttributes {
  [key: string]: any;
  level: string;
  campus: string;
  campusCode: string;
  classification: string;
  isInternational: boolean;
}

export interface UserClassification {
  attributes?: UserClassificationAttributes;
  id?: string;
}

export interface User {
  email?: string;
  isCanvasOptIn?: boolean;
  isAdmin: boolean;
  groups: string[];
  classification: UserClassification;
  audienceOverride: UserAudienceOverride;
  theme: string;
  primaryAffiliation: string;
  primaryAffiliationOverride?: string;
}

export interface UserState {
  data: User;
  error: boolean;
  loading: boolean;
  isCanvasOptIn?: boolean;
}

export interface UserAudienceOverride {
  campusCode?: string;
  firstYear?: boolean;
  graduate?: boolean;
  international?: boolean;
}

export interface UserSettings {
  audienceOverride?: UserAudienceOverride;
  primaryAffiliationOverride?: string;
  theme?: string;
}

export const INITIAL_USER: User = {
  classification: {},
  audienceOverride: {},
  isAdmin: false,
  groups: [],
  theme: DEFAULT_THEME,
  primaryAffiliation: AFFILIATIONS.employee,
};

/**
 * Returns the audience override value or users classification in that order
 * of precedence.
 * @param user the user to inspect
 * @returns whether or not the override or user classification is true
 */
const isFirstYear = (user: User): boolean => {
  if (user?.audienceOverride?.firstYear !== undefined) {
    return user.audienceOverride.firstYear;
  }

  const userClassification = user?.classification?.attributes?.classification?.toLowerCase();
  return userClassification !== undefined && CLASSIFICATIONS.firstYear.includes(userClassification);
};

/**
 * Returns the audience override value or users classification in that order
 * of precedence.
 * @param user the user to inspect
 * @returns whether or not the override or user classification is true
 */
const isInternational = (user: User): boolean => {
  if (user.audienceOverride?.international !== undefined) {
    return user.audienceOverride.international;
  }

  return user.classification?.attributes !== undefined && user.classification.attributes.isInternational;
};

/**
 * Returns the audience override value or users classification in that order
 * of precedence.
 * @param user the user to inspect
 * @returns whether or not the override or user classification is true
 */
const isGraduate = (user: User): boolean => {
  if (user.audienceOverride?.graduate !== undefined) {
    return user.audienceOverride.graduate;
  }

  const userLevel = user.classification?.attributes?.level?.toLowerCase();
  return userLevel !== undefined && CLASSIFICATIONS.graduate.includes(userLevel);
};

/**
 * Returns whether or not the users current primaryAffiliation is one of the supplied affiliations.
 * This intends to check if the user is a student or an employee while giving the application the ability
 * to specify scenarios where the user is in a number of affiliations.
 * @param user the user to inspect
 * @param affiliations the affiliations to check if the user is associated with
 */
export const hasPrimaryAffiliation = (user: User, affiliations: string[]): boolean => {
  if (user.primaryAffiliationOverride) {
    return affiliations.includes(user.primaryAffiliationOverride);
  }

  return affiliations.includes(user.primaryAffiliation);
};

/**
 * Returns your primary affiliation or the affiliationOverride if one is present
 * @param user the user to inspect
 */
export const getAffiliation = (user: User): string => {
  return user.primaryAffiliationOverride ?? user.primaryAffiliation;
};

/**
 * This method returns a fully populated user settings theme and overrides taking into consideration
 * thier student classification as well as any potentially persisted overrides
 * @param user the user to inspect
 */
export const usersSettings = (user: User): UserSettings => ({
  theme: user.theme,
  audienceOverride: {
    campusCode: usersCampus(user).campusCode,
    firstYear: isFirstYear(user),
    international: isInternational(user),
    graduate: isGraduate(user),
  },
  primaryAffiliationOverride: user.primaryAffiliationOverride,
});

/**
 * Detect if the user setting matches the default, taking into consideration the student classification if it exists.
 * @param user the user to inspect
 * @param propertyName check the student classification property value
 * @param currentValue the value to consider when the student classification doesn't exist
 * @param defaultValue the default value for comparison
 */
export const settingIsDefault = (
  user: User,
  propertyName: string,
  currentValue: string,
  defaultValue: string,
): boolean => {
  const {
    classification: { attributes },
  } = user;
  if (attributes) {
    return attributes[propertyName] === currentValue;
  }

  return currentValue === defaultValue;
};

/**
 * Detect if the user setting is an override of the default, taking into consideration the student classification if it exists.
 * @param user the user to inspect
 * @param propertyName check the student classification property value
 * @param currentValue the value to consider when the student classification doesn't exist
 * @param defaultValue the default value for comparison
 */
export const settingIsOverridden = (
  user: User,
  propertyName: string,
  currentValue: boolean | undefined,
  defaultValue: boolean,
): boolean => {
  const {
    classification: { attributes },
  } = user;
  if (attributes) {
    const { isInternational, classification, level } = attributes;
    switch (propertyName) {
      case 'international':
        if (isInternational && currentValue !== undefined) {
          return !currentValue;
        }

        return false;

      case 'firstYear':
        if (CLASSIFICATIONS.firstYear.includes(classification?.toLowerCase()) && currentValue !== undefined) {
          return !currentValue;
        }

        return false;

      case 'graduate':
        if (CLASSIFICATIONS.graduate.includes(level?.toLowerCase()) && currentValue !== undefined) {
          return !currentValue;
        }

        return false;

      default:
        return false;
    }
  } else {
    return currentValue !== defaultValue;
  }
};

/**
 * Returns the audience override value or users classification in that order
 * of precedence.
 * @param user the user to inspect
 * @returns the campus name and campus code that the user is associated with
 */
export const usersCampus = (user: User): { campusName: string | undefined; campusCode: string } => {
  const { campusCode } = user.classification?.attributes ?? {
    campusCode: DEFAULT_CAMPUS,
  };
  const campusCodeOverride = user.audienceOverride?.campusCode ?? DEFAULT_CAMPUS;
  const selectedCampusCode = campusCodeOverride || campusCode;
  // Find the key name associated to the users campusCode to use for matching in the audiences
  // set for the announcement
  const campusName = Object.keys(CAMPUS_CODES)
    .map(k => k.toLowerCase())
    .find(key => CAMPUS_CODES[key].toLowerCase() === selectedCampusCode.toLowerCase());
  return { campusCode: selectedCampusCode, campusName };
};

/**
 * Detects if the user is associated with any of the audiences that are provided. An audience could be
 * the users campus code or the classifications (both of which take into account the user override settings)
 * @param user the user to inspect
 * @param item a list of audiences to detect
 */
export const hasAudience = (user: User, item: { audiences: string[] }): boolean => {
  const foundAudiences: string[] = [];
  const { audiences } = item;
  if (
    audiences?.length === 0 ||
    (user.classification?.attributes === undefined && Object.keys(user.audienceOverride).length === 0)
  )
    return true;

  const { campusName, campusCode } = usersCampus(user);

  if (campusName) {
    foundAudiences.push(campusName);
  } else {
    console.error(
      `Expected campus code ${campusCode} not found in configuration, this is an unexpected circumstance that needs to be repaired.`,
    );
  }

  if (isGraduate(user)) foundAudiences.push(CLASSIFICATION_AUDIENCES.graduate);
  if (isFirstYear(user)) foundAudiences.push(CLASSIFICATION_AUDIENCES.firstYear);
  if (isInternational(user)) foundAudiences.push(CLASSIFICATION_AUDIENCES.international);

  // The user has a classification and the item has audiences specified, return if
  // this users campusCode exists in the audience list.
  return item.audiences.some(a => foundAudiences.map(fa => fa.toLowerCase()).includes(a.toLowerCase()));
};

/**
 * Detect if the users classification indicates that they are part of the campus provided
 * @param user the user to inspect
 * @param code the campus code for comparison
 */
export const atCampus = (user: User, code: string): boolean => {
  const { campusCode } = usersCampus(user);
  return campusCode.toLowerCase() === code.toLowerCase();
};

export const getUser = (): Promise<User> => axios.get('/api/user').then(res => res.data);

/**
 * The primary hook to fetch the user session and set the user for access throughout the application, this
 * is intended to be set near the root level of the application and exposed by way of the UserContext.
 */
export const useUser = () => {
  const [user, setUser] = useState<UserState>({
    data: INITIAL_USER,
    error: false,
    loading: true,
    isCanvasOptIn: false,
  });
  const u = useAPICall<User>({
    api: getUser,
    dataTransform: (data: User) => data,
    initialState: INITIAL_USER,
    useCache: false,
  });
  const classification = useAPICall<UserClassification>({
    api: Classification.getClassification,
    dataTransform: (data: UserClassification) => data,
    initialState: {},
    useCache: true,
  });

  useEffect(() => {
    setUser({
      data: { ...u.data, classification: { ...classification.data } },
      error: u.error,
      loading: u.loading,
      isCanvasOptIn: u.data.isCanvasOptIn,
    });
  }, [u.data, u.error, u.loading, classification.data, classification.loading]);

  return {
    error: user.error,
    data: user.data,
    loading: user.loading,
    isCanvasOptIn: user.data?.isCanvasOptIn ?? false,
    setUser,
  };
};

/**
 * Send the settings to the backend to be saved.
 * @param settings the settings to persist to the backend
 */
export const postSettings = (settings: UserSettings): Promise<UserSettings> =>
  axios
    .post('/api/user/settings', settings)
    .then(res => res.data)
    .catch(e => {
      console.error(e);
      throw e;
    });
