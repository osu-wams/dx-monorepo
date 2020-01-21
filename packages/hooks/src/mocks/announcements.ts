/* eslint-disable camelcase */
const academicAnnouncementResult = {
  data: [
    {
      id: 'testid1',
      type: 'academic_announcements',
      date: '2019-01-01',
      title: 'Academic Announcement',
      body: 'Academic announcement body',
      affiliation: [],
      audiences: ['Corvallis', 'Bend', 'Ecampus'],
      pages: [],
    },
    {
      id: 'testid2',
      type: 'academic_announcements',
      date: '2019-01-01',
      title: 'Academic Announcement 2',
      body: 'Academic announcement body 2',
      affiliation: [],
      audiences: ['Ecampus'],
      pages: [],
    },
  ],
  loading: false,
  error: false,
};

const financialAnnouncementResult = {
  data: [
    {
      id: 'testid1',
      type: 'financial_announcements',
      date: '2019-01-01',
      title: 'Financial Announcement',
      body: 'Financial announcement body',
      bg_image: 'https://data.dx.oregonstate.edu/image_path',
      audiences: ['Corvallis', 'Bend'],
      action: { title: 'Action Title', link: 'http://somelink' },
      affiliation: [],
      pages: [],
    },
  ],
  loading: false,
  error: false,
};

export default { academicAnnouncementResult, financialAnnouncementResult };
