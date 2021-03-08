const personsData = {
  isLoading: false,
  isSuccess: true,
  error: false,
  data: {
    id: '1111111',
    firstName: 'Testo',
    lastName: 'Last',
    middleName: null,
    birthDate: '1980-09-10',
    citizen: {
      code: 'C',
      description: 'Citizen',
    },
    sex: 'M',
    displayFirstName: 'Testo',
    displayMiddleName: null,
    displayLastName: 'Last',
    onid: 'testol',
    confidentialInd: false,
    currentStudentInd: true,
    employeeStatus: {
      code: 'A',
      description: 'Active',
    },
    ssnStatus: 'valid',
    lastPaidDate: '2021-02-28',
  },
};

const preferredName = {
  isLoading: false,
  isSuccess: true,
  error: false,
  data: {
    id: '12345',
    firstName: 'FirstName',
    lastName: 'Testo',
    middleName: null,
    birthDate: '1980-09-10',
    citizen: {
      code: 'C',
      description: 'Citizen',
    },
    sex: 'M',
    displayFirstName: 'displayFirstName',
    displayMiddleName: 'displayMiddleName',
    displayLastName: 'displayLastName',
    onid: 'testol',
    confidentialInd: false,
    currentStudentInd: true,
    employeeStatus: {
      code: 'A',
      description: 'Active',
    },
    ssnStatus: 'valid',
    lastPaidDate: '2021-02-28',
  },
};

const preferredFirstName = {
  data: {
    id: '12345',
    alternatePhone: null,
    birthDate: '1973-02-08',
    citizen: null,
    confidential: false,
    currentEmployee: false,
    currentStudent: false,
    email: null,
    employeeStatus: null,
    firstName: 'FirstName',
    homePhone: '1234home',
    lastName: 'Testo',
    middleName: null,
    mobilePhone: '1234mobile',
    osuUID: null,
    displayFirstName: 'displayFirstName',
    displayLastName: null,
    displayMiddleName: null,
    previousRecords: [],
    primaryPhone: '1234mobile',
    sex: 'F',
    ssnStatus: 'vault',
    username: null,
  },
  isLoading: false,
  isSuccess: true,
  error: false,
};

const nullName = {
  data: {
    id: null,
    firstName: null,
    lastName: null,
    middleName: null,
    birthDate: '1980-09-10',
    citizen: {
      code: 'C',
      description: 'Citizen',
    },
    sex: 'M',
    displayFirstName: null,
    displayMiddleName: null,
    displayLastName: null,
    onid: null,
    confidentialInd: false,
    currentStudentInd: true,
    employeeStatus: {
      code: 'A',
      description: 'Active',
    },
    ssnStatus: 'valid',
    lastPaidDate: '2021-02-28',
  },
  isLoading: false,
  isSuccuess: true,
  error: false,
};

const emailsData = {
  isLoading: false,
  isSuccess: true,
  error: false,
  data: [
    {
      id: '918179',
      type: 'emails',
      links: {
        self: 'string',
      },
      attributes: {
        emailType: {
          code: 'ONID',
          description: 'string',
        },
        emailAddress: 'testo.last@oregonstate.edu',
        comment: 'string',
        preferredInd: true,
        lastActivityDate: '1970-01-01',
      },
    },
  ],
};

const phonesData = {
  isLoading: false,
  isSuccess: true,
  error: false,
  data: [
    {
      id: 'string',
      type: 'phones',
      links: {
        self: 'string',
      },
      attributes: {
        areaCode: '1234',
        phoneNumber: 'phone',
        phoneExtension: '20',
        primaryInd: true,
        phoneType: {
          code: 'PA',
          description: 'Current',
        },
        addressType: {
          code: 'PA',
          description: 'Current Mailing',
        },
        fullPhoneNumber: '1234phone',
        lastModified: '2015-10-19',
      },
    },
  ],
};

const multiplePhonesData = {
  isLoading: false,
  isSuccess: true,
  error: false,
  data: [
    {
      id: 'string',
      type: 'phones',
      links: {
        self: 'string',
      },
      attributes: {
        areaCode: '1234',
        phoneNumber: 'phone',
        phoneExtension: '20',
        primaryInd: false,
        phoneType: {
          code: 'PA',
          description: 'Current',
        },
        addressType: {
          code: 'PA',
          description: 'Current Mailing',
        },
        fullPhoneNumber: '1234phone',
        lastModified: '2015-10-19',
      },
    },
    {
      id: 'string',
      type: 'phones',
      links: {
        self: 'string',
      },
      attributes: {
        areaCode: '1234',
        phoneNumber: 'phone2',
        phoneExtension: '20',
        primaryInd: false,
        phoneType: {
          code: 'MP',
          description: 'Current',
        },
        addressType: {
          code: 'PA',
          description: 'Current Mailing',
        },
        fullPhoneNumber: '1234phone2',
        lastModified: '2015-10-19',
      },
    },
    {
      id: 'string',
      type: 'phones',
      links: {
        self: 'string',
      },
      attributes: {
        areaCode: '1234',
        phoneNumber: 'phoneprimary',
        phoneExtension: '20',
        primaryInd: true,
        phoneType: {
          code: 'CM',
          description: 'Current',
        },
        addressType: {
          code: 'CM',
          description: 'Current Mailing',
        },
        fullPhoneNumber: '1234phoneprimary',
        lastModified: '2015-10-19',
      },
    },
  ],
};

export default { emailsData, personsData, nullName, preferredFirstName, preferredName, phonesData, multiplePhonesData };
