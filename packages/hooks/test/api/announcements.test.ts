import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useAnnouncements, mockAnnouncements, useAnnouncementsState } from '../../src/api/announcements';
import { wrapper } from '../test-utils';

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe('useAnnouncements', () => {
  it('gets financial announcements on successful returns', async () => {
    mock
      .onGet('/api/announcements/financial_announcements')
      .replyOnce(200, mockAnnouncements.financialAnnouncementResult.data);
    const { result, waitForNextUpdate } = renderHook(() => useAnnouncements('financial_announcements'), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.error).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.data).toEqual(mockAnnouncements.financialAnnouncementResult.data);
  });
  it('handles financial announcements api error', async () => {
    mock.onGet('/api/announcements/financial_announcements').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => useAnnouncements('financial_announcements'), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(1);
  });
  it('gets academic announcements on successful returns', async () => {
    mock
      .onGet('/api/announcements/academic_announcements')
      .replyOnce(200, mockAnnouncements.academicAnnouncementResult.data);
    const { result, waitForNextUpdate } = renderHook(() => useAnnouncements('academic_announcements'), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.error).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.data).toEqual(mockAnnouncements.academicAnnouncementResult.data);
  });
  it('handles academic announcements api error', async () => {
    mock.onGet('/api/announcements/academic_announcements').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => useAnnouncements('academic_announcements'), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(1);
  });
});

describe('useAnnouncementsState', () => {
  it('performs the call', async () => {
    mock
      .onGet('/api/announcements/financial_announcements')
      .replyOnce(200, mockAnnouncements.financialAnnouncementResult.data);
    const { result, waitForNextUpdate } = renderHook(() => useAnnouncementsState('financial_announcements'), {
      wrapper,
    });
    expect(result.current.announcements.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.announcements.isLoading).toBeFalsy();
    expect(result.current.announcements.data).toEqual(mockAnnouncements.financialAnnouncementResult.data);
  });

  it('handles an error', async () => {
    mock.onGet('/api/announcements/academic_announcements').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => useAnnouncementsState('financial_announcements'), {
      wrapper,
    });
    expect(result.current.announcements.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.announcements.data).toEqual([]);
    expect(result.current.announcements.isLoading).toBeTruthy();
    expect(result.current.announcements.isSuccess).toBeFalsy();
  });
});
