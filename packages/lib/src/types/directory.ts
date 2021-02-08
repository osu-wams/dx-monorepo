export interface Directory {
  id: string;
  type: string;
  attributes: {
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
  };
  links: { self: string };
}

export interface DirectoryResponse {
  links: { self: string };
  data: Directory[];
}
