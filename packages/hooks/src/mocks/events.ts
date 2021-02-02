/* eslint-disable camelcase */
import { Types } from '@osu-wams/lib';

const employeeEvents: { data: Types.LocalistEvent[] } = {
  data: [
    {
      action: {
        link: 'https://events.oregonstate.edu/event/2019_oregon_employees_charitable_fund_drive',
      },
      bg_image: 'https://images.localist.com/photos/31839819253203/huge/8ac2f984f613190a306d1323553c431aa65cf83f.jpg',
      date: '2019-12-17T01:00:00-08:00',
      id: 31839819109196,
      title: '2019 Oregon Employees Charitable Fund Drive',
      type: 'localist',
      campus_id: undefined,
      city: undefined,
      campus_code: undefined,
    },
    {
      action: {
        link: 'https://events.oregonstate.edu/event/the_road_less_traveled_-_willamette_valley_photoarts_guild_exhibit',
      },
      bg_image: 'https://images.localist.com/photos/31902001835222/huge/3a13c745f7e8b26f920279a7ab2578fcece4deca.jpg',
      date: '2019-12-17T08:00:00-08:00',
      id: 31902001667478,
      title: 'The Road Less Traveled - Willamette Valley PhotoArts Guild Exhibit',
      type: 'localist',
      campus_id: 272,
      city: 'Corvallis',
      campus_code: 'C',
    },
    {
      action: {
        link: 'https://events.oregonstate.edu/event/bloodborne_pathogen_training_for_non-lab_workers_933',
      },
      bg_image: 'https://images.localist.com/photos/31965230234332/huge/8873645d008fa36e46a627eed5c7401f08310306.jpg',
      date: '2019-12-17T09:00:00-08:00',
      id: 31965230137778,
      title: 'Bloodborne Pathogen Training for Non-Lab Workers',
      type: 'localist',
      campus_id: 272,
      city: 'Corvallis',
      campus_code: 'C',
    },
    {
      action: {
        link: 'https://events.oregonstate.edu/event/phd_preliminary_oral_exam_manjunath_kareppagoudr',
      },
      bg_image: 'https://images.localist.com/photos/584345/huge/c130e0926ea1894f978182ad08511d35ff510696.jpg',
      date: '2019-12-17T09:00:00-08:00',
      id: 32122778290228,
      title: 'PhD Preliminary Oral Exam – Manjunath Kareppagoudr',
      type: 'localist',
      campus_id: 272,
      city: 'Corvallis',
      campus_code: 'C',
    },
    {
      action: {
        link: 'https://events.oregonstate.edu/event/transfer_tuesdays_at_cocc_4672',
      },
      bg_image: 'https://images.localist.com/photos/30637613974227/huge/35ae3e14ebbbfaee91e1cecf49083525ca9f1259.jpg',
      date: '2019-12-17T10:00:00-08:00',
      id: 31709247104655,
      title: 'Transfer Tuesdays at COCC',
      type: 'localist',
      campus_id: 273,
      city: 'Bend',
      campus_code: 'B',
    },
  ],
};

const studentExperienceEvents: { data: Types.LocalistEvent[] } = {
  data: [
    {
      action: {
        link:
          'https://events.oregonstate.edu/event/sea-inspired_paintings_on_exhibit_at_hatfield_visitor_center_until_july_7',
      },
      bg_image: 'https://images.localist.com/photos/849707/huge/dc9bddd1554ee9119d1109f337d82d700118bba1.jpg',
      date: '2019-10-24T10:00:00-07:00',
      id: 1,
      title: 'Localist test title 1',
      type: 'localist',
      campus_id: 272,
      city: 'Corvallis',
      campus_code: 'C',
    },
    {
      action: { link: 'https://events.oregonstate.edu/event/pathogetesto' },
      bg_image: 'https://images.localist.com/photos/30318536347604/huge/testo.jpg',
      date: '2019-10-24T10:00:00-07:00',
      id: 2,
      title: 'Pathogen Environmental Monitoring Workshop for Pacific Northwest Food Ind',
      type: 'localist',
      campus_id: 272,
      city: 'Corvallis',
      campus_code: 'C',
    },
    {
      action: { link: 'https://events.oregonstate.edu/testo' },
      bg_image: 'https://images.localist.com/photos/30443006289764/huge/testo.jpg',
      date: '2019-10-24T10:00:00-07:00',
      id: 99,
      title: 'Katherine Dziedzic - Integrative Biology PhD Defense Seminar',
      type: 'localist',
      campus_id: 272,
      city: 'Corvallis',
      campus_code: 'C',
    },
  ],
};

