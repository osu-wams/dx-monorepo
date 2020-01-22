import axios from 'axios';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/student/academicStatus';

export const mockAcademicStatus = mocks;

export const getAcademicStatus = (): Promise<AcademicStatus> =>
  axios.get(`/api/student/academic-status`).then(res => res.data);
export const useAcademicStatus = () =>
  useAPICall<AcademicStatus>({
    api: getAcademicStatus,
    dataTransform: (data: AcademicStatus) => data,
    initialState: {},
  });

export interface AcademicStatus {
  academicStanding?: string;
  term?: string;
}
