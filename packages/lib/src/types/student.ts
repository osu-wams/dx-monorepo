/**
 * Apigee API Types for Student Data
 */

/**
 * Degree
 */
export interface DegreeResponse {
  attributes: Degree;
}

export interface Degree {
  termDescription: string;
  academicYear: string;
  academicYearDescription: string;
  programNumber: number | null;
  primaryDegree: boolean | null;
  degree: string | null;
  level: string | null;
  college: string | null;
  degreeAwardCategory: string | null;
  majors: {
    first: Majors | null;
    second: Majors | null;
    third: Majors | null;
    fourth: Majors | null;
  };
  minors: {
    first: string | null;
    second: string | null;
    third: string | null;
    fourth: string | null;
  };
}

interface Majors {
  major: string | null;
  programClassification: string | null;
  department: string | null;
  firstConcentration: string | null;
  secondConcentration: string | null;
  thirdConcentration: string | null;
}

/**
 * End Degrees
 */
