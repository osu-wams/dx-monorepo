export interface Directory {
  id: string;
  type: string;
  firstName: string;
  lastName: string;
  fullName: string;
  primaryAffiliation: string;
  jobTitle: string;
  department: string;
  departmentMailingAddress: string;
  officePhoneNumber?: string;
  officeAddress?: string;
  faxNumber?: string;
  emailAddress: string;
  username: string;
  alternatePhoneNumber?: string;
  osuUid: string;
}

export interface DirectoryResponse {
  links: { self: string };
  data: { attributes: Directory }[];
}
