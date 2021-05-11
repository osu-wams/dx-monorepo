import { Types } from '@osu-wams/lib';
import { filterByProperties } from '../src/training';

// @ts-ignore tests require only an array of partial training
const mockTraining: Types.Training = { audiences: ['Audience1'], tags: ['Tag1'] };

describe('filterByProperties', () => {
  it('returns all trainings when tag and audience are all', () => {
    expect(filterByProperties('all', 'all', [mockTraining])).toHaveLength(1);
  });
  it('returns filtered trainings by tag', () => {
    expect(filterByProperties('Tag1', 'all', [mockTraining, { ...mockTraining, tags: ['Tag2'] }])).toHaveLength(1);
  });
  it('returns filtered trainings by audience', () => {
    expect(
      filterByProperties('all', 'Audience1', [mockTraining, { ...mockTraining, audiences: ['Audience2'] }]),
    ).toHaveLength(1);
  });
  it('returns filtered trainings by tag and audience', () => {
    expect(
      filterByProperties('BobRoss', 'BobRoss', [
        mockTraining,
        { ...mockTraining, audiences: ['BobRoss'], tags: ['BobRoss'] },
      ]),
    ).toHaveLength(1);
  });
});
