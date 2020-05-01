import axios from 'axios';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/student/degrees';
import { Types } from '@osu-wams/lib';

export const mockDegrees = mocks;

export const getDegrees = (term = 'current'): Promise<{ data: Types.DegreeResponse[] }> => {
  return axios.get(`/api/student/degrees?term=${term}`).then(res => res.data);
};

export const useDegrees = (term = 'current') =>
  useAPICall<Types.Degree[]>({
    api: getDegrees,
    query: term,
    dataTransform: (response: { data: Types.DegreeResponse[] }) =>
      response.data.map((d: Types.DegreeResponse) => d.attributes),
    initialState: [],
  });
