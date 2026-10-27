import { Routes, Dashboards } from '../src/routes';

describe('Dashboards', () => {
  it('has employee and student dashboards', () => {
    expect(Dashboards.employee).toBe('employee');
    expect(Dashboards.student).toBe('student');
  });
});

describe('Routes', () => {
  it('has student routes', () =>
    expect(Routes('student')).toMatchInlineSnapshot(`
      {
        "about": {
          "fullPath": "/about",
          "pageName": "About",
          "path": "about",
        },
        "academics": {
          "fullPath": "/student/academics",
          "pageName": "Academics",
          "path": "academics",
        },
        "employee": {
          "fullPath": "/employee",
          "pageName": "employee",
          "path": "employee",
        },
        "finances": {
          "fullPath": "/student/finances",
          "pageName": "Finances",
          "path": "finances",
        },
        "notifications": {
          "fullPath": "/notifications",
          "pageName": "Notifications",
          "path": "notifications",
        },
        "past courses": {
          "fullPath": "/student/academics/past-courses",
          "pageName": "Past Courses",
          "path": "past-courses",
        },
        "profile": {
          "fullPath": "/profile",
          "pageName": "Profile",
          "path": "profile",
        },
        "resources": {
          "fullPath": "/student/resources",
          "pageName": "Resources",
          "path": "resources",
        },
        "search": {
          "fullPath": "/search",
          "pageName": "Search",
          "path": "search",
        },
        "student": {
          "fullPath": "/student",
          "pageName": "student",
          "path": "student",
        },
        "trainings": {
          "fullPath": "/employee/training",
          "pageName": "Trainings",
          "path": "training",
        },
      }
    `));
  it('has employee routes', () =>
    expect(Routes('employee')).toMatchInlineSnapshot(`
      {
        "about": {
          "fullPath": "/about",
          "pageName": "About",
          "path": "about",
        },
        "academics": {
          "fullPath": "/student/academics",
          "pageName": "Academics",
          "path": "academics",
        },
        "employee": {
          "fullPath": "/employee",
          "pageName": "employee",
          "path": "employee",
        },
        "finances": {
          "fullPath": "/student/finances",
          "pageName": "Finances",
          "path": "finances",
        },
        "notifications": {
          "fullPath": "/notifications",
          "pageName": "Notifications",
          "path": "notifications",
        },
        "past courses": {
          "fullPath": "/student/academics/past-courses",
          "pageName": "Past Courses",
          "path": "past-courses",
        },
        "profile": {
          "fullPath": "/profile",
          "pageName": "Profile",
          "path": "profile",
        },
        "resources": {
          "fullPath": "/employee/resources",
          "pageName": "Resources",
          "path": "resources",
        },
        "search": {
          "fullPath": "/search",
          "pageName": "Search",
          "path": "search",
        },
        "student": {
          "fullPath": "/student",
          "pageName": "student",
          "path": "student",
        },
        "trainings": {
          "fullPath": "/employee/training",
          "pageName": "Trainings",
          "path": "training",
        },
      }
    `));
  it('has default routes', () =>
    expect(Routes()).toMatchInlineSnapshot(`
      {
        "about": {
          "fullPath": "/about",
          "pageName": "About",
          "path": "about",
        },
        "academics": {
          "fullPath": "/student/academics",
          "pageName": "Academics",
          "path": "academics",
        },
        "employee": {
          "fullPath": "/employee",
          "pageName": "employee",
          "path": "employee",
        },
        "finances": {
          "fullPath": "/student/finances",
          "pageName": "Finances",
          "path": "finances",
        },
        "notifications": {
          "fullPath": "/notifications",
          "pageName": "Notifications",
          "path": "notifications",
        },
        "past courses": {
          "fullPath": "/student/academics/past-courses",
          "pageName": "Past Courses",
          "path": "past-courses",
        },
        "profile": {
          "fullPath": "/profile",
          "pageName": "Profile",
          "path": "profile",
        },
        "resources": {
          "fullPath": "/resources",
          "pageName": "Resources",
          "path": "resources",
        },
        "search": {
          "fullPath": "/search",
          "pageName": "Search",
          "path": "search",
        },
        "student": {
          "fullPath": "/student",
          "pageName": "student",
          "path": "student",
        },
        "trainings": {
          "fullPath": "/employee/training",
          "pageName": "Trainings",
          "path": "training",
        },
      }
    `));
});
