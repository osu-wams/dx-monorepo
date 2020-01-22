import axios from 'axios';
import mocks from '../../mocks/student/classification';

export const mockClassification = mocks;

export const getClassification = (): Promise<Classification> =>
  axios.get(`/api/student/classification`).then(res => res.data);

export type Classification = {
  id: string;
  attributes: {
    level: string;
    classification: string;
    campus: string;
    status: string;
    isInternational: boolean;
  };
};
