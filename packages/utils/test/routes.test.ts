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
      Object {
        "about": Object {
          "fullPath": "/about",
          "pageName": "About",
          "path": "about",
        },
        "academics": Object {
          "fullPath": "/student/academics",
          "pageName": "Academics",
          "path": "academics",
        },
        "employee": Object {
          "fullPath": "/employee",
          "pageName": "employee",
          "path": "employee",
        },
        "finances": Object {
          "fullPath": "/student/finances",
          "pageName": "Finances",
          "path": "finances",
        },
        "notifications": Object {
          "fullPath": "/notifications",
          "pageName": "Notifications",
          "path": "notifications",
        },
        "past courses": Object {
          "fullPath": "/student/academics/past-courses",
          "pageName": "Past Courses",
          "path": "past-courses",
        },
        "profile": Object {
          "fullPath": "/profile",
          "pageName": "Profile",
          "path": "profile",
        },
        "resources": Object {
          "fullPath": "/student/resources",
          "pageName": "Resources",
          "path": "resources",
        },
        "search": Object {
          "fullPath": "/search",
          "pageName": "Search",
          "path": "search",
        },
        "student": Object {
          "fullPath": "/student",
          "pageName": "student",
          "path": "student",
        },
        "trainings": Object {
          "fullPath": "/employee/training",
          "pageName": "Trainings",
          "path": "training",
        },
      }
    `));
  it('has employee routes', () =>
    expect(Routes('employee')).toMatchInlineSnapshot(`
      Object {
        "about": Object {
          "fullPath": "/about",
          "pageName": "About",
          "path": "about",
        },
        "academics": Object {
          "fullPath": "/student/academics",
          "pageName": "Academics",
          "path": "academics",
        },
        "employee": Object {
          "fullPath": "/employee",
          "pageName": "employee",
          "path": "employee",
        },
        "finances": Object {
          "fullPath": "/student/finances",
          "pageName": "Finances",
          "path": "finances",
        },
        "notifications": Object {
          "fullPath": "/notifications",
          "pageName": "Notifications",
          "path": "notifications",
        },
        "past courses": Object {
          "fullPath": "/student/academics/past-courses",
          "pageName": "Past Courses",
          "path": "past-courses",
        },
        "profile": Object {
          "fullPath": "/profile",
          "pageName": "Profile",
          "path": "profile",
        },
        "resources": Object {
          "fullPath": "/employee/resources",
          "pageName": "Resources",
          "path": "resources",
        },
        "search": Object {
          "fullPath": "/search",
          "pageName": "Search",
          "path": "search",
        },
        "student": Object {
          "fullPath": "/student",
          "pageName": "student",
          "path": "student",
        },
        "trainings": Object {
          "fullPath": "/employee/training",
          "pageName": "Trainings",
          "path": "training",
        },
      }
    `));
  it('has default routes', () =>
    expect(Routes()).toMatchInlineSnapshot(`
      Object {
        "about": Object {
          "fullPath": "/about",
          "pageName": "About",
          "path": "about",
        },
        "academics": Object {
          "fullPath": "/student/academics",
          "pageName": "Academics",
          "path": "academics",
        },
        "employee": Object {
          "fullPath": "/employee",
          "pageName": "employee",
          "path": "employee",
        },
        "finances": Object {
          "fullPath": "/student/finances",
          "pageName": "Finances",
          "path": "finances",
        },
        "notifications": Object {
          "fullPath": "/notifications",
          "pageName": "Notifications",
          "path": "notifications",
        },
        "past courses": Object {
          "fullPath": "/student/academics/past-courses",
          "pageName": "Past Courses",
          "path": "past-courses",
        },
        "profile": Object {
          "fullPath": "/profile",
          "pageName": "Profile",
          "path": "profile",
        },
        "resources": Object {
          "fullPath": "/resources",
          "pageName": "Resources",
          "path": "resources",
        },
        "search": Object {
          "fullPath": "/search",
          "pageName": "Search",
          "path": "search",
        },
        "student": Object {
          "fullPath": "/student",
          "pageName": "student",
          "path": "student",
        },
        "trainings": Object {
          "fullPath": "/employee/training",
          "pageName": "Trainings",
          "path": "training",
        },
      }
    `));
});
