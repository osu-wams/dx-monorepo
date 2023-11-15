import { Types } from '@osu-wams/lib';
import { useQuery, UseQueryOptions } from 'react-query';
import { REACT_QUERY_DEFAULT_CONFIG } from '../constants';
import mocks from '../mocks/infoButtons';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { infoButtonState } from '../state/application';

export const mockInfoButtons = mocks;

export const useInfoButtons = (opts: UseQueryOptions<Types.InfoButtonState[], Error> = REACT_QUERY_DEFAULT_CONFIG) =>
  useQuery('/api/info-buttons', opts);

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