const studentExperienceEvents_10: { data: Types.LocalistEvent[] } = {
  data: [
    {
      action: {
        link:
          'https://events.oregonstate.edu/event/sea-inspired_paintings_on_exhibit_at_hatfield_visitor_center_until_july_7',
      },
      bg_image: 'https://images.localist.com/photos/849707/huge/dc9bddd1554ee9119d1109f337d82d700118bba1.jpg',
      date: '2019-10-24T10:00:00-07:00',
      id: 1,
      title: 'Localist test title 1',
      type: 'localist',
      campus_id: 272,
      city: 'Corvallis',
      campus_code: 'C',
    },
    {
      action: { link: 'https://events.oregonstate.edu/event/pathogetesto' },
      bg_image: 'https://images.localist.com/photos/30318536347604/huge/testo.jpg',
      date: '2019-10-24T10:00:00-07:00',
      id: 2,
      title: 'Pathogen Environmental Monitoring Workshop for Pacific Northwest Food Ind',
      type: 'localist',
      campus_id: 272,
      city: 'Corvallis',
      campus_code: 'C',
    },
    {
      action: { link: 'https://events.oregonstate.edu/testo' },
      bg_image: 'https://images.localist.com/photos/30443006289764/huge/testo.jpg',
      date: '2019-10-24T10:00:00-07:00',
      id: 3,
      title: 'Katherine Dziedzic - Integrative Biology PhD Defense Seminar',
      type: 'localist',
      campus_id: 272,
      city: 'Corvallis',
      campus_code: 'C',
    },
    {
      action: {
        link:
          'https://events.oregonstate.edu/event/sea-inspired_paintings_on_exhibit_at_hatfield_visitor_center_until_july_7',
      },
      bg_image: 'https://images.localist.com/photos/849707/huge/dc9bddd1554ee9119d1109f337d82d700118bba1.jpg',
      date: '2019-10-24T10:00:00-07:00',
      id: 4,
      title: 'Localist test title 1',
      type: 'localist',
      campus_id: 272,
      city: 'Corvallis',
      campus_code: 'C',
    },
    {
      action: { link: 'https://events.oregonstate.edu/event/pathogetesto' },
      bg_image: 'https://images.localist.com/photos/30318536347604/huge/testo.jpg',
      date: '2019-10-24T10:00:00-07:00',
      id: 5,
      title: 'Pathogen Environmental Monitoring Workshop for Pacific Northwest Food Ind',
      type: 'localist',
      campus_id: 272,
      city: 'Corvallis',
      campus_code: 'C',
    },
    {
      action: { link: 'https://events.oregonstate.edu/testo' },
      bg_image: 'https://images.localist.com/photos/30443006289764/huge/testo.jpg',
      date: '2019-10-24T10:00:00-07:00',
      id: 6,
      title: 'Katherine Dziedzic - Integrative Biology PhD Defense Seminar',
      type: 'localist',
      campus_id: 272,
      city: 'Corvallis',
      campus_code: 'C',
    },
    {
      action: {
        link:
          'https://events.oregonstate.edu/event/sea-inspired_paintings_on_exhibit_at_hatfield_visitor_center_until_july_7',
      },
      bg_image: 'https://images.localist.com/photos/849707/huge/dc9bddd1554ee9119d1109f337d82d700118bba1.jpg',
      date: '2019-10-24T10:00:00-07:00',
      id: 7,
      title: 'Localist test title 1',
      type: 'localist',
      campus_id: 272,
      city: 'Corvallis',
      campus_code: 'C',
    },
    {
      action: { link: 'https://events.oregonstate.edu/event/pathogetesto' },
      bg_image: 'https://images.localist.com/photos/30318536347604/huge/testo.jpg',
      date: '2019-10-24T10:00:00-07:00',
      id: 8,
      title: 'Pathogen Environmental Monitoring Workshop for Pacific Northwest Food Ind',
      type: 'localist',
      campus_id: 272,
      city: 'Corvallis',
      campus_code: 'C',
    },
    {
      action: { link: 'https://events.oregonstate.edu/testo' },
      bg_image: 'https://images.localist.com/photos/30443006289764/huge/testo.jpg',
      date: '2019-10-24T10:00:00-07:00',
      id: 9,
      title: 'Katherine Dziedzic - Integrative Biology PhD Defense Seminar',
      type: 'localist',
      campus_id: 272,
      city: 'Corvallis',
      campus_code: 'C',
    },
    {
      action: {
        link:
          'https://events.oregonstate.edu/event/sea-inspired_paintings_on_exhibit_at_hatfield_visitor_center_until_july_7',
      },
      bg_image: 'https://images.localist.com/photos/849707/huge/dc9bddd1554ee9119d1109f337d82d700118bba1.jpg',
      date: '2019-10-24T10:00:00-07:00',
      id: 10,
      title: 'Localist test title 1',
      type: 'localist',
      campus_id: 272,
      city: 'Corvallis',
      campus_code: 'C',
    },
  ],
};

