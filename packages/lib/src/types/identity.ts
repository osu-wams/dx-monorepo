export interface IdentitiesAttributes {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  displayFirstName: string;
  displayMiddleName: string;
  displayLastName: string;
  osuId: string;
  onid: string;
  osuUid: string;
  proxId: string;
}

export interface Identities {
  id: string;
  type: string;
  attributes: IdentitiesAttributes;
  links: { self: string };
}

export interface IdentitiesResponse {
  links: { self: string };
  data: Identities;
}