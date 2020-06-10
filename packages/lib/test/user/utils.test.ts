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
import { mockUser, AFFILIATIONS } from '../../src/user';
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
  const mockedItem = jest.fn();
  const item = {
    locations: [user.data.classification.attributes?.campus || 'Corvallis'],
    affiliation: [user.data.primaryAffiliation],
    audiences: [],
  };
  describe('as an Employee', () => {
    beforeEach(() => {
      mockedUser.mockReturnValue({
        ...user.data,
        primaryAffiliation: AFFILIATIONS.employee,
        primaryAffiliationOverride: undefined,
        audienceOverride: {},
      });
    });

    it('returns false when the item is intended for a student ', async () => {
      mockedItem.mockReturnValue({ ...item, affiliation: [AFFILIATIONS.student] });
      expect(hasAudience(mockedUser(), mockedItem())).toBeFalsy();
    });
    it('returns true when the item is intended for an undergraduate and the Affiliation Override is Student (Student Dashboard for example)', async () => {
      mockedUser.mockReturnValue({
        ...user.data,
        classification: { attributes: undefined },
        primaryAffiliation: AFFILIATIONS.employee,
        primaryAffiliationOverride: AFFILIATIONS.student,
        audienceOverride: {},
      });
      mockedItem.mockReturnValue({
        ...item,
        affiliation: [AFFILIATIONS.student],
        audiences: ['Undergraduate Student'],
      });
      expect(hasAudience(mockedUser(), mockedItem())).toBeTruthy();
    });

    it('returns false when Employee has audienceOverride is set to Graduate when the item is intended for an undergraduate', async () => {
      mockedUser.mockReturnValue({
        ...user.data,
        classification: { attributes: undefined },
        primaryAffiliation: AFFILIATIONS.employee,
        primaryAffiliationOverride: AFFILIATIONS.student,
        audienceOverride: { graduate: true },
      });
      mockedItem.mockReturnValue({
        ...item,
        affiliation: [AFFILIATIONS.student],
        audiences: ['Undergraduate Student'],
      });
      expect(hasAudience(mockedUser(), mockedItem())).toBeFalsy();
    });

    it('returns false when the item is intended for a graduate student and the Affiliation Override is Student (Student Dashboard for example)', async () => {
      mockedUser.mockReturnValue({
        ...user.data,
        classification: { attributes: undefined },
        primaryAffiliation: AFFILIATIONS.employee,
        primaryAffiliationOverride: AFFILIATIONS.student,
        audienceOverride: {},
      });
      mockedItem.mockReturnValue({
        ...item,
        affiliation: [AFFILIATIONS.student],
        audiences: ['Graduate Student'],
      });
      expect(hasAudience(mockedUser(), mockedItem())).toBeFalsy();
    });
    it('returns true when the item is intended for a graduate student and the audienceOverride is set to graduate too', async () => {
      mockedUser.mockReturnValue({
        ...user.data,
        classification: { attributes: undefined },
        primaryAffiliation: AFFILIATIONS.employee,
        primaryAffiliationOverride: AFFILIATIONS.student,
        audienceOverride: { graduate: true },
      });
      mockedItem.mockReturnValue({
        ...item,
        affiliation: [AFFILIATIONS.student],
        audiences: ['Graduate Student'],
      });
      expect(hasAudience(mockedUser(), mockedItem())).toBeTruthy();
    });
    it('returns false when the item is intended for a campus other than the default (an employee doesnt have campus classification)', async () => {
      mockedItem.mockReturnValue({ ...item, affiliation: [AFFILIATIONS.employee], locations: ['ECampus'] });
      expect(hasAudience(mockedUser(), mockedItem())).toBeFalsy();
    });
    it('returns false when the item is intended for a campus that the user is not on ', async () => {
      mockedUser.mockReturnValue({
        ...user.data,
        classification: { attributes: { ...classificationAttributes, campusCode: 'B' } },
        primaryAffiliation: AFFILIATIONS.employee,
        primaryAffiliationOverride: undefined,
        audienceOverride: {},
      });
      mockedItem.mockReturnValue({ ...item, affiliation: [AFFILIATIONS.employee], locations: ['Corvallis'] });
      expect(hasAudience(mockedUser(), mockedItem())).toBeFalsy();
    });
    it('returns true when the item has no audiences specified ', async () => {
      mockedUser.mockReturnValue({
        ...user.data,
        classification: { attributes: undefined },
        primaryAffiliation: AFFILIATIONS.employee,
        primaryAffiliationOverride: undefined,
        audienceOverride: {},
      });
      mockedItem.mockReturnValue({ ...item, affiliation: [AFFILIATIONS.employee], locations: ['Corvallis'] });
      expect(hasAudience(mockedUser(), mockedItem())).toBeTruthy();
    });
    it('returns false when the item has an audiences specified ', async () => {
      mockedUser.mockReturnValue({
        ...user.data,
        classification: { attributes: undefined },
        primaryAffiliation: AFFILIATIONS.employee,
        primaryAffiliationOverride: undefined,
        audienceOverride: {},
      });
      mockedItem.mockReturnValue({
        ...item,
        affiliation: [AFFILIATIONS.employee, AFFILIATIONS.student],
        locations: ['Corvallis', 'Bend', 'Ecampus'],
        audiences: ['Graduate Student'],
      });
      expect(hasAudience(mockedUser(), mockedItem())).toBeFalsy();
    });
    it('returns true when the item has an audiences specified and the user as an audience override matching ', async () => {
      mockedUser.mockReturnValue({
        ...user.data,
        classification: { attributes: undefined },
        primaryAffiliation: AFFILIATIONS.employee,
        primaryAffiliationOverride: undefined,
        audienceOverride: { graduate: true },
      });
      mockedItem.mockReturnValue({
        ...item,
        affiliation: [AFFILIATIONS.employee, AFFILIATIONS.student],
        locations: ['Corvallis', 'Bend', 'Ecampus'],
        audiences: ['Graduate Student'],
      });
      expect(hasAudience(mockedUser(), mockedItem())).toBeTruthy();
    });
  });
  describe('as a Student', () => {
    beforeEach(() => {
      mockedItem.mockReturnValue({ ...item });
    });

    it('returns true that the user is an undergraduate student ', async () => {
      mockedUser.mockReturnValue({
        ...user.data,
        classification: { attributes: { ...classificationAttributes, levelCode: '01' } },
        audienceOverride: {},
      });
      mockedItem.mockReturnValue({ ...item, audiences: ['Undergraduate Student'] });
      expect(hasAudience(mockedUser(), mockedItem())).toBeTruthy();
    });
    it('returns true that the user is a graduate student ', async () => {
      mockedItem.mockReturnValue({ ...item, audiences: ['Graduate Student'] });
      expect(hasAudience(mockedUser(), mockedItem())).toBeTruthy();
    });
    it('returns false that the user is not a graduate student ', async () => {
      mockedUser.mockReturnValue({
        ...user.data,
        audienceOverride: {},
        classification: { attributes: { ...classificationAttributes, level: '', levelCode: '' } },
      });
      mockedItem.mockReturnValue({ ...item, audiences: ['Graduate Student'] });
      expect(hasAudience(mockedUser(), mockedItem())).toBeFalsy();
    });
    it('returns true that the user is a first year student ', async () => {
      mockedItem.mockReturnValue({ ...item, audiences: ['First Year'] });
      expect(hasAudience(mockedUser(), mockedItem())).toBeTruthy();
    });
    it('returns false that the user is not a first year student ', async () => {
      mockedUser.mockReturnValue({
        ...user.data,
        audienceOverride: {},
        classification: { attributes: { ...classificationAttributes, classification: 'not-first-year' } },
      });
      mockedItem.mockReturnValue({ ...item, audiences: ['First Year'] });
      expect(hasAudience(mockedUser(), mockedItem())).toBeFalsy();
    });
    it('returns true that the user is an international student ', async () => {
      mockedItem.mockReturnValue({ ...item, audiences: ['International Student'] });
      expect(hasAudience(mockedUser(), mockedItem())).toBeTruthy();
    });
    it('returns false that the user is not an international student ', async () => {
      mockedUser.mockReturnValue({
        ...user.data,
        audienceOverride: {},
        classification: { attributes: { ...classificationAttributes, isInternational: false } },
      });
      mockedItem.mockReturnValue({ ...item, audiences: ['International Student'] });
      expect(hasAudience(mockedUser(), mockedItem())).toBeFalsy();
    });
    it('logs an error when an unrecognized campus exists on the users details', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      mockedUser.mockReturnValue({
        ...user.data,
        audienceOverride: { campusCode: 'BOBROSS' },
        classification: { attributes: { ...classificationAttributes, campusCode: 'BOBROSS' } },
      });
      hasAudience(mockedUser(), mockedItem());
      expect(console.error).toHaveBeenCalledTimes(1);
    });
    it('returns true by default when there are no audiences to check for', async () => {
      expect(hasAudience(mockedUser(), mockedItem())).toBeTruthy();
    });
    it('returns true by default when the user has no audience related data', async () => {
      mockedUser.mockReturnValue({
        ...user.data,
        audienceOverride: {},
        classification: { attributes: undefined },
      });
      expect(hasAudience(mockedUser(), mockedItem())).toBeTruthy();
    });
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
  it('has another type of corvallis users campus', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      audienceOverride: { campusCode: 'J' },
      classification: { attributes: { ...classificationAttributes, campusCode: 'J' } },
    });
    expect(usersCampus(mockedUser())).toEqual({ campusCode: 'J', campusName: 'corvallis' });
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
