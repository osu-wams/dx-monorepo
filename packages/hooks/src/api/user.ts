import axios from 'axios';
import { useQuery, queryCache, BaseQueryOptions } from 'react-query';
import useAPICall from '../useAPICall';
import { useEffect, useState } from 'react';
import { User, Types } from '@osu-wams/lib';
import { getFavorites } from '../api/resources';
import { getClassification } from '../api/classification';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';

export const mockUser = User.mockUser;
export const DEFAULT_THEME = User.DEFAULT_THEME;
export const DEFAULT_CAMPUS = User.DEFAULT_CAMPUS;
export const CLASSIFICATIONS = User.CLASSIFICATIONS;
export const CLASSIFICATION_AUDIENCES = User.CLASSIFICATION_AUDIENCES;
export const CAMPUS_CODES = User.CAMPUS_CODES;
export const AFFILIATIONS = User.AFFILIATIONS;
export const GROUPS = User.GROUPS;
export const INITIAL_USER = User.INITIAL_USER;
export const isFirstYear = User.isFirstYear;
export const isInternational = User.isInternational;
export const isGraduate = User.isGraduate;
export const isUndergraduate = User.isUndergraduate;
export const hasPrimaryAffiliation = User.hasPrimaryAffiliation;
export const getAffiliation = User.getAffiliation;
export const usersSettings = User.usersSettings;
export const settingIsDefault = User.settingIsDefault;
export const settingIsOverridden = User.settingIsOverridden;
export const usersCampus = User.usersCampus;
export const hasAudience = User.hasAudience;
export const atCampus = User.atCampus;

export const getUser = (): Promise<Types.User> => axios.get('/api/user').then(res => res.data);

/**
 * The primary hook to fetch the user session and set the user for access throughout the application, this
 * is intended to be set near the root level of the application and exposed by way of the UserContext.
 */
export const useUser = (opts: BaseQueryOptions = REACT_QUERY_DEFAULT_CONFIG): Types.UserState => {
  const [user, setUser] = useState<Types.UserState>({
    data: INITIAL_USER,
    error: false,
    loading: true,
    isCanvasOptIn: false,
  });

  const u = useQuery<Types.User, string, Error>('user', getUser, {
    ...opts,
    retry: false,
    onError: (err: any) => {
      if (err.response?.status === 401) {
        window.location.assign(`/login?return=${window.location.pathname}`);
      }
    },
  });
  const classification = useQuery('classification', getClassification, {
    ...opts,
    enabled: u.isSuccess,
    initialData: {},
    initialStale: true,
  });
  const favorites = useQuery('favorites', getFavorites, {
    ...opts,
    enabled: u.isSuccess && classification.isSuccess,
    initialData: [],
    initialStale: true,
  });

  // Gets the latest favorites and sets the new state
  const refreshFavorites = async () => queryCache.invalidateQueries('favorites');

  useEffect(() => {
    if (u.isSuccess && classification.isSuccess && favorites.isSuccess) {
      setUser({
        data: { ...u.data, classification: { ...classification.data }, favoriteResources: [...favorites.data] },
        error: false,
        loading: false,
        isCanvasOptIn: u.data.isCanvasOptIn,
      });
    } else if (u.isError) {
      queryCache.invalidateQueries('favorites');
      queryCache.invalidateQueries('classification');
      setUser((p: Types.UserState) => ({ ...p, error: true, loading: false }));
    }
  }, [
    u.data,
    classification.data,
    favorites.data,
    u.isSuccess,
    classification.isSuccess,
    favorites.isSuccess,
    u.isError,
  ]);

  return {
    error: user.error,
    data: user.data,
    loading: user.loading,
    isCanvasOptIn: user.data?.isCanvasOptIn ?? false,
    setUser,
    refreshFavorites,
  };
};

/**
 * Send the settings to the backend to be saved.
 * @param settings the settings to persist to the backend
 */
export const postSettings = (settings: Types.UserSettings): Promise<Types.UserSettings> =>
  axios
    .post('/api/user/settings', settings)
    .then(res => res.data)
    .catch(e => {
      console.error(e);
      throw e;
    });

export const getUserMessages = (): Promise<Types.UserMessageItems> =>
  axios.get('/api/user/messages').then(res => res.data);

export const useMessages = () =>
  useAPICall<Types.UserMessageItems>({
    api: getUserMessages,
    dataTransform: (data: any) => data,
    initialState: { items: [] },
  });

export const updateUserMessage = (update: Types.UserMessageUpdate): Promise<Types.UserMessage> =>
  axios
    .post('/api/user/messages', update)
    .then(res => res.data)
    .catch(e => {
      console.error(e);
      throw e;
    });
