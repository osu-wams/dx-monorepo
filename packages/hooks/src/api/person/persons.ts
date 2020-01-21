import axios from 'axios';
import useAPICall from '../../useAPICall';
import mocks from '../../mocks/person/persons';

export const mockPersons = mocks;

export const getPerson = (): Promise<Persons> => axios.get(`/api/persons`).then(res => res.data);
export const usePerson = () =>
  useAPICall<PersonsAttributes | null>({
    api: getPerson,
    dataTransform: (data: Persons) => ({ ...data.attributes, id: data.id }),
    initialState: null,
  });

export interface Persons {
  id: string;
  type: string;
  attributes: PersonsAttributes;
  links: { self: string };
}

export interface PersonsAttributes {
  id: string;
  birthDate: string;
  firstName: string | null;
  middleName: string | null;
  lastName: string;
  displayFirstName: string | null;
  displayMiddleName: string | null;
  displayLastName: string | null;
  previousRecords: [] | never;
  homePhone: string | null;
  alternatePhone: string | null;
  osuUID: string;
  primaryPhone: string | null;
  mobilePhone: string | null;
  currentStudent: boolean;
  currentEmployee: boolean;
  employeeStatus: string;
  email: string;
  username: string;
  confidential: boolean;
}
