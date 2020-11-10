const releaseNotesData = [
  {
    title: 'Test Release Note',
    content: '<p>This is the test release note body content.</p>',
    date: 'Winter test 2019',
  },
];

const releaseNotesHookData = {
  data: releaseNotesData,
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

export default { releaseNotesData, releaseNotesHookData };
