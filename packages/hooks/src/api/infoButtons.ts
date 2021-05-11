import axios from 'axios';
import useAPICall from '../useAPICall';
import mocks from '../mocks/infoButtons';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { infoButtonState } from '../state/application';

export const mockInfoButtons = mocks;
export interface InfoButtonState {
  id: string;
  title: string;
  content: string;
}

export interface InfoButtonData {
  data: InfoButtonState[];
}

export const getInfoButtons = (): Promise<InfoButtonState[]> =>
  axios.get(`/api/info-buttons`).then((res: InfoButtonData) => res.data ?? []);

export const useInfoButtons = () =>
  useAPICall<InfoButtonState[]>({
    api: getInfoButtons,
    dataTransform: (data: InfoButtonState[]) => data,
    initialState: [],
  });

/**
 * Fetch the data from the api hook and persist in shared state
 * @returns data and setter for info buttons state
 */
export const useInfoButtonsState = () => {
  const api = useInfoButtons();
  const [infoButtons, setInfoButtons] = useRecoilState(infoButtonState);

  useEffect(() => {
    const { data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (data && data !== infoButtons) {
      setInfoButtons(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api.data]);

  return { infoButtons, setInfoButtons };
};
