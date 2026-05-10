// School year levels — what year of school the student is in.
export const SCHOOL_YEARS = [
  "Foundation",
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
  "Year 11",
  "Year 12",
];

// Curriculum framework choices — discriminates which VCAA dataset drives
// the report prompt and progress view.
export const SUBJECTS = [
  { value: "maths", label: "Maths" },
  { value: "english", label: "English" },
];

// Curriculum levels — the level the student is actually working at. These
// match the keys in lib/curriculum.js (VCAA F-10 + VCE study designs).
export const CURRICULUM_LEVELS = [
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
  "Year 10A",
  "VCE Foundation Maths Units 1-2",
  "VCE Foundation Maths Units 3-4",
  "VCE General Maths Units 1-2",
  "VCE General Maths Units 3-4",
  "VCE Maths Methods Units 1-2",
  "VCE Maths Methods Units 3-4",
  "VCE Specialist Maths Units 1-2",
  "VCE Specialist Maths Units 3-4",
];
