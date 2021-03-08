import axios from 'axios';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/person/addresses';

export const mockAddresses = mocks;

export const getAddresses = (): Promise<MailingAddress> => axios.get(`/api/persons/addresses`).then(res => res.data);
export const useAddresses = () =>
  useAPICall<MailingAddress | null>({
    api: getAddresses,
    dataTransform: (data: MailingAddress | null) => data,
    initialState: null,
  });

export interface MailingAddress {
  id: string;
  type: string;
  attributes: MailingAddressAttributes;
  links: string | null;
}

export interface MailingAddressAttributes {
  addressType: {
    code: string;
    description: string | null;
  };
  addressLine1: string;
  addressLine2: string | null;
  addressLine3: string | null;
  addressLine4: string | null;
  houseNumber: string | null;
  city: string;
  stateCode: string;
  state: string;
  postalCode: string;
  countyCode: string;
  county: string;
  nationCode: string | null;
  nation: string | null;
  lastModified: string;
}
