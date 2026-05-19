// VCE Unit 3/4 subjects available in the ATAR planner subject picker.
// Grouped so the dropdown can show categories rather than one flat list.
// English variants are flagged so the calculator can enforce the
// "must include one English" rule.
//
// scalingAt30 is the approximate scaled-score equivalent of a raw 30,
// based on recent VCAA Scaling Reports. We use a single anchor point
// per subject and a piecewise-linear curve (0, 0) → (30, scalingAt30)
// → (50, 50) to estimate the full curve. This is an approximation;
// real VCAA scaling varies year to year and is non-linear, so the
// numbers can be a point or two off either way. Treating raw as
// scaled (no scaling at all) is significantly less accurate.

export const ENGLISH_SUBJECTS = [
  "English",
  "EAL (English as an Additional Language)",
  "English Language",
  "Literature",
];

// scalingAt30 reference values are approximate, based on the 2024
// VCAA Scaling Report at the time of writing. Update annually as
// VCAA publishes new scaling reports.
export const VCE_SUBJECTS = [
  // Maths
  { name: "Mathematical Methods", group: "Maths", scalingAt30: 36 },
  { name: "Specialist Mathematics", group: "Maths", scalingAt30: 41 },
  { name: "General Mathematics", group: "Maths", scalingAt30: 29 },
  { name: "Foundation Mathematics", group: "Maths", scalingAt30: 24 },

  // English (any one counts toward the Primary 4)
  { name: "English", group: "English", isEnglish: true, scalingAt30: 30 },
  { name: "EAL (English as an Additional Language)", group: "English", isEnglish: true, scalingAt30: 28 },
  { name: "English Language", group: "English", isEnglish: true, scalingAt30: 32 },
  { name: "Literature", group: "English", isEnglish: true, scalingAt30: 31 },

  // Sciences
  { name: "Chemistry", group: "Science", scalingAt30: 33 },
  { name: "Physics", group: "Science", scalingAt30: 33 },
  { name: "Biology", group: "Science", scalingAt30: 31 },
  { name: "Psychology", group: "Science", scalingAt30: 29 },
  { name: "Environmental Science", group: "Science", scalingAt30: 28 },

  // Health
  { name: "Health and Human Development", group: "Health", scalingAt30: 26 },
  { name: "Physical Education", group: "Health", scalingAt30: 27 },

  // Humanities / Business
  { name: "Business Management", group: "Business", scalingAt30: 28 },
  { name: "Accounting", group: "Business", scalingAt30: 30 },
  { name: "Economics", group: "Business", scalingAt30: 32 },
  { name: "Legal Studies", group: "Humanities", scalingAt30: 29 },
  { name: "History: Revolutions", group: "Humanities", scalingAt30: 30 },
  { name: "Australian and Global Politics", group: "Humanities", scalingAt30: 30 },
  { name: "Geography", group: "Humanities", scalingAt30: 29 },
  { name: "Sociology", group: "Humanities", scalingAt30: 29 },
  { name: "Philosophy", group: "Humanities", scalingAt30: 32 },
  { name: "Religion and Society", group: "Humanities", scalingAt30: 29 },

  // Media / Arts
  { name: "Media", group: "Arts", scalingAt30: 28 },
  { name: "Studio Arts", group: "Arts", scalingAt30: 27 },
  { name: "Visual Communication Design", group: "Arts", scalingAt30: 28 },
  { name: "Art Making and Exhibiting", group: "Arts", scalingAt30: 27 },
  { name: "Music Performance", group: "Arts", scalingAt30: 30 },
  { name: "Music Repertoire Performance", group: "Arts", scalingAt30: 32 },
  { name: "Theatre Studies", group: "Arts", scalingAt30: 29 },
  { name: "Drama", group: "Arts", scalingAt30: 29 },
  { name: "Dance", group: "Arts", scalingAt30: 30 },

  // Technology
  { name: "Algorithmics (HESS)", group: "Technology", scalingAt30: 37 },
  { name: "Applied Computing: Software Development", group: "Technology", scalingAt30: 29 },
  { name: "Applied Computing: Data Analytics", group: "Technology", scalingAt30: 28 },
  { name: "Systems Engineering", group: "Technology", scalingAt30: 27 },
  { name: "Product Design and Technology", group: "Technology", scalingAt30: 26 },
  { name: "Food Studies", group: "Technology", scalingAt30: 26 },

  // Languages - tend to scale up significantly
  { name: "French", group: "Languages", scalingAt30: 37 },
  { name: "Italian", group: "Languages", scalingAt30: 36 },
  { name: "German", group: "Languages", scalingAt30: 37 },
  { name: "Spanish", group: "Languages", scalingAt30: 37 },
  { name: "Chinese (Second Language)", group: "Languages", scalingAt30: 35 },
  { name: "Japanese (Second Language)", group: "Languages", scalingAt30: 36 },
  { name: "Indonesian (Second Language)", group: "Languages", scalingAt30: 35 },
  { name: "Vietnamese", group: "Languages", scalingAt30: 34 },
  { name: "Greek", group: "Languages", scalingAt30: 35 },
  { name: "Arabic", group: "Languages", scalingAt30: 34 },
  { name: "Korean", group: "Languages", scalingAt30: 35 },
  { name: "Latin", group: "Languages", scalingAt30: 41 },
];

export const SUBJECT_GROUPS = [
  "English",
  "Maths",
  "Science",
  "Health",
  "Business",
  "Humanities",
  "Arts",
  "Technology",
  "Languages",
];

// Treat any of the four English options as satisfying an "English"
// prerequisite. The calculator uses this to pick the best English
// score for the Primary 4.
export function isEnglishSubject(name) {
  return ENGLISH_SUBJECTS.includes(name);
}

export function findSubject(name) {
  return VCE_SUBJECTS.find((s) => s.name === name) ?? null;
}

// Piecewise-linear scaling: anchors at (0, 0), (30, scalingAt30),
// (50, 50). Returns the scaled study score for a given raw score.
// Subjects with scalingAt30 > 30 bow up (scale up), < 30 bow down.
export function rawToScaled(rawScore, scalingAt30) {
  if (!Number.isFinite(rawScore) || rawScore <= 0) return 0;
  if (rawScore >= 50) return 50;
  const anchor = scalingAt30 ?? 30;
  if (rawScore <= 30) {
    return (rawScore / 30) * anchor;
  }
  // Between 30 and 50: linear from (30, anchor) to (50, 50)
  return anchor + ((rawScore - 30) / 20) * (50 - anchor);
}

// Convenience: scale a {subject, score} pair using its subject's
// scalingAt30. Unknown subjects default to neutral scaling (no
// adjustment).
export function scalePair({ subject, score }) {
  const meta = findSubject(subject);
  const scaled = rawToScaled(score, meta?.scalingAt30 ?? 30);
  return {
    subject,
    rawScore: score,
    score: scaled, // engine uses `score` as the scaled value
    scaledScore: scaled,
    scalingAt30: meta?.scalingAt30 ?? 30,
  };
}
