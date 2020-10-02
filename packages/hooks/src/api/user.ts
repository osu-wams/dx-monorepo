import axios from 'axios';
import { useQuery, queryCache, QueryObserverConfig, QueryResult } from 'react-query';
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
export const useUser = (opts: QueryObserverConfig<any, Error> = REACT_QUERY_DEFAULT_CONFIG): Types.UserState => {
  const [user, setUser] = useState<Types.UserState>({
    data: INITIAL_USER,
    error: false,
    loading: true,
    isCanvasOptIn: false,
  });

  const u = useQuery('user', getUser, {
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
    if (u.isSuccess) {
      setUser(previousUser => {
        const primaryAffiliationOverride =
          previousUser.data.primaryAffiliationOverride || u.data.primaryAffiliationOverride;
        return {
          ...previousUser,
          data: {
            ...u.data,
            primaryAffiliationOverride,
            classification: previousUser.data.classification,
            favoriteResources: previousUser.data.favoriteResources,
          },
          error: false,
          loading: false,
          isCanvasOptIn: previousUser.data.isCanvasOptIn,
        };
      });
    } else if (u.isError) {
      setUser((p: Types.UserState) => ({ ...p, error: true, loading: false }));
    }
  }, [u.data, u.isError, u.isSuccess]);

  useEffect(() => {
    if (classification.isSuccess && favorites.isSuccess) {
      setUser(previousUser => {
        return {
          ...previousUser,
          data: {
            ...previousUser.data,
            classification: { ...classification.data },
            favoriteResources: [...favorites.data],
          },
          error: false,
          loading: false,
          isCanvasOptIn: previousUser.data.isCanvasOptIn,
        };
      });
    } else if (classification.isError) {
      queryCache.invalidateQueries('classification');
    } else if (favorites.isError) {
      queryCache.invalidateQueries('favorites');
    }
  }, [
    classification.data,
    favorites.data,
    classification.isSuccess,
    favorites.isSuccess,
    classification.isError,
    favorites.isError,
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

export const useMessages = (
  opts: QueryObserverConfig<Types.UserMessageItems, Error> = REACT_QUERY_DEFAULT_CONFIG,
): QueryResult<Types.UserMessageItems, Error> => useQuery('userMessages', getUserMessages, opts);

export const updateUserMessage = (update: Types.UserMessageUpdate): Promise<Types.UserMessage> =>
  axios
    .post('/api/user/messages', update)
    .then(res => res.data)
    .catch(e => {
      console.error(e);
      throw e;
    });
