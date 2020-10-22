import { Types, User } from '@osu-wams/lib';
const { AFFILIATIONS, CLASSIFICATION_AUDIENCES } = User;

const cardsArray: Types.DynamicCard[] = [
  {
    affiliation: [AFFILIATIONS.employee, AFFILIATIONS.student],
    audiences: [],
    id: '1',
    infoButtonId: 'some_info_button',
    locations: ['Bend', 'Corvallis', 'Ecampus'],
    pages: ['Dashboard'],
    sticky: true,
    title: 'Everyone!',
    weight: -50,
    body: '<b>Some Bold HTML</b>',
    icon: 'fad fa-starship',
    link: 'http://oregonstate.edu',
    linkText: 'Oregon State University',
    resources: ['resource-id-1', 'resource-id-2'],
  },
  {
    affiliation: [AFFILIATIONS.student],
    audiences: [CLASSIFICATION_AUDIENCES.graduate],
    id: '2',
    infoButtonId: 'some_info_button',
    locations: ['Bend', 'Corvallis', 'Ecampus'],
    pages: ['Dashboard'],
    sticky: true,
    title: 'Graduates Card!',
    weight: 50,
    body: 'This card is for graduates only',
    icon: 'fad fa-starship',
    link: 'http://oregonstate.edu',
    linkText: 'Oregon State University',
    resources: ['resource-id-1', 'resource-id-2'],
  },
  {
    affiliation: [AFFILIATIONS.student],
    audiences: [],
    id: '3',
    infoButtonId: 'some_info_button',
    locations: ['Bend'],
    pages: ['Dashboard'],
    sticky: true,
    title: 'Bend Students!',
    weight: 50,
    body: 'This card is for bend students only',
    icon: 'fad fa-starship',
    link: 'http://oregonstate.edu',
    linkText: 'Oregon State University',
    resources: ['resource-id-1', 'resource-id-2'],
  },
  {
    affiliation: [AFFILIATIONS.student],
    audiences: [],
    id: '4',
    infoButtonId: 'some_info_button',
    locations: ['Bend', 'Corvallis', 'Ecampus'],
    pages: ['Dashboard'],
    sticky: true,
    title: 'All Students!',
    weight: 50,
    body: 'This card is for all students',
    icon: 'fad fa-starship',
    link: 'http://oregonstate.edu',
    linkText: 'Oregon State University',
    resources: ['resource-id-1', 'resource-id-2'],
  },
  {
    affiliation: [AFFILIATIONS.employee],
    audiences: [],
    id: '5',
    infoButtonId: 'some_info_button',
    locations: ['Bend', 'Corvallis', 'Ecampus'],
    pages: ['Dashboard'],
    sticky: true,
    title: 'All Employees!',
    weight: 50,
    body: 'This card is for all employees',
    icon: 'fad fa-starship',
    link: 'http://oregonstate.edu',
    linkText: 'Oregon State University',
    resources: ['resource-id-1', 'resource-id-2'],
  },
];

const cardsData = {
  data: cardsArray,
  status: 'success',
  isLoading: false,
  isError: false,
  isSuccess: true,
  isIdle: false,
  error: null,
  isFetching: false,
  failureCount: 0,
  refetch: () => {},
};

export default {
  cardsData,
  cardsArray,
};
