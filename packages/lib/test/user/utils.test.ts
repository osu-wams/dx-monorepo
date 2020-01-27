import {
  atCampus,
  getAffiliation,
  hasAudience,
  hasPrimaryAffiliation,
  isFirstYear,
  isGraduate,
  isUndergraduate,
  isInternational,
  settingIsDefault,
  settingIsOverridden,
  usersCampus,
  usersSettings,
} from '../../src/user/utils';
import { mockUser } from '../../src/user';
import { User } from '../../src/types';

const { user } = mockUser;
const classificationAttributes = user.data.classification.attributes ?? {
  levelCode: '',
  level: '',
  campus: '',
  campusCode: '',
  classification: '',
  isInternational: false,
};
const mockedUser = jest.fn<User, any>(() => user.data);

beforeEach(() => {
  mockedUser.mockReturnValue(user.data);
});
describe('atCampus', () => {
  it('detects the user at the campus', async () => {
    expect(atCampus(mockedUser(), 'C')).toBeTruthy();
  });
  it('detects the user is not at this campus', async () => {
    expect(atCampus(mockedUser(), 'B')).toBeFalsy();
  });
});

describe('getAffiliation', () => {
  it('detects primaryAffiliation', async () => {
    expect(getAffiliation(mockedUser())).toBe('student');
  });
  it('detects the primaryAffiliationOverride', async () => {
    mockedUser.mockReturnValue({ ...user.data, primaryAffiliationOverride: 'employee' });
    expect(getAffiliation(mockedUser())).toBe('employee');
  });
});

describe('isFirstYear', () => {
  it('detects first year student', async () => {
    expect(isFirstYear(mockedUser())).toBeTruthy();
  });
  it('detects first year student freshman classification', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      classification: { attributes: { ...classificationAttributes, classification: 'freshman' } },
      audienceOverride: {},
    });
    expect(isFirstYear(mockedUser())).toBeTruthy();
  });
  it('detects first year student vet med first year classification', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      classification: { attributes: { ...classificationAttributes, classification: 'vet med-first year' } },
      audienceOverride: {},
    });
    expect(isFirstYear(mockedUser())).toBeTruthy();
  });
  it('detects a first year student override', async () => {
    mockedUser.mockReturnValue({ ...user.data, audienceOverride: { firstYear: true } });
    expect(isFirstYear(mockedUser())).toBeTruthy();
  });
  it('detects not a first year student override', async () => {
    mockedUser.mockReturnValue({ ...user.data, audienceOverride: { firstYear: false } });
    expect(isFirstYear(mockedUser())).toBeFalsy();
  });
  it('detects not first year student', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      classification: { attributes: { ...classificationAttributes, classification: 'blah' } },
      audienceOverride: {},
    });
    expect(isFirstYear(mockedUser())).toBeFalsy();
  });
});

describe('isGraduate', () => {
  it('detects graduate student', async () => {
    expect(isGraduate(mockedUser())).toBeTruthy();
  });
  it('detects graduate student graduate classification', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      classification: { attributes: { ...classificationAttributes, levelCode: '02' } },
      audienceOverride: {},
    });
    expect(isGraduate(mockedUser())).toBeTruthy();
  });
  it('detects graduate student cascades classification', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      classification: { attributes: { ...classificationAttributes, levelCode: 'cg' } },
      audienceOverride: {},
    });
    expect(isGraduate(mockedUser())).toBeTruthy();
  });
  it('detects graduate student ecampus classification', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      classification: { attributes: { ...classificationAttributes, levelCode: 'd2' } },
      audienceOverride: {},
    });
    expect(isGraduate(mockedUser())).toBeTruthy();
  });
  it('detects a graduate student override', async () => {
    mockedUser.mockReturnValue({ ...user.data, audienceOverride: { graduate: true } });
    expect(isGraduate(mockedUser())).toBeTruthy();
  });
  it('detects not a graduate student override', async () => {
    mockedUser.mockReturnValue({ ...user.data, audienceOverride: { graduate: false } });
    expect(isGraduate(mockedUser())).toBeFalsy();
  });
  it('detects not graduate student', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      classification: { attributes: { ...classificationAttributes, level: '', levelCode: '' } },
      audienceOverride: {},
    });
    expect(isGraduate(mockedUser())).toBeFalsy();
  });
});

