import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import {
  postSettings,
  useUser,
  mockUser,
  INITIAL_USER,
  atCampus,
  hasAudience,
  User,
  settingIsOverridden,
  settingIsDefault,
  getAffiliation,
  hasPrimaryAffiliation,
} from '../../src/api/user';

const { userClassification, user, settings } = mockUser;
const mockedUser = jest.fn<User, any>(() => user.data);
const classificationAttributes = user.data.classification.attributes ?? {
  level: '',
  campus: '',
  campusCode: '',
  classification: '',
  isInternational: false,
};
const mock = new MockAdapter(axios);

beforeEach(() => {
  mockedUser.mockReturnValue(user.data);
});

describe('useUser', () => {
  it('gets user on successful returns', async () => {
    mock.onGet('/api/user/classification').reply(200, userClassification);
    mock.onGet('/api/user').reply(200, user.data);
    const { result, waitForNextUpdate } = renderHook(() => useUser());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(user.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/user/classification').reply(500);
    mock.onGet('/api/user').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useUser());
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual(INITIAL_USER);
  });
});

describe('postSettings', () => {
  it('returns an updated settings', async () => {
    mock.onPost('/api/user/settings').reply(200, settings.data);
    const result = await postSettings({ audienceOverride: { campusCode: 'C' } });
    expect(result).toEqual(settings.data);
  });
  it('returns an error', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mock.onPost('/api/user/settings').reply(500);
    await expect(postSettings({ audienceOverride: { campusCode: 'C' } })).rejects.toThrow();
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});

describe('atCampus', () => {
  it('returns true that the user is at that campus', async () => {
    const result = atCampus(mockedUser(), user.data.classification.attributes?.campusCode ?? 'C');
    expect(result).toBeTruthy();
  });
  it('returns false that the user is not another campus', async () => {
    const result = atCampus(mockedUser(), 'BOGUS_CAMPUS_CODE');
    expect(result).toBeFalsy();
  });
});

describe('hasAudience', () => {
  it('returns true that the user is a graduate student ', async () => {
    const result = hasAudience(mockedUser(), { audiences: ['Graduate Student'] });
    expect(result).toBeTruthy();
  });
  it('returns false that the user is not a graduate student ', async () => {
    mockedUser.mockReturnValue({
      ...user.data,
      audienceOverride: {},
      classification: { attributes: { ...classificationAttributes, level: 'not-grad' } },
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
