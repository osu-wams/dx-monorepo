import { UserAudienceOverride, UserClassification, UserState } from '../types';

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
  },
  loading: false,
  error: false,
  isCanvasOptIn: true,
  setUser: () => {},
};

export default { user, userAudienceOverride, userClassification, settings };
