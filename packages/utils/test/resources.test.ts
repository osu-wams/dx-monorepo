import { Types } from '@osu-wams/lib';
import { checkAffiliation, filterByCategory } from '../src/resources';

// @ts-ignore tests require only an array of partial resources
const mockResource: Types.Resource = { id: 'test-1', categories: ['Category1'] };
// @ts-ignore tests require only an array of partial resources
const mockFavoriteResource: Types.FavoriteResource = { resourceId: 'test-1', active: true };
// @ts-ignore tests require only partial user object
const mockEmployee: Types.User = { primaryAffiliation: 'employee' };
// @ts-ignore tests require only partial user object
const mockStudent: Types.User = { primaryAffiliation: 'student' };
// @ts-ignore tests require only partial user object
const mockEmployeeOverride: Types.User = { primaryAffiliationOverride: 'employee' };
// @ts-ignore tests require only partial user object
const mockStudentOverride: Types.User = { primaryAffiliationOverride: 'student' };

const mockResources: Types.Resource[] = [mockResource, { ...mockResource, id: 'test-2', categories: ['Category2'] }];
const mockFavoriteResources: Types.FavoriteResource[] = [mockFavoriteResource];

describe('checkAffiliation', () => {
  it('true if the object contains a matching affiliation', () => {
    expect(checkAffiliation(mockStudent, { affiliation: ['student'] })).toBeTruthy();
    expect(checkAffiliation(mockEmployee, { affiliation: ['employee'] })).toBeTruthy();
    expect(checkAffiliation(mockEmployee, { affiliation: ['student', 'employee'] })).toBeTruthy();
    expect(checkAffiliation(mockStudentOverride, { affiliation: ['student'] })).toBeTruthy();
    expect(checkAffiliation(mockEmployeeOverride, { affiliation: ['employee'] })).toBeTruthy();
    expect(checkAffiliation(mockEmployeeOverride, { affiliation: ['student', 'employee'] })).toBeTruthy();
  });
  it('true if the object does not explicitly set an affiliation', () => {
    expect(checkAffiliation(mockEmployee, { affiliation: [] })).toBeTruthy();
  });
  it('false if the object does not contain a matching affiliation', () => {
    expect(checkAffiliation(mockStudent, { affiliation: ['employee'] })).toBeFalsy();
    expect(checkAffiliation(mockEmployee, { affiliation: ['student'] })).toBeFalsy();
    expect(checkAffiliation(mockStudentOverride, { affiliation: ['employee'] })).toBeFalsy();
    expect(checkAffiliation(mockEmployeeOverride, { affiliation: ['student'] })).toBeFalsy();
  });
  it('defaults to checking employee affiliation', () => {
    // @ts-ignore tests when neither primaryAffiliation nor primaryAffiliationOverride are set
    expect(checkAffiliation({}, { affiliation: ['employee'] })).toBeTruthy();
  });
});

describe('filterByCategory', () => {
  it('returns all resources if the filter name is all', () => {
    expect(filterByCategory(mockEmployee, 'all', mockResources)).toHaveLength(2);
  });
  it('returns users favorites filter and favorites are set', () => {
    expect(
      filterByCategory({ ...mockEmployee, favoriteResources: mockFavoriteResources }, 'favorites', mockResources),
    ).toHaveLength(1);
  });
  it('returns resources filtered by category name', () => {
    expect(filterByCategory(mockEmployee, 'Category2', mockResources)).toHaveLength(1);
  });
  it('returns no resources which have no categories explicitly set', () => {
    expect(filterByCategory(mockEmployee, 'SomeCategory', [{ ...mockResource, categories: [] }])).toHaveLength(0);
  });
});
