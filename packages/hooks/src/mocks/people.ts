import { Types } from '@osu-wams/lib';

const peopleData: { data: Partial<Types.Directory>[]; isLoading: boolean; isSuccess: boolean; isError: boolean } = {
  data: [
    {
      id: '123',
      firstName: 'OldMan',
      lastName: 'Ross',
      department: 'Civil Engineering',
    },
    {
      id: '987',
      firstName: 'Bob',
      lastName: 'Ross',
      department: 'Sch of Mech/Ind/Mfg Engr',
    },
    {
      id: '456',
      firstName: 'Steve',
      lastName: 'Ross',
      department: 'Mathematics',
    },
  ],
  isLoading: false,
  isSuccess: true,
  isError: false,
};

export default { peopleData };
