import axios from 'axios';
import useAPICall from '../useAPICall';
import mocks from '../mocks/infoButtons';

export const mockInfoButtons = mocks;

export const getInfoButtons = (): Promise<InfoButtonState[]> =>
  axios.get(`/api/info-buttons`).then((res: InfoButtonData) => res.data ?? []);

export const useInfoButtons = () =>
  useAPICall<InfoButtonState[]>({
    api: getInfoButtons,
    dataTransform: (data: InfoButtonState[]) => data,
    initialState: [],
  });

export interface InfoButtonState {
  id: string;
  title: string;
  content: string;
}

export interface InfoButtonData {
  data: InfoButtonState[];
}
