export default {
  data: [
    {
      term: '202003',
      termDescription: 'Spring 2020',
      academicYear: '1920',
      academicYearDescription: 'Academic Year 2019-20',
      programNumber: 1,
      primaryDegree: true,
      degree: 'Bachelor of Science',
      level: 'Postbac Degree Seeking',
      college: 'College of Engineering',
      degreeAwardCategory: 'Baccalaureate Degree',
      majors: {
        first: {
          major: 'Mechanical Engineering',
          programClassification: 'Mechanical Engineering',
          department: 'School of Mech, Ind, Manf Engr',
          firstConcentration: null,
          secondConcentration: null,
          thirdConcentration: null,
        },
        second: {
          major: 'Manufacturing Engineering',
          programClassification: 'Pre-Manufacturing Engineering',
          department: 'School of Mech, Ind, Manf Engr',
          firstConcentration: 'Product Development',
          secondConcentration: null,
          thirdConcentration: null,
        },
        third: null,
        fourth: null,
      },
      minors: {
        first: 'Spanish',
        second: 'Education',
        third: null,
        fourth: null,
      },
    },
  ],
  isSuccess: true,
  isLoading: false,
  error: false,
};
