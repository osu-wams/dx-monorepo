const pageSearchIndexData = [
  {
    id: '43f124d0-f6e5-4482-809e-35bb28f856aa',
    page: 'About',
    description: 'About page description',
    searchTerms: ['About data', 'random '],
  },
  {
    id: '8078a423-ac92-4607-a470-a7d0def3ed51',
    page: 'Academics',
    description: 'Academics page description',
    searchTerms: ['Past Courses', 'Academic Resources', 'Assignments'],
  },
];

const pageSearchIndexHooksData = {
  data: pageSearchIndexData,
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

export default { pageSearchIndexData, pageSearchIndexHooksData };