const academicCalendar3: { data: Types.AcademicEvent[] } = {
  data: [
    {
      title: 'Testo Event',
      link: 'https://events.oregonstate.edu/event/week_zero_summer_session_ends',
      pubDate: new Date().toString(),
      content: 'Week Zero Summer Session Ends',
      contentSnippet: 'Week Zero Summer Session Ends',
      isoDate: new Date().toString(),
    },
    {
      title: '11-week session beigns',
      link: 'https://events.oregonstate.edu/event/11-week_session_beigns_1572',
      pubDate: 'Mon, 24 Jun 2019 00:00:00 -0700',
      content: '11-week session begins',
      contentSnippet: '11-week session begins',
      isoDate: '2019-06-24T07:00:00.000Z',
    },
    {
      title: '8-week session begins',
      link: 'https://events.oregonstate.edu/event/8-week_session_begins_741',
      pubDate: 'Mon, 24 Jun 2019 00:00:00 -0700',
      content: '8-week session beigns',
      contentSnippet: '8-week session beigns',
      isoDate: '2019-06-24T07:00:00.000Z',
    },
  ],
};

const academicCalendar6: { data: Types.AcademicEvent[] } = {
  data: [
    {
      title: 'Week Zero Summer Session Ends',
      link: 'https://events.oregonstate.edu/event/week_zero_summer_session_ends',
      pubDate: 'Fri, 21 Jun 2019 00:00:00 -0700',
      content: 'Week Zero Summer Session Ends',
      contentSnippet: 'Week Zero Summer Session Ends',
      isoDate: new Date().toString(),
    },
    {
      title: '11-week session beigns',
      link: 'https://events.oregonstate.edu/event/11-week_session_beigns_1572',
      pubDate: 'Mon, 24 Jun 2019 00:00:00 -0700',
      content: '11-week session begins',
      contentSnippet: '11-week session begins',
      isoDate: '2019-06-24T07:00:00.000Z',
    },
    {
      title: '8-week session begins',
      link: 'https://events.oregonstate.edu/event/8-week_session_begins_741',
      pubDate: 'Mon, 24 Jun 2019 00:00:00 -0700',
      content: '8-week session beigns',
      contentSnippet: '8-week session beigns',
      isoDate: '2019-06-24T07:00:00.000Z',
    },
    {
      title: 'Testo Event',
      link: 'https://events.oregonstate.edu/event/week_zero_summer_session_ends',
      pubDate: 'Fri, 21 Jun 2019 00:00:00 -0700',
      content: 'Week Zero Summer Session Ends',
      contentSnippet: 'Week Zero Summer Session Ends',
      isoDate: '2019-06-21T07:00:00.000Z',
    },
    {
      title: '11-week test',
      link: 'https://events.oregonstate.edu/event/11-week_session_beigns_1572',
      pubDate: 'Mon, 24 Jun 2019 00:00:00 -0700',
      content: '11-week session begins',
      contentSnippet: '11-week session begins',
      isoDate: '2019-06-24T07:00:00.000Z',
    },
    {
      title: 'Testo',
      link: 'https://events.oregonstate.edu/event/8-week_session_begins_741',
      pubDate: 'Mon, 24 Jun 2019 00:00:00 -0700',
      content: '8-week session beigns',
      contentSnippet: '8-week session beigns',
      isoDate: '2019-06-24T07:00:00.000Z',
    },
  ],
};

export default {
  academicCalendar6,
  academicCalendar3,
  studentExperienceEvents,
  studentExperienceEvents_10,
  employeeEvents,
};
