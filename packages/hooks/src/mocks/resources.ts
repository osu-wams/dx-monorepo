import { Types } from '@osu-wams/lib';

// Reusable array for both Resources and ResourcesCard
const resourcesArray: Types.Resource[] = [
  {
    id: '1',
    title: 'Bend Testo Success Center',
    link: 'https://success.oregonstate.edu/',
    iconName: 'fal.check',
    audiences: [],
    locations: ['Bend'],
    affiliation: ['student', 'employee'],
    categories: ['Featured'],
    synonyms: ['help', 'tutoring', 'writing', 'math'],
    type: 'resource',
    excludeTrending: true,
  },
  {
    id: '2',
    title: 'Academics for Student Athletes',
    link: 'https://studentathlete.oregonstate.edu/',
    iconName: 'fal.check',
    audiences: [],
    affiliation: ['student', 'employee'],
    categories: ['Academic'],
    locations: ['Corvallis', 'Bend'],
    synonyms: [],
    type: 'resource',
    excludeTrending: false,
  },
  {
    id: '3',
    title: 'Billing Information',
    link: 'https://oregonstate.edu/bill',
    iconName: 'fal.check',
    audiences: [],
    affiliation: ['student', 'employee'],
    locations: ['Corvallis', 'Bend'],
    categories: ['Featured', 'Financial'],
    synonyms: ['boo'],
    type: 'resource',
    excludeTrending: false,
  },
  {
    id: '4',
    title: 'Student Jobs',
    link: 'https://testo.com',
    iconName: 'fal.check',
    audiences: [],
    locations: ['Corvallis'],
    categories: ['Financial'],
    affiliation: ['student'],
    synonyms: ['boo'],
    type: 'resource',
    excludeTrending: false,
  },
  {
    id: '5',
    title: 'Listservs',
    link: 'https://oregonstate.edu/bill',
    iconName: 'fal.check',
    audiences: [],
    locations: ['Corvallis'],
    affiliation: ['employee'],
    categories: ['Financial'],
    synonyms: [],
    type: 'resource',
    excludeTrending: false,
  },
  {
    id: '6',
    title: 'Employee Only',
    link: 'https://oregonstate.edu/bill',
    iconName: 'fal.check',
    locations: ['Corvallis'],
    audiences: [],
    affiliation: ['employee'],
    categories: ['Featured'],
    synonyms: [],
    type: 'resource',
    excludeTrending: false,
  },
];

const resourcesData: { data: Types.Resource[]; loading: boolean; error: boolean } = {
  data: resourcesArray,
  loading: false,
  error: false,
};

const resourcesCardData: { data: Types.ResourceEntityQueue; loading: boolean; error: boolean } = {
  data: {
    entityQueueTitle: 'Featured',
    items: resourcesArray,
  },
  loading: false,
  error: false,
};

const resourcesDataByCategory: { data: Types.Resource[]; loading: boolean; error: boolean } = {
  data: [
    {
      audiences: [],
      categories: ['Financial'],
      locations: ['Bend', 'Corvallis', 'Ecampus'],
      synonyms: ['payroll', 'payment'],
      affiliation: ['student', 'employee'],
      id: '825d22a1-938c-4ca7-8b9d-625a639bcdde',
      title: 'Billing Information',
      iconName: 'fal.money-check-edit-alt',
      link: 'http://fa.oregonstate.edu/business-affairs/studentbilling',
      type: 'resource',
      excludeTrending: false,
    },
  ],
  loading: false,
  error: false,
};

const categoriesData: { data: Types.Category[]; loading: boolean; error: boolean } = {
  data: [
    {
      affiliation: ['Employee', 'Student'],
      id: '6b7cd598-d71e-45f7-911c-d71551ec0a7c',
      name: 'Featured',
      icon: 'http://dev-api-dx.pantheonsite.io/sites/default/files/2019-05/star.svg',
    },
    {
      affiliation: ['Student'],
      id: '2cd0a3c4-a7f1-4080-bf2e-e458559de2a3',
      name: 'Academic',
      icon: 'http://dev-api-dx.pantheonsite.io/sites/default/files/2019-05/graduation-cap.svg',
    },
    {
      affiliation: ['Employee', 'Student'],
      id: 'e2730988-0614-43b7-b3ce-0b047e8219e0',
      name: 'Financial',
      icon: 'http://dev-api-dx.pantheonsite.io/sites/default/files/2019-05/hands-usd.svg',
    },
  ],
  loading: false,
  error: false,
};

const defaultCategory: string = 'Featured';

const trendingResourcesData: { data: Types.TrendingResource[]; loading: boolean; error: boolean } = {
  data: [
    {
      resourceId: '6',
      date: '2020-03-16',
      affiliation: 'Employee',
      campus: 'Corvallis',
      title: 'Employee Only',
      totalEvents: 15,
      uniqueEvents: 6,
      period: '14daysAgo',
    },
    {
      resourceId: '4',
      date: '2020-03-16',
      affiliation: 'Student',
      campus: 'Corvallis',
      title: 'Student Jobs',
      totalEvents: 5,
      uniqueEvents: 5,
      period: '14daysAgo',
    },
  ],
  loading: false,
  error: false,
};

export default {
  resourcesData,
  resourcesDataByCategory,
  categoriesData,
  defaultCategory,
  resourcesCardData,
  trendingResourcesData,
};
