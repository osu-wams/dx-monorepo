import axios from 'axios';
import { Types } from '@osu-wams/lib';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/person/addresses';

export const mockAddresses = mocks;

export const getAddresses = (): Promise<Types.Address> => axios.get(`/api/persons/addresses`).then(res => res.data);
export const useAddresses = () =>
  useAPICall<Types.Address | null>({
    api: getAddresses,
    dataTransform: (data: Types.Address | null) => data,
    initialState: null,
  });
