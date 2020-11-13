import { SUBCLASSIFICATION, LEVEL_CODE, AFFILIATIONS, GROUPS, CAMPUS_CODES } from './../user/constants';
import {
  UserAudienceOverride,
  UserClassification,
  UserState,
  UserMessage,
  UserMessageItems,
  FavoriteResource,
} from '../types';

const settings = {
  data: {
    audienceOverride: {
      campusCode: CAMPUS_CODES.corvallis[0],
    },
  },
};

const userAudienceOverride: UserAudienceOverride = {
  campusCode: CAMPUS_CODES.corvallis[0],
  graduate: true,
  international: true,
  firstYear: true,
};

const userClassification: UserClassification = {
  id: '123',
  attributes: {
    levelCode: LEVEL_CODE.undergraduate,
    campusCode: CAMPUS_CODES.corvallis[0],
    classification: SUBCLASSIFICATION.freshman,
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

const userMessage: UserMessage = {
  channelId: 'dashboard',
  content: 'content',
  contentShort: 'contentShort',
  deliveredAt: '2020-01-01T16:20:00.000Z',
  id: 'bobross',
  imageUrl: 'https://blah.png',
  messageId: 'message-id-01',
  osuId: '111111111',
  onid: 'bobross',
  sendAt: '2020-01-01T16:20:00.000Z',
  status: 'SENT',
  title: 'Title',
};

const userMessageItems: UserMessageItems = {
  items: [userMessage],
  lastKey: undefined,
};

const userReadMessage: UserMessageItems = {
  items: [
    {
      ...userMessage,
      status: 'READ',
    },
  ],
  lastKey: undefined,
};

const userThreeMessages: UserMessageItems = {
  items: [
    userMessage,
    {
      id: 'bobross2',
      channelId: 'dashboard',
      content: 'second message body content',
      contentShort: '2contentShort',
      deliveredAt: '2020-01-01T16:20:00.000Z',
      imageUrl: 'https://blah.png',
      messageId: 'message-id-02',
      osuId: '111111111',
      sendAt: '2020-01-01T16:20:00.000Z',
      status: 'READ',
      title: 'Second Message Title',
    },
    {
      id: 'bobross3',
      channelId: 'dashboard',
      content: 'third message content',
      contentShort: '3contentShort',
      deliveredAt: '2020-01-01T16:20:00.000Z',
      imageUrl: 'https://blah.png',
      messageId: 'message-id-03',
      osuId: '111111111',
      sendAt: '2020-01-01T16:20:00.000Z',
      status: 'SENT',
      title: 'Third Message Title',
    },
  ],
  lastKey: undefined,
};

const user: UserState = {
  data: {
    osuId: '123',
    email: 'testo@oregonstate.edu',
    firstName: 'Testo',
    lastName: 'LastTesto',
    isAdmin: false,
    groups: [],
    affiliations: [AFFILIATIONS.student],
    isCanvasOptIn: true,
    theme: 'light',
    primaryAffiliation: AFFILIATIONS.student,
    primaryAffiliationOverride: undefined,
    classification: userClassification,
    audienceOverride: {},
    favoriteResources: userFavoriteResources,
    isMobile: false,
  },
  loading: false,
  error: false,
  isCanvasOptIn: true,
  setUser: () => {},
  refreshFavorites: () => {},
};

// Employee: No classification, no canvas
const userEmployee: UserState = {
  ...user,
  isCanvasOptIn: false,
  data: {
    ...user.data,
    primaryAffiliation: AFFILIATIONS.employee,
    affiliations: [AFFILIATIONS.employee],
    classification: {},
  },
};

// Student Employee. Regular undergrad with the additional employee affiliation
const userStudentEmployee: UserState = {
  ...user,
  data: {
    ...user.data,
    affiliations: [AFFILIATIONS.student, AFFILIATIONS.employee],
  },
};

// Administrator: Employee with admin and masquerade groups
const userAdmin: UserState = {
  ...userEmployee,
  data: {
    ...userEmployee.data,
    isAdmin: true,
    groups: [GROUPS.admin, GROUPS.masquerade],
  },
};

// Undergrad: Our most common user is an undergraduate attending Corvallis
const userUndergrad: UserState = {
  ...user,
};

// Graduate student
const userGraduate: UserState = {
  ...user,
  data: {
    ...user.data,
    classification: {
      ...user.data.classification,
      attributes: {
        campusCode: CAMPUS_CODES.corvallis[0],
        isInternational: true,
        levelCode: LEVEL_CODE.graduate,
        classification: SUBCLASSIFICATION.determine,
      },
    },
  },
};

export default {
  user,
  userEmployee,
  userAdmin,
  userUndergrad,
  userGraduate,
  userStudentEmployee,
  userAudienceOverride,
  userFavoriteResources,
  userClassification,
  settings,
  userMessage,
  userMessageItems,
  userReadMessage,
  userThreeMessages,
};
