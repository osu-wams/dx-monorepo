import { matchedCourseContext, plannerItemDate } from '../src/course';

describe('matchedCourseContext', () => {
  it('returns undefined when contextName is not provided', () => {
    expect(matchedCourseContext([], '')).toBeUndefined();
  });
  it('returns a course number and subject', () => {
    expect(
      matchedCourseContext(
        [
          {
            //@ts-ignore method depends only on these two fields
            attributes: {
              courseNumber: '420',
              courseSubject: 'ART',
            },
          },
        ],
        'BOB ROSS APPRECIATION (ART_420_123_F2020)', // Course context refers to the matching course
      ),
    ).toStrictEqual({ courseNumber: '420', courseSubject: 'ART' });
  });
  it('returns undefined when the course is not found', () => {
    expect(
      matchedCourseContext(
        [
          {
            //@ts-ignore method depends only on these two fields
            attributes: {
              courseNumber: '420',
              courseSubject: 'ART',
            },
          },
        ],
        'SOME OTHER CLASS (GEN_123_123_F2020)', // Course context refers to a course not in the supplied array
      ),
    ).toBeUndefined();
  });
});

describe('plannerItemDate', () => {
  it('returns void when no date is provided', () => {
    expect(plannerItemDate('calendar_event')).toBeUndefined();
  });
  it('returns void when announcement context type is provided', () => {
    expect(plannerItemDate('announcement', new Date('2020-01-01T08:00:00Z'))).toBeUndefined();
  });
  it('returns formatted calendar event date', () => {
    expect(plannerItemDate('calendar_event', new Date('2020-01-01T08:00:00Z'))).toBe('January 1, 2020');
  });
  it('returns default formatted date for all other context types', () => {
    expect(plannerItemDate('quiz', new Date('2020-01-01T08:00:00Z'))).toBe('Due Jan 1st at 12:00 AM');
  });
});
