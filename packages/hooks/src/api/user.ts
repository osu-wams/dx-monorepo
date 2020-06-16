import axios from 'axios';
import useAPICall from '../useAPICall';
import { useEffect, useState } from 'react';
import { User, Types } from '@osu-wams/lib';
import { getFavorites } from '../api/resources';
import { getClassification } from '../api/classification';

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
export const useUser = () => {
  const [user, setUser] = useState<Types.UserState>({
    data: INITIAL_USER,
    error: false,
    loading: true,
    isCanvasOptIn: false,
  });
  const u = useAPICall<Types.User>({
    api: getUser,
    dataTransform: (data: Types.User) => data,
    initialState: INITIAL_USER,
    useCache: false,
    errorCallback: (e: { response?: { status: number } }) => {
      if (e.response?.status === 401) {
        window.location.assign(`/login?return=${window.location.pathname}`);
      }
    },
  });
  const classification = useAPICall<Types.UserClassification>({
    api: getClassification,
    dataTransform: (data: Types.UserClassification) => data,
    initialState: {},
    useCache: true,
  });

  const favorites = useAPICall<Types.FavoriteResource[]>({
    api: getFavorites,
    dataTransform: (d: Types.FavoriteResource[]): Types.FavoriteResource[] => d,
    initialState: [],
  });

  // Gets the latest favorites and sets the new state
  const refreshFavorites = async () => {
    const favoriteResources = await getFavorites();
    setUser((p: Types.UserState) => ({ ...p, data: { ...p.data, favoriteResources } }));
  };

  useEffect(() => {
    setUser({
      data: { ...u.data, classification: { ...classification.data }, favoriteResources: [...favorites.data] },
      error: u.error,
      loading: u.loading,
      isCanvasOptIn: u.data.isCanvasOptIn,
    });
  }, [u.data, u.error, u.loading, classification.data, classification.loading, favorites.data, favorites.loading]);

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
