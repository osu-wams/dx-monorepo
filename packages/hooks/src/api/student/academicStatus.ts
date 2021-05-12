import axios from 'axios';
import { Types } from '@osu-wams/lib';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/student/academicStatus';

export const mockAcademicStatus = mocks;

export const getAcademicStatus = (): Promise<Types.AcademicStatus> =>
  axios.get(`/api/student/academic-status`).then(res => res.data);
export const useAcademicStatus = () =>
  useAPICall<Types.AcademicStatus>({
    api: getAcademicStatus,
    dataTransform: (data: Types.AcademicStatus) => data,
    initialState: {},
  });
