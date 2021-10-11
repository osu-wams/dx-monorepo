import { atom } from 'recoil';
import { Types } from '@osu-wams/lib';

export const covidvacStudentState = atom<{
  data: Types.Grouper[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}>({
  key: 'covidvacStudentState',
  default: { data: [], isLoading: true, isSuccess: false, isError: false },
});
