import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useAnnouncements, mockAnnouncements, hasAffiliation, Announcement } from '../../src/api/announcements';

const mock = new MockAdapter(axios);

describe('useAnnouncements', () => {
  it('gets financial announcements on successful returns', async () => {
    mock
      .onGet('/api/announcements/financial_announcements')
      .reply(200, mockAnnouncements.financialAnnouncementResult.data);
    const { result, waitForNextUpdate } = renderHook(() => useAnnouncements('financial_announcements'));
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockAnnouncements.financialAnnouncementResult.data);
  });
  it('handles financial announcements api error', async () => {
    mock.onGet('/api/announcements/financial_announcements').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useAnnouncements('financial_announcements'));
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
  it('gets academic announcements on successful returns', async () => {
    mock
      .onGet('/api/announcements/academic_announcements')
      .reply(200, mockAnnouncements.academicAnnouncementResult.data);
    const { result, waitForNextUpdate } = renderHook(() => useAnnouncements('academic_announcements'));
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockAnnouncements.academicAnnouncementResult.data);
  });
  it('handles academic announcements api error', async () => {
    mock.onGet('/api/announcements/academic_announcements').reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useAnnouncements('academic_announcements'));
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
});

describe('hasAffiliation', () => {
  it('returns true if the announcement has no affiliations', async () => {
    const announcement: Announcement = mockAnnouncements.academicAnnouncementResult.data[0];
    announcement.affiliation = [];
    expect(hasAffiliation('bob-ross', announcement)).toBeTruthy();
  });
  it('returns true if the announcement has zero affiliations', async () => {
    const announcement: Announcement = mockAnnouncements.academicAnnouncementResult.data[0];
    expect(hasAffiliation('bob-ross', announcement)).toBeTruthy();
  });
  it('returns true if the announcement has the affiliation', async () => {
    const announcement: Announcement = mockAnnouncements.academicAnnouncementResult.data[0];
    announcement.affiliation = ['bob-ross'];
    expect(hasAffiliation('bob-ross', announcement)).toBeTruthy();
  });
  it('returns false if the announcement does not have the affiliation', async () => {
    const announcement: Announcement = mockAnnouncements.academicAnnouncementResult.data[0];
    expect(hasAffiliation('nope-nope', announcement)).toBeFalsy();
  });
});
