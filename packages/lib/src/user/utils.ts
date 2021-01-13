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

  // Employees that were once students have classification data. We don't want to take that into account
  // since they are no longer students.
  if (isEmployeeOnly(user)) {
    return false;
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

  // Employees that were once students have classification data. We don't want to take that into account
  // since they are no longer students.
  if (isEmployeeOnly(user)) {
    return false;
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

  // Employees that were once students have classification data. We don't want to take that into account
  // since they are no longer students.
  if (isEmployeeOnly(user)) {
    return false;
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
  // Employees that were once students have classification data. We don't want to take that into account
  // since they are no longer students.
  if (isEmployeeOnly(user)) {
    return false;
  }

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
 * Returns a boolean based on if the user is an employee (has "employee" affiliation in array)
 * @param user
 */
const isEmployee = (user: User): boolean => {
  return user.affiliations.some(a => a === AFFILIATIONS.employee);
};

/**
 * Returns a boolean based on if the user is an employee only (doesn't have student in the affiliations array)
 * @param user
 */
const isEmployeeOnly = (user: User): boolean => {
  return isEmployee(user) && !isStudent(user);
};

/**
 * Returns if the users affiliationOverride (or affiliation) is set to match the provided dashboard name
 * @param user the user
 * @param dashboard the dashboard (student | employee)
 */
const inDashboard = (user: User, dashboard: string): boolean => {
  return getAffiliation(user) === dashboard;
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
  devTools: user.devTools,
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
 * Returns whether or not the user is an employee who is a former student
 * @param user the user to inspect
 */
const employeeIsFormerStudent = (user: User): boolean => {
  if (isEmployee(user) && user.classification?.attributes) {
    return true;
  }

  return false;
};

/**
 * Returns the audience override value or users classification in that order
 * of precedence.
 * @param user the user to inspect
 * @returns the campus name and campus code that the user is associated with
 */
const usersCampus = (user: User): { campusName: string | undefined; campusCode: string } => {
  let campusCode = user.audienceOverride?.campusCode || user.classification?.attributes?.campusCode || DEFAULT_CAMPUS;

  // Check to see if user is employee who used to be a student, return either audience override or default campus
  if (employeeIsFormerStudent(user)) {
    campusCode = user.audienceOverride?.campusCode || DEFAULT_CAMPUS;
  }

  // Find the key name associated to the users campusCode to use for matching in the audiences
  // set for the announcement
  const campusName = Object.keys(CAMPUS_CODES)
    .map(k => k.toLowerCase())
    .find(key => CAMPUS_CODES[key].map(c => c.toLowerCase()).includes(campusCode.toLowerCase()));
  return { campusCode, campusName };
};

/**
 * Find the users campus and detect if the supplied item has a matching location for the campus name found.
 * @param user the user to inspect
 * @param item an item with locations
 */
const hasLocation = (user: User, item: { locations: string[] }): boolean => {
  const { campusName, campusCode } = usersCampus(user);
  if (!campusName) {
    console.error(
      `Expected campus code ${campusCode} not found in configuration, this is an unexpected circumstance that needs to be repaired.`,
    );
    return false;
  }

  return hasValue(item.locations, campusName);
};

/**
 * Determine if the provided item.affiliation includes the users affiliation
 * @param user the user to inspect
 * @param item an item with affiliation
 */
const hasAffiliation = (user: User, item: { affiliation: string[] }): boolean => {
  return hasValue(item.affiliation, getAffiliation(user));
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
  const { audiences, affiliation } = item;
  const { undergraduate, international, graduate, firstYear } = CLASSIFICATION_AUDIENCES;
  const { employee, student } = AFFILIATIONS;

  if (!hasAffiliation(user, item)) return false;
  if (!hasLocation(user, item)) return false;

  // Items with no audiences specified is treated as a "show to everyone", so return true early
  if (audiences?.length === 0) return true;

  // Depending on which dashboard the user is viewing, collect the user audiences we expect to
  // filter and display to them.
  const usersAudiences: string[] = [];

  // STUDENT DASHBOARD LOGIC ---------------
  if (inDashboard(user, student)) {
    // This is an employee (no user.classification.attributes), using the Student Dashboard.
    // Ensure that a default audience of undergraduate exists unless they have an
    // audience override specifying to see graduate student items.
    if (isEmployeeOnly(user) && (Object.keys(user.audienceOverride).length === 0 || !isGraduate(user))) {
      // Audience override is only empty if user has never changed any data. Once they have changed it,
      // they'll have data even if they've reset it to their defaults and have no overrides
      usersAudiences.push(undergraduate);
    }

    // Students, student employees, and employees who are looking at the student dashboard should
    // evaluate if they are or have profile overrides indicating they are one of the following classifications.
    // Graduates cannot be firstYear or undergraduate students but can be international.
    if (isGraduate(user)) {
      usersAudiences.push(graduate);
    } else {
      if (isUndergraduate(user)) usersAudiences.push(undergraduate);
      if (isFirstYear(user)) usersAudiences.push(firstYear);
    }

    if (isInternational(user)) usersAudiences.push(international);
  }

  // EMPLOYEE DASHBOARD LOGIC ---------------
  if (inDashboard(user, employee)) {
    // Return early for users who are not students, match any item which has the employee
    // affiliation
    if (isEmployeeOnly(user)) {
      return affiliation.some(a => employee.toLowerCase() === a.toLowerCase());
    }

    // Employees who are also Graduate Students should see "undergraduate" (default) items in the
    // employee dashboard.
    if (isStudent(user) && isGraduate(user)) {
      usersAudiences.push(undergraduate);
    }
  }

  // Check the items audiences and return if there are any matches that were set in the logic
  // exercised above, insuring case-insensitive matching.
  const foundAudiences = usersAudiences.map(a => a.toLowerCase());
  return audiences.map(a => a.toLowerCase()).some(a => foundAudiences.includes(a));
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
