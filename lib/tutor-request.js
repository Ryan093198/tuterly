// "Want help from a local tutor?" - shared between the form
// (components/TutorRequestModal.jsx) and the server route
// (app/api/tutor-request/route.js) so the parent sees exactly the errors
// Tuterly Match's feed-ingest would return, on the right field.
//
// Mirrors validateFeedSubmission in tuterly-match/packages/core/feed.ts.
// If feed-ingest's rules change, update this file to match.

// localStorage keys
export const SENT_KEY = "tuterly:tutor_request_sent";
export const DISMISSED_KEY = "tuterly:tutor_request_dismissed";
export const DISMISS_DAYS = 30;

// Select labels → feed-ingest year integers (Prep 0, University 13).
export const YEAR_OPTIONS = [
  { label: "Prep", value: 0 },
  ...Array.from({ length: 12 }, (_, i) => ({ label: `Year ${i + 1}`, value: i + 1 })),
  { label: "University", value: 13 },
];

export const MODE_OPTIONS = [
  { value: "in_person", label: "In person" },
  { value: "online", label: "Online" },
  { value: "either", label: "Either" },
];

export const SOURCES = ["worksheet", "suburb_page", "parents_page"];

// Honeypot field name. Same as HONEYPOT_FIELD in lib/public-form-guard.js
// (not imported from there: that module is server-only).
export const HONEYPOT = "company_website";

export const CONTACT_EMAIL = "learning@baysideacademics.com.au";

export const LIMITS = {
  parent_name: 100,
  mobile: 30,
  email: 200,
  student_name: 100,
  subjects_text: 300,
  suburb: 60,
  postcode: 4,
  preferred_times: 200,
  notes: 2000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// "Year 7" / "Prep" / "University" / 7 / "7" → 0-13, else null.
export function yearToNumber(v) {
  if (typeof v === "number") return Number.isInteger(v) && v >= 0 && v <= 13 ? v : null;
  if (typeof v !== "string") return null;
  const t = v.trim();
  const opt = YEAR_OPTIONS.find((o) => o.label.toLowerCase() === t.toLowerCase());
  if (opt) return opt.value;
  const m = t.match(/^(?:year\s*)?(\d{1,2})$/i);
  if (!m) return null;
  const n = Number(m[1]);
  return n >= 0 && n <= 13 ? n : null;
}

export function yearLabel(n) {
  return YEAR_OPTIONS.find((o) => o.value === n)?.label ?? "";
}

// Australian mobile: 04xx xxx xxx or +61 4xx xxx xxx (also 61 4…),
// spaces, dashes and brackets allowed.
export function isAustralianMobile(raw) {
  if (typeof raw !== "string") return false;
  const digits = raw.replace(/[\s()-]/g, "");
  return /^(?:\+?61|0)4\d{8}$/.test(digits);
}

const str = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Raw form/body → the exact payload feed-ingest expects. Doesn't validate.
export function normaliseTutorRequest(body) {
  return {
    consent: body?.consent === true,
    parent_name: str(body?.parent_name, LIMITS.parent_name),
    mobile: str(body?.mobile, LIMITS.mobile),
    email: str(body?.email, LIMITS.email).toLowerCase(),
    student_name: str(body?.student_name, LIMITS.student_name),
    year: yearToNumber(body?.year),
    subjects_text: str(body?.subjects_text, LIMITS.subjects_text),
    suburb: str(body?.suburb, LIMITS.suburb),
    // Not sliced: a 5-character postcode must fail, not get truncated to 4.
    postcode: typeof body?.postcode === "string" ? body.postcode.trim() : "",
    mode: MODE_OPTIONS.some((m) => m.value === body?.mode) ? body.mode : null,
    preferred_times: str(body?.preferred_times, LIMITS.preferred_times),
    notes: str(body?.notes, LIMITS.notes),
  };
}

// Returns {} when valid, else { field: message }. Takes the RAW body so
// over-length values are reported rather than silently truncated.
export function validateTutorRequest(body) {
  const p = normaliseTutorRequest(body);
  const raw = (k) => (typeof body?.[k] === "string" ? body[k].trim() : "");
  const errors = {};

  if (!p.parent_name) errors.parent_name = "Please add your name.";
  else if (raw("parent_name").length > LIMITS.parent_name) errors.parent_name = "Please keep this under 100 characters.";

  if (!isAustralianMobile(raw("mobile"))) errors.mobile = "Enter an Australian mobile, like 0412 345 678";

  if (!EMAIL_RE.test(raw("email"))) errors.email = "Please enter a valid email address.";
  else if (raw("email").length > LIMITS.email) errors.email = "Please keep this under 200 characters.";

  if (!p.student_name) errors.student_name = "Please add your child's first name.";
  else if (raw("student_name").length > LIMITS.student_name) errors.student_name = "Please keep this under 100 characters.";

  if (p.year === null) errors.year = "Please choose a year level.";

  if (raw("subjects_text").length > LIMITS.subjects_text) errors.subjects_text = "Please keep this under 300 characters.";

  if (!p.suburb) errors.suburb = "Please add your suburb.";
  else if (raw("suburb").length > LIMITS.suburb) errors.suburb = "Please keep this under 60 characters.";

  if (p.postcode && !/^\d{4}$/.test(p.postcode)) errors.postcode = "Postcodes are 4 digits, like 3188.";

  if (!p.mode) errors.mode = "Please choose how you'd like lessons.";

  if (raw("preferred_times").length > LIMITS.preferred_times) errors.preferred_times = "Please keep this under 200 characters.";
  if (raw("notes").length > LIMITS.notes) errors.notes = "Please keep this under 2000 characters.";

  if (body?.consent !== true) errors.consent = "Please tick the box so we can share your request.";

  return errors;
}
