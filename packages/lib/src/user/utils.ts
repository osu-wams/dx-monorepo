import { User, UserSettings } from '../types';
import { CLASSIFICATIONS, CLASSIFICATION_AUDIENCES, CAMPUS_CODES, DEFAULT_CAMPUS, AFFILIATIONS } from './constants';

/**
 * Returns the audience override value or users classification in that order
 * of precedence.
 * @param user the user to inspect
 * @returns whether or not the override or user classification is true
 */
const isFirstYear = (user: User, includesOverride = true): boolean => {
  if (user?.audienceOverride?.firstYear !== undefined && includesOverride) {
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
const isInternational = (user: User, includesOverride = true): boolean => {
  if (user.audienceOverride?.international !== undefined && includesOverride) {
    return user.audienceOverride.international;
  }

  return user.classification?.attributes !== undefined && user.classification.attributes.isInternational;
};

/**
 * Returns the audience override value or users classification in that order
 * of precedence.
 * @param user the user to inspect
 * @returns if the user is graduate
 */
const isGraduate = (user: User, includesOverride = true): boolean => {
  if (user.audienceOverride?.graduate !== undefined && includesOverride) {
    return user.audienceOverride.graduate;
  }

  const userLevelCode = user.classification?.attributes?.levelCode?.toLowerCase();
  return userLevelCode !== undefined && CLASSIFICATIONS.graduate.includes(userLevelCode);
};

/**
 * Returns if the users classification is an undergraduate student
 * @param user the user to inspect
 * @returns if the user is an undergraduate
 */
const isUndergraduate = (user: User): boolean => {
  const userLevelCode = user.classification?.attributes?.levelCode?.toLowerCase();
  return userLevelCode !== undefined && CLASSIFICATIONS.undergraduate.includes(userLevelCode);
};

/**
 * Returns whether or not the users current primaryAffiliation is one of the supplied affiliations.
 * This intends to check if the user is a student or an employee while giving the application the ability
 * to specify scenarios where the user is in a number of affiliations.
 * @param user the user to inspect
 * @param affiliations the affiliations to check if the user is associated with
 */
const hasPrimaryAffiliation = (user: User, affiliations: string[]): boolean => {
  if (user.primaryAffiliationOverride) {
    return affiliations.includes(user.primaryAffiliationOverride);
  }

  return affiliations.includes(user.primaryAffiliation);
};

/**
 * Returns a boolean based on if the user is a student (has "student" affiliation in array)
 * @param user
 */
const isStudent = (user: User): boolean => {
  return user.affiliations.some(a => a === AFFILIATIONS.student);
};

/**
 * Returns a boolean based on if the user is an employee only (doesn't have student in the affiliations array)
 * @param user
 */
const isEmployeeOnly = (user: User): boolean => {
  return !user.affiliations.some(a => a === AFFILIATIONS.student);
};

/**
 * Returns your primary affiliation or the affiliationOverride if one is present
 * @param user the user to inspect
 */
const getAffiliation = (user: User): string => {
  if (user.primaryAffiliationOverride === '') return user.primaryAffiliation;
  return user.primaryAffiliationOverride ?? user.primaryAffiliation;
};

/**
 * This method returns a fully populated user settings theme and overrides taking into consideration
 * thier student classification as well as any potentially persisted overrides
 * @param user the user to inspect
 */
const usersSettings = (user: User): UserSettings => ({
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
const settingIsDefault = (
  user: User | undefined,
  propertyName: string,
  currentValue: string,
  defaultValue: string,
): boolean => {
  if (user && user.classification && isStudent(user)) {
    const {
      classification: { attributes },
    } = user;
    if (attributes) {
      return attributes[propertyName] === currentValue;
    }
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
const settingIsOverridden = (
  user: User | undefined,
  propertyName: string,
  currentValue: boolean | undefined,
  defaultValue: boolean,
): boolean => {
  if (user && isStudent(user)) {
    switch (propertyName) {
      case 'international':
        if (currentValue === undefined) {
          return false;
        }

        return isInternational(user, false) !== currentValue;

      case 'firstYear':
        if (currentValue === undefined) {
          return false;
        }

        return isFirstYear(user, false) !== currentValue;

      case 'graduate':
        if (currentValue === undefined) {
          return false;
        }

        return isGraduate(user, false) !== currentValue;

      default:
        if (currentValue === undefined) {
          return false;
        }

        return currentValue !== defaultValue;
    }
  }

  return currentValue !== defaultValue;
};

/**
 * Returns the audience override value or users classification in that order
 * of precedence.
 * @param user the user to inspect
 * @returns the campus name and campus code that the user is associated with
 */
const usersCampus = (user: User): { campusName: string | undefined; campusCode: string } => {
  const campusCode = user.audienceOverride?.campusCode || user.classification?.attributes?.campusCode || DEFAULT_CAMPUS;
  // Find the key name associated to the users campusCode to use for matching in the audiences
  // set for the announcement
  const campusName = Object.keys(CAMPUS_CODES)
    .map(k => k.toLowerCase())
    .find(key => CAMPUS_CODES[key].map(c => c.toLowerCase()).includes(campusCode.toLowerCase()));
  return { campusCode, campusName };
};

/**
 * Detect if the item provided is intended to be visible by the User. The logic is as follows;
 *  - The user affiliation (Employee or Student) _must_ match the user, or the item is not visible.
 *  - The users campus (Corvallis, Bend, Ecampus) _must_ match the user, or the item is not visible.
 *  - Evaluate the audience tags;
 *    - If the user doesn't have audience classification properties, then the item should be visible, this type of
 *      user is likely an employee.
 *    - If audiences are empty, then this is considered visible by everyone.
 *    - If audiences are specified, then at least one _must_ match the user attributes, or the item is not visible.
 * @param user the user to inspect
 * @param item an item with audiences, locations, and affiliations to consider
 */
const hasAudience = (
  user: User,
  item: { audiences: string[]; locations: string[]; affiliation: string[] },
): boolean => {
  // The users affiliation wasn't found, don't show this item
  const { audiences, locations, affiliation } = item;
  const usersAffiliation = getAffiliation(user);
  if (!hasValue(affiliation, usersAffiliation)) return false;

  // The user affiliation was found but the campus can't be detected, this is a data problem!
  const { campusName, campusCode } = usersCampus(user);
  if (!campusName) {
    console.error(
      `Expected campus code ${campusCode} not found in configuration, this is an unexpected circumstance that needs to be repaired.`,
    );
    return false;
  }

  // The user affiliation was found but not the campus, don't show this
  if (!hasValue(locations, campusName)) return false;

  const usersAudiences: string[] = [];

  // This is an employee (no user.classification.attributes), using the Student Dashboard (usersAffiliation is finding
  // the affiliationOverride set), and they have no audienceOverrides set in thier profile, then default to returning
  // true if the item is an undergrad audience.. Undergrad is considered the default audience.
  if (isEmployeeOnly(user) && usersAffiliation === AFFILIATIONS.student) {
    // Audience override is only empty if user has never changed any data. Once they have changed it,
    // they'll have data even if they've reset it to their defaults and have no overrides
    if (Object.keys(user.audienceOverride).length === 0) {
      return item.audiences.some(a => CLASSIFICATION_AUDIENCES.undergraduate.toLowerCase() === a.toLowerCase());
    }

    if (!user?.audienceOverride?.graduate) usersAudiences.push(CLASSIFICATION_AUDIENCES.undergraduate.toLowerCase());
  }

  // Employee in the employee dashboard
  if (isEmployeeOnly(user) && usersAffiliation === AFFILIATIONS.employee) {
    return item.affiliation.some(a => AFFILIATIONS.employee.toLowerCase() === a.toLowerCase());
  }

  // The user affiliation and campus were found, audiences empty is treated as reason to show all
  if (audiences?.length === 0) return true;

  // Only students including student employees should reach this block...
  // Graduates cannot be firstYear or undergraduate students but can be international
  if (isGraduate(user)) {
    usersAudiences.push(CLASSIFICATION_AUDIENCES.graduate.toLowerCase());
  } else {
    if (isUndergraduate(user)) usersAudiences.push(CLASSIFICATION_AUDIENCES.undergraduate.toLowerCase());

    if (isFirstYear(user)) usersAudiences.push(CLASSIFICATION_AUDIENCES.firstYear.toLowerCase());
  }

  if (isInternational(user)) usersAudiences.push(CLASSIFICATION_AUDIENCES.international.toLowerCase());

  // The item has been evaluated to be visible for this users affiliation and campus, and the item
  // has audience specified. Return whether or not one of the users audiences are specified in the item
  return item.audiences.some(a => usersAudiences.includes(a.toLowerCase()));
};

/**
 * Detect if the users classification indicates that they are part of the campus provided
 * @param user the user to inspect
 * @param code the campus code for comparison
 */
const atCampus = (user: User, code: string): boolean => {
  const { campusCode } = usersCampus(user);
  return campusCode.toLowerCase() === code.toLowerCase();
};

/**
 * Inspect an array of strings to find a case-insensitive value
 * @param list an array of strings to consider
 * @param value the value to find
 */
const hasValue = (list: string[], value: string): boolean => {
  return list?.filter(v => v !== null && v !== undefined).some(a => a.toLowerCase() === value.toLowerCase());
};

export {
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
