const trainings = {
  status: 'success',
  isIdle: false,
  isLoading: false,
  isSuccess: true,
  isError: false,
  error: null,
  isFetching: false,
  failureCount: 0,
  refetch: () => {},
  data: [
    {
      audiences: ['Academic Faculty', 'Professional Faculty', 'Staff', 'Students'],
      id: '71560c56-dabb-48e1-a663-64da7a7bb6e8',
      title: 'Play nice with others',
      image: 'https://data-stage.dx.oregonstate.edu/sites/default/files/2019-11/WellnessNook.jpg',
      contact: 'noreply@oregonstate.edu',
      cost: true,
      body:
        "<p>In this basic course, you'll learn how to play nice with others. Activities include sharing toys, using your words, and being patient.</p>",
      department: 'Daycare',
      duration: '1hr',
      featured: true,
      frequency: 'Daily',
      prerequisites: 'None',
      courseDesign: 'Blended',
      tags: ['growth'],
      type: 'Professional Learning Community',
      websiteUri: 'https://oregonstate.edu',
      websiteTitle: '',
    },
  ],
};

const trainingTypes = {
  status: 'success',
  isIdle: false,
  isLoading: false,
  isSuccess: true,
  isError: false,
  error: null,
  isFetching: false,
  failureCount: 0,
  refetch: () => {},
  data: [
    {
      id: '6b82e748-8253-42cc-92d1-34b89f2e5af9',
      name: 'Professional Learning Community',
    },
    {
      id: '8253-42cc-92d1-34b89f2e5af9-6b82e748',
      name: 'Continuing Education',
    },
  ],
};

export default {
  trainings,
  trainingTypes,
};
