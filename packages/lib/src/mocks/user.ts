import { UserAudienceOverride, UserClassification, UserState, FavoriteResource } from '../types';

const settings = {
  data: {
    audienceOverride: {
      campusCode: 'C',
    },
  },
};

const userAudienceOverride: UserAudienceOverride = {
  campusCode: 'C',
  graduate: true,
  international: true,
  firstYear: true,
};

const userClassification: UserClassification = {
  id: '123',
  attributes: {
    levelCode: '02',
    level: 'Graduate',
    campus: '',
    campusCode: 'C',
    classification: 'Freshman',
    isInternational: true,
  },
};

const userFavoriteResources: FavoriteResource[] = [
  {
    active: false,
    order: 0,
    created: '2020-03-05T23:17:50.423Z',
    osuId: 123,
    resourceId: '1',
  },
  {
    active: true,
    order: 0,
    created: '2020-03-05T23:17:50.423Z',
    osuId: 123,
    resourceId: '2',
  },
  {
    active: true,
    order: 0,
    created: '2020-03-05T23:17:50.423Z',
    osuId: 123,
    resourceId: '3',
  },
];

const user: UserState = {
  data: {
    osuId: '123',
    email: 'testo@oregonstate.edu',
    firstName: 'Testo',
    lastName: 'LastTesto',
    isAdmin: true,
    groups: ['admin', 'masquerade'],
    isCanvasOptIn: true,
    theme: 'light',
    primaryAffiliation: 'student',
    classification: userClassification,
    audienceOverride: userAudienceOverride,
    favoriteResources: userFavoriteResources,
  },
  loading: false,
  error: false,
  isCanvasOptIn: true,
  setUser: () => {},
  refreshFavorites: () => {},
};

export default { user, userAudienceOverride, userFavoriteResources, userClassification, settings };
