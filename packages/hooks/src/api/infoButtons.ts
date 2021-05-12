import axios from 'axios';
import { Types } from '@osu-wams/lib';
import useAPICall from '../useAPICall';
import mocks from '../mocks/infoButtons';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { infoButtonState } from '../state/application';

export const mockInfoButtons = mocks;

export const getInfoButtons = (): Promise<Types.InfoButtonState[]> =>
  axios.get(`/api/info-buttons`).then((res: Types.InfoButtonData) => res.data ?? []);

export const useInfoButtons = () =>
  useAPICall<Types.InfoButtonState[]>({
    api: getInfoButtons,
    dataTransform: (data: Types.InfoButtonState[]) => data,
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
