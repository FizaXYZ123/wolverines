export interface CalendarEventItem {
  id: string;
  title: string;
  type: "practice" | "tournament" | "match";
  dateString: string; // e.g. "OCTOBER 5, 2026"
  year: number;
  month: number; // 0-indexed: 0 = Jan, 9 = Oct
  day: number;
  location: string;
  time: string;
}

export const allCalendarEvents: CalendarEventItem[] = [
  // September 2026 Practices / Matches
  {
    id: "schedule-1",
    title: "Indoor Practice & Tactical Drills",
    type: "practice",
    dateString: "SEPTEMBER 14, 2026",
    year: 2026,
    month: 8, // September
    day: 14,
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-2",
    title: "Indoor Practice & Skills Clinic",
    type: "practice",
    dateString: "SEPTEMBER 21, 2026",
    year: 2026,
    month: 8,
    day: 21,
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-3",
    title: "Indoor Practice Match",
    type: "match",
    dateString: "SEPTEMBER 23, 2026",
    year: 2026,
    month: 8,
    day: 23,
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-4",
    title: "Indoor Practice & Shooting Drills",
    type: "practice",
    dateString: "SEPTEMBER 28, 2026",
    year: 2026,
    month: 8,
    day: 28,
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-5",
    title: "Indoor Practice Match Session",
    type: "match",
    dateString: "SEPTEMBER 30, 2026",
    year: 2026,
    month: 8,
    day: 30,
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },

  // October 2026 (Matches from user screenshot: 5, 8, 12, 19, 26)
  {
    id: "schedule-6",
    title: "Indoor Practice Match vs Thunderbirds",
    type: "match",
    dateString: "OCTOBER 5, 2026",
    year: 2026,
    month: 9, // October
    day: 5,
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-7",
    title: "Tactical Scrimmage & Penalty Corners",
    type: "match",
    dateString: "OCTOBER 8, 2026",
    year: 2026,
    month: 9,
    day: 8,
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-8",
    title: "Indoor Championship Practice Match",
    type: "match",
    dateString: "OCTOBER 12, 2026",
    year: 2026,
    month: 9,
    day: 12,
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-9",
    title: "Indoor League Match Warmup & Scrimmage",
    type: "match",
    dateString: "OCTOBER 19, 2026",
    year: 2026,
    month: 9,
    day: 19,
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-10",
    title: "Senior Turf Exhibition Match",
    type: "match",
    dateString: "OCTOBER 26, 2026",
    year: 2026,
    month: 9,
    day: 26,
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },

  // November 2026
  {
    id: "schedule-11",
    title: "Indoor Practice & Fitness Conditioning",
    type: "practice",
    dateString: "NOVEMBER 2, 2026",
    year: 2026,
    month: 10, // November
    day: 2,
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-12",
    title: "Indoor Practice Scrimmage",
    type: "match",
    dateString: "NOVEMBER 5, 2026",
    year: 2026,
    month: 10,
    day: 5,
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-13",
    title: "Indoor Practice & Goalkeeper Special Clinic",
    type: "practice",
    dateString: "NOVEMBER 9, 2026",
    year: 2026,
    month: 10,
    day: 9,
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-14",
    title: "Indoor Practice Match",
    type: "match",
    dateString: "NOVEMBER 12, 2026",
    year: 2026,
    month: 10,
    day: 12,
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-15",
    title: "Indoor Practice & Speed Drills",
    type: "practice",
    dateString: "NOVEMBER 16, 2026",
    year: 2026,
    month: 10,
    day: 16,
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-16",
    title: "Indoor Practice Match Session",
    type: "match",
    dateString: "NOVEMBER 19, 2026",
    year: 2026,
    month: 10,
    day: 19,
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-17",
    title: "Indoor Practice & Team Tactics",
    type: "practice",
    dateString: "NOVEMBER 23, 2026",
    year: 2026,
    month: 10,
    day: 23,
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-18",
    title: "Indoor Practice Season Wrap-up Match",
    type: "match",
    dateString: "NOVEMBER 30, 2026",
    year: 2026,
    month: 10,
    day: 30,
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
];

export function getEventsForDate(year: number, month: number, day: number): CalendarEventItem[] {
  return allCalendarEvents.filter(
    (event) => event.year === year && event.month === month && event.day === day
  );
}
