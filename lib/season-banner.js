// The seasonal bar at the top of every marketing page (SeasonBanner.jsx).
// One entry per campaign; the bar shows between start and end (Melbourne
// dates, inclusive) and is hidden on the page it links to. Change the id
// for a new campaign so people who closed the last one see it again.
// Ideas for later: back to school (late Jan to Feb), NAPLAN (March),
// mid-year exams (late May to June).
export const SEASON_BANNERS = [
  {
    id: "exams-2026",
    start: "2026-10-27",
    end: "2026-12-12",
    text: "End-of-year exams coming up? Try Tuterly free on a question from this term’s test.",
    short: "Exams coming up? Try Tuterly free on a question.",
    cta: "Try it free",
    href: "/try",
  },
];

// Today's date in Melbourne as YYYY-MM-DD.
export function melbourneToday(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Melbourne" }).format(now);
}

export function activeBanner(today = melbourneToday()) {
  return SEASON_BANNERS.find((b) => today >= b.start && today <= b.end) || null;
}
