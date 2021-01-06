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
      audiences: ['Academic Faculty', 'Professional Faculty', 'Student'],
      id: '71560c56-dabb-48e1-a663-64da7a7bb6e8',
      title: 'Play nice with others',
      image: 'https://data-stage.dx.oregonstate.edu/sites/default/files/2019-11/WellnessNook.jpg',
      contact: 'noreply@oregonstate.edu',
      cost: true,
      body:
        "<p>In this basic course, you'll learn how to play nice with others. Activities include sharing toys, using your words, and being patient.</p>",
      offeredBy: 'Daycare',
      courseLength: 'Full day',
      featured: true,
      prerequisites: 'None',
      deliveryMethod: ['Online', 'Blended'],
      tags: ['Employee Engagement'],
      websiteUri: 'https://oregonstate.edu',
      websiteTitle: '',
    },
    {
      audiences: ['Academic Faculty', 'Professional Faculty', 'Classified Staff'],
      id: '71560c56-dabb-48e1-a663-64da7a7bb6e82',
      title: 'Testo Training',
      image: '',
      contact: 'noreply@oregonstate.edu',
      cost: true,
      body:
        "<p>Training Body, you'll learn how to play nice with others. Activities include sharing toys, using your words, and being patient.</p>",
      offeredBy: 'Daycare',
      courseLength: 'Half a day',
      featured: true,
      prerequisites: 'None',
      deliveryMethod: ['Blended'],
      tags: ['Leadership'],
      websiteUri: '',
      websiteTitle: '',
    },
    {
      audiences: ['Academic Faculty', 'Professional Faculty', 'Classified Staff'],
      id: '71560c56-dabb-48e1-a663-64da7a7bb6e83',
      title: 'Super Testo 2',
      image: 'https://data-stage.dx.oregonstate.edu/sites/default/files/2019-11/WellnessNook.jpg',
      contact: 'noreply@oregonstate.edu',
      cost: true,
      body: "<p>Super Body, you'll learn how to play nice with others.</p>",
      offeredBy: 'Daycare',
      courseLength: 'Multiple days',
      featured: false,
      frequency: 'Daily',
      prerequisites: 'None',
      deliveryMethod: ['Blended'],
      tags: ['Employee Engagement', 'Leadership'],
      websiteUri: 'https://oregonstate.edu',
      websiteTitle: '',
    },
  ],
};

const trainingAudiences = {
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
      id: '6b82e748-8253-42cc-92d1-34b89f2e5xxx',
      name: 'Student',
    },
    {
      id: '8253-42cc-92d1-34b89f2e5af9-6b82eyyy',
      name: 'Classified Staff',
    },
  ],
};

const trainingTags = {
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
      name: 'Leadership',
    },
    {
      id: '8253-42cc-92d1-34b89f2e5af9-6b82e748',
      name: 'Employee Engagement',
    },
  ],
};

export default {
  trainings,
  trainingAudiences,
  trainingTags,
};
