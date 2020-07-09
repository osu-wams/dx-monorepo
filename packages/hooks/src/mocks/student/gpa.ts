const gpaData = [
  {
    gpa: '3.81',
    gpaType: 'Institution',
    level: 'Graduate',
    levelCode: '02',
  },
  {
    gpa: '3.81',
    gpaType: 'Overall',
    level: 'Graduate',
    levelCode: '02',
  },
  {
    gpa: '0.00',
    gpaType: 'Transfer',
    level: 'Graduate',
    levelCode: '02',
  },
  {
    gpa: '3.1',
    gpaType: 'Institution',
    level: 'Undergraduate',
    levelCode: '01',
  },
  {
    gpa: '3.1',
    gpaType: 'Overall',
    level: 'Undergraduate',
    levelCode: '01',
  },
  {
    gpa: '3.1',
    gpaType: 'Transfer',
    level: 'Undergraduate',
    levelCode: '01',
  },
];

const gpaUndergraduateData = [
  {
    gpa: '3.1',
    gpaType: 'Institution',
    level: 'Undergraduate',
    levelCode: '01',
  },
  {
    gpa: '3.1',
    gpaType: 'Overall',
    level: 'Undergraduate',
    levelCode: '01',
  },
  {
    gpa: '3.1',
    gpaType: 'Transfer',
    level: 'Undergraduate',
    levelCode: '01',
  },
];

const gpaHookData = {
  data: gpaData,
  loading: false,
  error: false,
};

export default { gpaData, gpaHookData, gpaUndergraduateData };