describe('isUndergraduate', () => {
  it('detects undergraduate student undergraduate classification', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      classification: { attributes: { ...classificationAttributes, levelCode: '01' } },
      audienceOverride: {},
    });
    expect(isUndergraduate(mockedUser())).toBeTruthy();
  });
  it('detects undergraduate student cascades classification', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      classification: { attributes: { ...classificationAttributes, levelCode: 'cp' } },
      audienceOverride: {},
    });
    expect(isUndergraduate(mockedUser())).toBeTruthy();
  });
  it('detects undergraduate student ecampus classification', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      classification: { attributes: { ...classificationAttributes, levelCode: 'd1' } },
      audienceOverride: {},
    });
    expect(isUndergraduate(mockedUser())).toBeTruthy();
  });
  it('detects not undergraduate student', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      classification: { attributes: { ...classificationAttributes, level: '', levelCode: '' } },
      audienceOverride: {},
    });
    expect(isUndergraduate(mockedUser())).toBeFalsy();
  });
});

describe('isInternational', () => {
  it('detects international student', async () => {
    expect(isInternational(mockedUser())).toBeTruthy();
  });
  it('detects a international student override', async () => {
    mockedUser.mockReturnValue({ ...user.data, audienceOverride: { international: true } });
    expect(isInternational(mockedUser())).toBeTruthy();
  });
  it('detects not a international student override', async () => {
    mockedUser.mockReturnValue({ ...user.data, audienceOverride: { international: false } });
    expect(isInternational(mockedUser())).toBeFalsy();
  });
  it('detects not international student', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      classification: { attributes: { ...classificationAttributes, isInternational: false } },
      audienceOverride: {},
    });
    expect(isInternational(mockedUser())).toBeFalsy();
  });
});

describe('hasAudience', () => {
  it('returns true that the user is an undergraduate student ', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      classification: { attributes: { ...classificationAttributes, levelCode: '01' } },
      audienceOverride: {},
    });
    const result = hasAudience(mockedUser(), { audiences: ['Undergraduate Student'] });
    expect(result).toBeTruthy();
  });
  it('returns true that the user is a graduate student ', async () => {
    const result = hasAudience(mockedUser(), { audiences: ['Graduate Student'] });
    expect(result).toBeTruthy();
  });
  it('returns false that the user is not a graduate student ', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      audienceOverride: {},
      classification: { attributes: { ...classificationAttributes, level: '', levelCode: '' } },
    });
    const result = hasAudience(mockedUser(), { audiences: ['Graduate Student'] });
    expect(result).toBeFalsy();
  });
  it('returns true that the user is a first year student ', async () => {
    const result = hasAudience(mockedUser(), { audiences: ['First Year'] });
    expect(result).toBeTruthy();
  });
  it('returns false that the user is not a first year student ', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      audienceOverride: {},
      classification: { attributes: { ...classificationAttributes, classification: 'not-first-year' } },
    });
    const result = hasAudience(mockedUser(), { audiences: ['First Year'] });
    expect(result).toBeFalsy();
  });
  it('returns true that the user is an international student ', async () => {
    const result = hasAudience(mockedUser(), { audiences: ['International Student'] });
    expect(result).toBeTruthy();
  });
  it('returns false that the user is not an international student ', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      audienceOverride: {},
      classification: { attributes: { ...classificationAttributes, isInternational: false } },
    });
    const result = hasAudience(mockedUser(), { audiences: ['International Student'] });
    expect(result).toBeFalsy();
  });
  it('logs an error when an unrecognized campus exists on the users details', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mockedUser.mockReturnValue({
      ...user.data,
      audienceOverride: { campusCode: 'BOBROSS' },
      classification: { attributes: { ...classificationAttributes, campusCode: 'BOBROSS' } },
    });
    hasAudience(mockedUser(), { audiences: ['Corvallis'] });
    expect(console.error).toHaveBeenCalledTimes(1);
  });
  it('returns true by default when there are no audiences to check for', async () => {
    const result = hasAudience(mockedUser(), { audiences: [] });
    expect(result).toBeTruthy();
  });
  it('returns true by default when the user has no audience related data', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      audienceOverride: {},
      classification: { attributes: undefined },
    });
    const result = hasAudience(mockedUser(), { audiences: ['First Year'] });
    expect(result).toBeTruthy();
  });
});

