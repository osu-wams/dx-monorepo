import { Types } from '@osu-wams/lib';

const locationsData: { data: Partial<Types.Location>[]; isLoading: boolean; isSuccess: boolean; isError: boolean } = {
  data: [
    {
      id: '665e5039a9e92e7c47f52dd90e091899',
      name: 'Cascade Hall',
      link: 'http://map.dev.acquia.cws.oregonstate.edu/?id=665e5039a9e92e7c47f52dd90e091899',
      image:
        'http://map.dev.acquia.cws.oregonstate.edu/sites/map.oregonstate.edu/files/styles/thumbnail/public/locations/9.jpg',
      description:
        '\r\n\tAccessibility:\r\n\r\n\r\n\tENTRIES: Northwest entry to ceramics lab only.\r\n\tFLOORS: Ceramics lab (1st floor) only; 11/2 lip up to 1st on other.\r\n',
      descriptionHTML:
        '<h4>\n\tAccessibility:</h4>\n<p>\n\tENTRIES: Northwest entry to ceramics lab only.<br />\n\tFLOORS: Ceramics lab (1st floor) only; 11/2 lip up to 1st on other.</p>\n',
      address: '601 SW 17th Street',
      city: 'CORVALLIS',
      state: 'OR',
      zip: '97331',
      campus: 'Corvallis',
    },
    {
      id: 'b36b6a21c9271c56ff20d705cc60101d',
      name: 'CASCADE HALL NORTH LOT',
      link: null,
      image: null,
      description: null,
      descriptionHTML: null,
      address: null,
      city: null,
      state: null,
      zip: null,
      campus: 'Corvallis',
    },
    {
      id: 'aa134b1ff7eca220c7d2942fe0997493',
      name: 'CASCADE HALL SOUTH LOT',
      link: null,
      image: null,
      description: null,
      descriptionHTML: null,
      address: null,
      city: null,
      state: null,
      zip: null,
      campus: 'Corvallis',
    },
  ],
  isLoading: false,
  isSuccess: true,
  isError: false,
};

export default { locationsData };
