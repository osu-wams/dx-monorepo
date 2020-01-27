import axios from 'axios';
import useAPICall from '../useAPICall';
import * as Classification from './classification';
import { useEffect, useState } from 'react';
import { User, Types } from '@osu-wams/lib';

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
  });
  const classification = useAPICall<Types.UserClassification>({
    api: Classification.getClassification,
    dataTransform: (data: Types.UserClassification) => data,
    initialState: {},
    useCache: true,
  });

  useEffect(() => {
    setUser({
      data: { ...u.data, classification: { ...classification.data } },
      error: u.error,
      loading: u.loading,
      isCanvasOptIn: u.data.isCanvasOptIn,
    });
  }, [u.data, u.error, u.loading, classification.data, classification.loading]);

  return {
    error: user.error,
    data: user.data,
    loading: user.loading,
    isCanvasOptIn: user.data?.isCanvasOptIn ?? false,
    setUser,
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