describe('settingIsOverridden', () => {
  it('returns false when an unexpected property is evaluated', async () => {
    const result = settingIsOverridden(mockedUser(), 'BOB_ROSS', true, true);
    expect(result).toBeFalsy();
  });
  it('returns false when current and default values match', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      classification: { attributes: undefined },
    });
    const result = settingIsOverridden(mockedUser(), 'BOB_ROSS', true, true);
    expect(result).toBeFalsy();
  });
  it('returns true when current and default values do not match', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      classification: {},
    });
    const result = settingIsOverridden(mockedUser(), 'BOB_ROSS', true, false);
    expect(result).toBeTruthy();
  });
  ['graduate', 'firstYear', 'international'].forEach(propertyName => {
    it(`returns true that ${propertyName} user is overridden`, async () => {
      const result = settingIsOverridden(mockedUser(), propertyName, false, true);
      expect(result).toBeTruthy();
    });
    it(`returns false that ${propertyName} user is not overridden`, async () => {
      const result = settingIsOverridden(mockedUser(), propertyName, true, true);
      expect(result).toBeFalsy();
    });
    it(`returns false that ${propertyName} user default value is undefined so this is not overridden`, async () => {
      const result = settingIsOverridden(mockedUser(), propertyName, undefined, true);
      expect(result).toBeFalsy();
    });
  });
});

describe('settingIsDefault', () => {
  it('returns true when current and default values match', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      classification: { attributes: undefined },
    });
    const result = settingIsDefault(mockedUser(), 'BOB_ROSS', 'current', 'current');
    expect(result).toBeTruthy();
  });
  it('returns false when current and default values do not match', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      classification: {},
    });
    const result = settingIsDefault(mockedUser(), 'BOB_ROSS', 'current', 'overridden');
    expect(result).toBeFalsy();
  });
  it(`returns true that a property for the user matches the users classification attribute `, async () => {
    const result = settingIsDefault(mockedUser(), 'level', 'Graduate', 'default');
    expect(result).toBeTruthy();
  });
  it(`returns false that an overridden property for the user is not matching the users classification attribute`, async () => {
    const result = settingIsDefault(mockedUser(), 'level', 'overridden', 'default');
    expect(result).toBeFalsy();
  });
});

describe('getAffiliation', () => {
  it('returns the override', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      primaryAffiliationOverride: 'employee',
    });
    const result = getAffiliation(mockedUser());
    expect(result).toEqual('employee');
    expect(user.data.primaryAffiliation).toEqual('student');
  });
  it('returns the default', async () => {
    const result = getAffiliation(mockedUser());
    expect(result).toEqual('student');
    expect(user.data.primaryAffiliation).toEqual('student');
  });
});

describe('hasPrimaryAffiliation', () => {
  it('has a primary affiliation override which exists in the supplied affiliations', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      primaryAffiliationOverride: 'employee',
    });
    const result = hasPrimaryAffiliation(mockedUser(), ['employee', 'student']);
    expect(result).toBeTruthy();
  });
  it('has a primary affiliation override which does not exist in the supplied affiliations', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      primaryAffiliationOverride: 'employee',
    });
    const result = hasPrimaryAffiliation(mockedUser(), ['student']);
    expect(result).toBeFalsy();
  });
  it('has a primary affiliation which exists in the supplied affiliations', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      primaryAffiliation: 'employee',
    });
    const result = hasPrimaryAffiliation(mockedUser(), ['employee', 'student']);
    expect(result).toBeTruthy();
  });
  it('has a primary affiliation which does not exist in the supplied affiliations', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      primaryAffiliation: 'employee',
    });
    const result = hasPrimaryAffiliation(mockedUser(), ['student']);
    expect(result).toBeFalsy();
  });
});

describe('usersSettings', () => {
  it('has users settings', async () => {
    expect(usersSettings(mockedUser())).toEqual({
      audienceOverride: { campusCode: 'C', firstYear: true, graduate: true, international: true },
      primaryAffiliationOverride: undefined,
      theme: 'light',
    });
  });
});

describe('usersCampus', () => {
  it('has corvallis users campus', async () => {
    expect(usersCampus(mockedUser())).toEqual({ campusCode: 'C', campusName: 'corvallis' });
  });
  it('has bend users campus', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      audienceOverride: { campusCode: 'B' },
      classification: { attributes: { ...classificationAttributes, campusCode: 'B' } },
    });
    expect(usersCampus(mockedUser())).toEqual({ campusCode: 'B', campusName: 'bend' });
  });
  it('has ecampus users campus', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      audienceOverride: { campusCode: 'DSC' },
      classification: { attributes: { ...classificationAttributes, campusCode: 'DSC' } },
    });
    expect(usersCampus(mockedUser())).toEqual({ campusCode: 'DSC', campusName: 'ecampus' });
  });
});
