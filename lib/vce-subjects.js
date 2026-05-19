// VCE Unit 3/4 subjects available in the ATAR planner subject picker.
// Each subject carries a `scaling` array which is the official VTAC
// scaled-score equivalent for raw 20, 25, 30, 35, 40, 45, 50 -
// taken directly from the 2025 VTAC Scaling Report (11 Dec 2025).
// The calculator does piecewise-linear interpolation between these
// anchors to scale any raw score in [0, 50].
//
// Some subjects can scale ABOVE 50 (eg Specialist Mathematics raw
// 50 -> scaled 55, Latin raw 50 -> scaled 55). The calculator
// handles this; do not clamp.
//
// Update annually when VTAC publishes the new Scaling Report.

export const ENGLISH_SUBJECTS = [
  "English",
  "EAL (English as an Additional Language)",
  "English Language",
  "Literature",
];

// 2025 VTAC Scaling Report values. Array order is the scaled score
// for raw 20, 25, 30, 35, 40, 45, 50 respectively.
export const VCE_SUBJECTS = [
  // Maths
  { name: "Mathematical Methods", group: "Maths", scaling: [21, 28, 35, 41, 46, 49, 51] },
  { name: "Specialist Mathematics", group: "Maths", scaling: [29, 36, 43, 48, 51, 54, 55] },
  { name: "General Mathematics", group: "Maths", scaling: [18, 23, 28, 33, 38, 44, 50] },
  { name: "Foundation Mathematics", group: "Maths", scaling: [12, 16, 20, 26, 32, 40, 50] },

  // English (any one counts toward the Primary 4)
  { name: "English", group: "English", isEnglish: true, scaling: [17, 22, 28, 33, 39, 45, 50] },
  { name: "EAL (English as an Additional Language)", group: "English", isEnglish: true, scaling: [15, 21, 27, 33, 40, 46, 50] },
  { name: "English Language", group: "English", isEnglish: true, scaling: [22, 27, 33, 38, 43, 47, 50] },
  { name: "Literature", group: "English", isEnglish: true, scaling: [20, 26, 31, 36, 41, 46, 50] },

  // Sciences
  { name: "Chemistry", group: "Science", scaling: [22, 28, 34, 39, 44, 47, 50] },
  { name: "Physics", group: "Science", scaling: [20, 26, 32, 37, 42, 47, 50] },
  { name: "Biology", group: "Science", scaling: [19, 25, 31, 36, 41, 46, 50] },
  { name: "Psychology", group: "Science", scaling: [18, 23, 28, 34, 39, 45, 50] },
  { name: "Environmental Science", group: "Science", scaling: [18, 23, 28, 33, 39, 44, 50] },

  // Health
  { name: "Health and Human Development", group: "Health", scaling: [16, 21, 26, 31, 37, 43, 50] },
  { name: "Physical Education", group: "Health", scaling: [17, 22, 27, 33, 38, 44, 50] },
  { name: "Outdoor and Environmental Studies", group: "Health", scaling: [15, 20, 24, 30, 36, 42, 50] },

  // Business
  { name: "Accounting", group: "Business", scaling: [20, 25, 31, 36, 41, 46, 50] },
  { name: "Business Management", group: "Business", scaling: [17, 22, 27, 32, 38, 44, 50] },
  { name: "Economics", group: "Business", scaling: [20, 26, 31, 37, 42, 46, 50] },
  { name: "Industry and Enterprise", group: "Business", scaling: [12, 16, 20, 26, 32, 40, 50] },

  // Humanities
  { name: "Legal Studies", group: "Humanities", scaling: [18, 23, 28, 34, 40, 45, 50] },
  { name: "History: Revolutions", group: "Humanities", scaling: [18, 23, 29, 34, 40, 45, 50] },
  { name: "History: Ancient History", group: "Humanities", scaling: [16, 21, 27, 33, 39, 45, 50] },
  { name: "History: Australian History", group: "Humanities", scaling: [18, 23, 29, 34, 40, 45, 50] },
  { name: "Classical Studies", group: "Humanities", scaling: [19, 25, 30, 36, 41, 46, 50] },
  { name: "Politics", group: "Humanities", scaling: [21, 27, 32, 37, 42, 46, 50] },
  { name: "Geography", group: "Humanities", scaling: [18, 23, 28, 34, 39, 45, 50] },
  { name: "Sociology", group: "Humanities", scaling: [15, 20, 25, 31, 38, 44, 50] },
  { name: "Philosophy", group: "Humanities", scaling: [19, 24, 29, 35, 40, 45, 50] },
  { name: "Religion and Society", group: "Humanities", scaling: [18, 23, 28, 34, 39, 45, 50] },
  { name: "Texts and Traditions", group: "Humanities", scaling: [17, 22, 27, 32, 37, 43, 50] },
  { name: "Extended Investigation", group: "Humanities", scaling: [22, 27, 33, 38, 42, 47, 50] },

  // Media / Arts
  { name: "Media", group: "Arts", scaling: [16, 21, 26, 32, 38, 44, 50] },
  { name: "Art Creative Practice", group: "Arts", scaling: [16, 21, 27, 32, 38, 44, 50] },
  { name: "Art Making and Exhibiting", group: "Arts", scaling: [15, 20, 25, 31, 37, 44, 50] },
  { name: "Visual Communication Design", group: "Arts", scaling: [16, 21, 26, 32, 38, 44, 50] },
  { name: "Music Composition", group: "Arts", scaling: [21, 26, 31, 36, 41, 45, 50] },
  { name: "Music Contemporary Performance", group: "Arts", scaling: [17, 22, 27, 33, 38, 44, 50] },
  { name: "Music Inquiry", group: "Arts", scaling: [18, 23, 28, 33, 38, 44, 50] },
  { name: "Music Repertoire Performance", group: "Arts", scaling: [22, 27, 32, 37, 42, 46, 50] },
  { name: "Theatre Studies", group: "Arts", scaling: [18, 23, 28, 34, 39, 45, 50] },
  { name: "Drama", group: "Arts", scaling: [18, 23, 28, 33, 39, 45, 50] },
  { name: "Dance", group: "Arts", scaling: [18, 23, 27, 32, 37, 43, 50] },

  // Technology
  { name: "Algorithmics (HESS)", group: "Technology", scaling: [24, 31, 38, 43, 47, 50, 51] },
  { name: "Applied Computing: Software Development", group: "Technology", scaling: [17, 22, 28, 33, 39, 45, 50] },
  { name: "Applied Computing: Data Analytics", group: "Technology", scaling: [16, 21, 26, 32, 38, 44, 50] },
  { name: "Systems Engineering", group: "Technology", scaling: [17, 21, 26, 32, 37, 43, 50] },
  { name: "Product Design and Technologies", group: "Technology", scaling: [14, 19, 24, 29, 36, 42, 50] },
  { name: "Food Studies", group: "Technology", scaling: [14, 19, 23, 29, 35, 42, 50] },
  { name: "Agricultural and Horticultural Studies", group: "Technology", scaling: [15, 19, 24, 29, 34, 41, 50] },

  // Languages - 2025 scaling values
  { name: "French", group: "Languages", scaling: [30, 36, 41, 45, 49, 51, 53] },
  { name: "Italian", group: "Languages", scaling: [27, 33, 38, 42, 45, 48, 50] },
  { name: "German", group: "Languages", scaling: [27, 34, 39, 44, 48, 51, 53] },
  { name: "Spanish", group: "Languages", scaling: [26, 31, 35, 40, 44, 47, 50] },
  { name: "Chinese (Second Language)", group: "Languages", scaling: [29, 35, 41, 45, 49, 52, 54] },
  { name: "Chinese Second Language Advanced", group: "Languages", scaling: [24, 31, 37, 42, 47, 50, 52] },
  { name: "Chinese First Language", group: "Languages", scaling: [18, 25, 33, 39, 45, 48, 50] },
  { name: "Japanese (Second Language)", group: "Languages", scaling: [26, 32, 38, 43, 46, 49, 51] },
  { name: "Indonesian (Second Language)", group: "Languages", scaling: [26, 32, 38, 42, 46, 49, 52] },
  { name: "Vietnamese (Second Language)", group: "Languages", scaling: [26, 31, 36, 40, 43, 47, 50] },
  { name: "Vietnamese First Language", group: "Languages", scaling: [19, 24, 29, 35, 40, 45, 50] },
  { name: "Korean (Second Language)", group: "Languages", scaling: [21, 29, 36, 42, 47, 51, 53] },
  { name: "Greek", group: "Languages", scaling: [24, 30, 35, 40, 44, 47, 50] },
  { name: "Arabic", group: "Languages", scaling: [20, 25, 30, 34, 39, 44, 50] },
  { name: "Hebrew", group: "Languages", scaling: [29, 35, 39, 43, 46, 48, 50] },
  { name: "Hindi", group: "Languages", scaling: [23, 30, 36, 42, 46, 50, 52] },
  { name: "Latin", group: "Languages", scaling: [35, 42, 46, 50, 53, 54, 55] },
  { name: "Punjabi", group: "Languages", scaling: [22, 28, 33, 39, 43, 47, 50] },
  { name: "Russian", group: "Languages", scaling: [23, 29, 34, 39, 44, 47, 50] },
  { name: "Serbian", group: "Languages", scaling: [22, 26, 31, 36, 40, 45, 50] },
  { name: "Sinhala", group: "Languages", scaling: [25, 30, 35, 39, 43, 47, 50] },
  { name: "Turkish", group: "Languages", scaling: [21, 25, 29, 34, 38, 43, 50] },
  { name: "Macedonian", group: "Languages", scaling: [21, 27, 32, 37, 42, 47, 51] },
  { name: "Persian", group: "Languages", scaling: [16, 20, 24, 29, 34, 40, 50] },
  { name: "Khmer", group: "Languages", scaling: [11, 17, 25, 34, 41, 47, 50] },
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

// Anchor raw scores that scaling[] is indexed against
const SCALING_ANCHORS = [20, 25, 30, 35, 40, 45, 50];

// Treat any of the four English options as satisfying an "English"
// prerequisite. The calculator uses this to pick the best English
// score for the Primary 4.
export function isEnglishSubject(name) {
  return ENGLISH_SUBJECTS.includes(name);
}

export function findSubject(name) {
  return VCE_SUBJECTS.find((s) => s.name === name) ?? null;
}

// Quick lookup for UI hints: scaled score at raw 30.
export function scalingAt30(subjectMeta) {
  return subjectMeta?.scaling?.[2] ?? 30;
}

// Piecewise-linear interpolation across the 2025 VTAC scaling
// anchor points. Below raw 20 we extrapolate linearly from (0, 0)
// to (20, scaling[0]). At and above raw 50 we return scaling[6]
// (which can exceed 50 for top-scaling subjects).
//
// scaling: 7-element array [scaled@20, ..., scaled@50]
export function rawToScaled(rawScore, scaling) {
  if (!Number.isFinite(rawScore) || rawScore <= 0) return 0;
  if (!Array.isArray(scaling) || scaling.length !== SCALING_ANCHORS.length) {
    return rawScore; // unknown subject: pass through unscaled
  }
  if (rawScore <= SCALING_ANCHORS[0]) {
    return (rawScore / SCALING_ANCHORS[0]) * scaling[0];
  }
  if (rawScore >= SCALING_ANCHORS[SCALING_ANCHORS.length - 1]) {
    return scaling[SCALING_ANCHORS.length - 1];
  }
  for (let i = 0; i < SCALING_ANCHORS.length - 1; i++) {
    const lo = SCALING_ANCHORS[i];
    const hi = SCALING_ANCHORS[i + 1];
    if (rawScore >= lo && rawScore <= hi) {
      const t = (rawScore - lo) / (hi - lo);
      return scaling[i] + t * (scaling[i + 1] - scaling[i]);
    }
  }
  return scaling[SCALING_ANCHORS.length - 1];
}

// Convenience: scale a {subject, score} pair using its subject's
// scaling table. Returns both the raw and scaled values plus the
// scaling table for UI use. Unknown subjects pass through unscaled.
export function scalePair({ subject, score }) {
  const meta = findSubject(subject);
  const scaled = rawToScaled(score, meta?.scaling);
  return {
    subject,
    rawScore: score,
    score: scaled,
    scaledScore: scaled,
    scaling: meta?.scaling ?? null,
  };
}
