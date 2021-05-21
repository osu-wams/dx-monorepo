import axios from 'axios';
import { useQuery, UseQueryOptions, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';
import { User, Types } from '@osu-wams/lib';
import { useFavorites } from '../api/resources';
import { useClassification } from '../api/classification';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import { useApplicationMessagesState } from './applicationMessages';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  dashboardState,
  isLoadedState,
  userState,
  initialRouteState,
  WARN_STUDENT_ACCESS_EMPLOYEE_DASHBOARD,
} from '../state';
import { Routes } from '@osu-wams/utils';

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

/**
 * The primary hook to fetch the user session and set the user for access throughout the application, this
 * is intended to be set near the root level of the application and exposed by way of the UserContext.
 */
export const useUser = (opts: UseQueryOptions<any, Error> = REACT_QUERY_DEFAULT_CONFIG): Types.UserState => {
  const queryClient = useQueryClient();

  const [user, setUser] = useState<Types.UserState>({
    data: INITIAL_USER,
    error: false,
    loading: true,
    isCanvasOptIn: false,
  });

  const u = useQuery('/api/user', {
    ...opts,
    retry: false,
    onError: (err: any) => {
      if (err.response?.status === 401) {
        window.location.assign(`/login?return=${window.location.pathname}`);
      }
    },
  });
  const classification = useClassification({ ...opts, enabled: u.isSuccess });
  const favorites = useFavorites({ ...opts, enabled: u.isSuccess && classification.isSuccess });

  // Gets the latest favorites and sets the new state
  const refreshFavorites = async () => queryClient.invalidateQueries('/api/resources/favorites');

  useEffect(() => {
    if (u.isSuccess) {
      setUser((previousUser: Types.UserState) => {
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
      setUser((previousUser: Types.UserState) => {
        return {
          ...previousUser,
          data: {
            ...previousUser.data,
            classification: { ...classification.data },
            favoriteResources: [...favorites.data],
          },
          isCanvasOptIn: previousUser.data.isCanvasOptIn,
        };
      });
    } else if (classification.isError) {
      queryClient.invalidateQueries('/api/user/classification');
    } else if (favorites.isError) {
      queryClient.invalidateQueries('/api/resources/favorites');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

/**
 * Change the primary affiliation override for a user, this effectively changes which dashboard they intend on viewing, how
 * application data might be filtered and this is persisted across sessions.
 * @param navigate a function responsible for causing the application perform navigation to another route/page
 */
export const changeAffiliation = (affiliationType: string, user: Types.UserState, navigate: Function) => {
  const settings = User.usersSettings(user.data);
  settings.primaryAffiliationOverride = affiliationType;

  postSettings({ primaryAffiliationOverride: settings.primaryAffiliationOverride }).then(_d => {
    // This hook needs to reach into the UserState and call the underlying setter on the user object rather than the
    // `setUser` on the recoil state itself.
    if (user.setUser) {
      user.setUser((prevUser: Types.UserState) => ({ ...prevUser, data: { ...prevUser.data, ...settings } }));
    }
    navigate();
  });
};

export const useMessages = (opts: UseQueryOptions<Types.UserMessageItems, Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/user/messages', opts);

export const updateUserMessage = (update: Types.UserMessageUpdate): Promise<Types.UserMessage> =>
  axios
    .post('/api/user/messages', update)
    .then(res => res.data)
    .catch(e => {
      console.error(e);
      throw e;
    });

/**
 * Fetch the logged in user and set them to shared state along with affiliation, messages and any other user specific data.
 * This hook intends to set the "Dashboard" context of the application based on what kind of user has logged in and if they
 * previously had a dashboard override set (ie. a Student/Employee set to view the Employee Dashboard at that point in time)
 * @param navigate a function responsible for causing the application perform navigation to another route/page
 */
export const useUserState = (navigate: Function) => {
  const userHook = useUser();
  const { addMessage } = useApplicationMessagesState();
  const [dashboard, setDashboard] = useRecoilState(dashboardState);
  const setIsLoaded = useSetRecoilState(isLoadedState);
  const [user, setUser] = useRecoilState(userState);
  const initialRoute = useRecoilValue(initialRouteState);

  /**
   * {replace: true} is added so history doesn't get stuck twice in dashboards
   */
  useEffect(() => {
    if (!user.loading) {
      const currentAffiliation = User.getAffiliation(user.data);
      const { affiliation, navigateTo } = dashboard;
      if (currentAffiliation !== affiliation) {
        changeAffiliation(affiliation, user, () => navigate(navigateTo, { replace: true }));
      } else if (navigateTo) {
        navigate(navigateTo, { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboard]);

  /**
   * User Bootstrap for User setup
   */
  useEffect(() => {
    if (!userHook.loading && userHook.data !== user.data) {
      setUser(userHook);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userHook.data, userHook.loading, userHook.error]);

  useEffect(() => {
    const { loading, error, data } = user;

    if (!loading && !error && data.osuId) {
      const userSetDashboard = User.getAffiliation(data).toLowerCase();
      const { pathname, search } = window.location;

      // Visiting root of the application which should be a dashboard overview (/student or /employee), redirect
      // user to the dashboard they were last one or what matches their primaryAffiliation, set application loaded to
      // make it visible
      if (pathname === '/') {
        navigate(`/${userSetDashboard}`, { replace: true }).then(() => setIsLoaded(true));
      } else {
        const onStudentDashboard = pathname.toLowerCase().startsWith(Routes.Routes().student.fullPath);
        const onEmployeeDashboard = pathname.toLowerCase().startsWith(Routes.Routes().employee.fullPath);
        // Visiting any route that doesn't start with /student or /employee just loads the application
        if (!onStudentDashboard && !onEmployeeDashboard) {
          if (initialRoute && initialRoute !== '/') {
            setDashboard({ affiliation: userSetDashboard, navigateTo: initialRoute });
          }
          setIsLoaded(true);
        } else {
          // User is a student (non-employee type) visiting an employee dashboard link, redirect them to the student dashboard
          if (!User.isEmployee(data) && onEmployeeDashboard) {
            addMessage(WARN_STUDENT_ACCESS_EMPLOYEE_DASHBOARD);
            navigate(Routes.Routes().student.fullPath, { replace: true }).then(() => setIsLoaded(true));
          } else {
            // changeAffiliation to match the dashboard they are attempting to visit, which will cause the effect to re-run
            // and finally be handled the by the last else-statement to setIsLoaded(true)
            if (userSetDashboard !== 'student' && onStudentDashboard) {
              setDashboard({ affiliation: 'student', navigateTo: `${pathname}${search}` });
            } else if (userSetDashboard !== 'employee' && onEmployeeDashboard) {
              setDashboard({ affiliation: 'employee', navigateTo: `${pathname}${search}` });
            } else {
              // The user is visiting the dashboard matching thier setting, the application is ready for rendering
              if (initialRoute && initialRoute !== '/') {
                navigate(initialRoute, { replace: true }).then(() => setIsLoaded(true));
              } else {
                setIsLoaded(true);
              }
            }
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.data, user.loading, user.error, initialRoute]);

  return { user };
};
