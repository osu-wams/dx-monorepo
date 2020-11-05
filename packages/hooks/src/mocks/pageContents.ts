const pageContentData = [
  {
    title: 'PageContent Title',
    content: `<p>This is the PageContent body content <a href="https://orst.edu">beta link</a></p>`,
  },
];

const pageContentHookData = {
  data: pageContentData,
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

export default { pageContentData, pageContentHookData };
