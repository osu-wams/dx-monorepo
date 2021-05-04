import { atom, selector } from 'recoil';
import { Types } from '@osu-wams/lib';
import { Training } from '@osu-wams/utils';
import { searchIndex } from './search';

export const trainingAudienceState = atom<{
  data: any[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}>({
  key: 'trainingAudienceState',
  default: { data: [], isLoading: true, isSuccess: false, isError: false },
});

export const selectedTrainingAudienceState = atom<string>({
  key: 'selectedTrainingAudienceState',
  default: 'all',
});

export const trainingTagState = atom<{
  data: Types.TrainingTag[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}>({
  key: 'trainingTagState',
  default: { data: [], isLoading: true, isSuccess: false, isError: false },
});

export const selectedTrainingTagState = atom<string>({
  key: 'selectedTrainingTagState',
  default: 'all',
});

export const trainingState = atom<{
  data: Types.Training[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}>({
  key: 'trainingState',
  default: { data: [], isLoading: true, isSuccess: false, isError: false },
});

/**
 * The state of the training search bar value, this can change rapidly and
 * is reflected by the value entered in the input field in the UI. This value
 * is intended to be consumed by a useDebounce hook and useEffect to eventually set the value
 * of debouncedTrainigSearchState with.
 */
export const trainingSearchState = atom<string>({
  key: 'trainingSearchState',
  default: '',
});

/**
 * After an elapsed period of time specified in a useDebounce hook, a related
 * useEffect would set the value of this state which is used by other selectors or hooks.
 * This value is a search term after the user has stopped typing for a period of time, and it will
 * initiate searching and filtering the trainings.
 */
export const debouncedTrainingSearchState = atom<string | undefined>({
  key: 'debouncedTrainingSearchState',
  default: undefined,
});

// Not intended for export; an internal selector for managing state.
const filteredTrainings = selector<Types.Training[]>({
  key: 'filteredTrainings',
  get: ({ get }) => {
    const trainings = get(trainingState);
    const selectedTag = get(selectedTrainingTagState);
    const selectedAudience = get(selectedTrainingAudienceState);
    return Training.filterByProperties(selectedTag, selectedAudience, trainings.data);
  },
});

// Not intended for export; an internal selector for managing state and
// filtering trainings when a search term is set.
const filteredTrainingsBySearch = selector<Types.Training[]>({
  key: 'filteredTrainingsBySearch',
  get: ({ get }) => {
    const searchTerm = get(debouncedTrainingSearchState);
    const query = searchTerm?.toLowerCase() ?? '';
    const trainings = get(filteredTrainings);
    if (!query) {
      return trainings;
    }
    const found = get(searchIndex(query));
    const foundIds = found.filter(i => i.item.attr.training).map(i => i.item.attr.training?.id);
    return trainings.filter(t => foundIds.includes(t.id));
  },
});

/**
 * If debouncedQuery is reset to its default (undefined), then return
 * all trainings filtered by tag, otherwise return the trainings
 * filtered by the search term entered.
 */
export const filteredTrainingsState = selector<Types.Training[]>({
  key: 'filteredTrainingsState',
  get: ({ get }) => {
    const debouncedQuery = get(debouncedTrainingSearchState);
    if (!debouncedQuery) {
      return get(filteredTrainings);
    } else {
      return get(filteredTrainingsBySearch);
    }
  },
});
