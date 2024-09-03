const Url = {
  osuMap: {
    main: 'http://map.oregonstate.edu',
  },
  osuDirectory: {
    main: 'http://directory.oregonstate.edu/?type=search&cn=',
    person: 'http://directory.oregonstate.edu/?type=showfull&osuUid=',
  },
  myDegrees: {
    main: 'https://mydegrees.oregonstate.edu:7447/dashboard/',
  },
  canvas: {
    main: 'https://canvas.oregonstate.edu',
    mainOld: 'https://oregonstate.instructure.com',
    betaOld: 'https://oregonstate.beta.instructure.com',
    testOld: 'https://oregonstate.test.instructure.com',
  },
  campusMap: {
    main: 'https://map.oregonstate.edu/',
    building: 'https://map.oregonstate.edu/?building=',
  },
  events: {
    academicCalendar: 'https://registrar.oregonstate.edu/osu-academic-calendar',
  },
  banner: {
    financialTransactions: 'https://beav.es/statement-payment-history',
    studentProfile: 'https://prodapps.isadm.oregonstate.edu/StudentSelfService/ssb/studentProfile',
    editProfile: 'https://beav.es/edit-profile',
    viewHolds: 'https://beav.es/view-holds',
  },
  myosu: {
    main: 'https://myosu.oregonstate.edu/',
  },
  bill: {
    main: 'http://mybill.oregonstate.edu',
  },
  support: {
    main: 'https://mysupport.oregonstate.edu',
  },
  // Used to be qualtrix, we might need to remove this at some point
  // Now it's a copy of support.main above
  feedback: {
    main: 'https://mysupport.oregonstate.edu',
    // main: 'https://oregonstate.qualtrics.com/jfe/form/SV_73vMvyQZBQx8aaN?type=feedback',
  },
  registrar: {
    academicStanding: 'https://registrar.oregonstate.edu/grades-honor-roll-academic-standing',
    holdsInfo: 'https://beav.es/holds',
  },
  empcenter: {
    main: 'https://osu-prod.wta-us8.wfs.cloud/workforce/SSO.do',
  },
  evals: {
    main: 'https://evals.oregonstate.edu/',
  },
  itSystemStatus: {
    main: 'https://status.is.oregonstate.edu',
  },
  gettingStarted: {
    main: 'https://mysupport.oregonstate.edu',
  },
  covidCompliance: {
    getVaccinated: 'https://www.vaccines.gov/search/',
    register: 'https://myhealth.oregonstate.edu/',
    decline: 'https://studenthealth.oregonstate.edu/covid%E2%80%9019-immunization-requirements',
  },
  successFactors: {
    main: 'https://fa.oregonstate.edu/performance-management-pilot',
    login: 'https://hcm41.sapsf.com/login?company=oregonstat',
  },
};

export default Url;
