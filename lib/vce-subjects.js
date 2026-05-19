// VCE Unit 3/4 subjects available in the ATAR planner subject picker.
// Grouped so the dropdown can show categories rather than one flat list.
// English variants are flagged so the calculator can enforce the
// "must include one English" rule.

export const ENGLISH_SUBJECTS = [
  "English",
  "EAL (English as an Additional Language)",
  "English Language",
  "Literature",
];

export const VCE_SUBJECTS = [
  // Maths
  { name: "Mathematical Methods", group: "Maths" },
  { name: "Specialist Mathematics", group: "Maths" },
  { name: "General Mathematics", group: "Maths" },
  { name: "Foundation Mathematics", group: "Maths" },

  // English (any one counts toward the Primary 4)
  { name: "English", group: "English", isEnglish: true },
  { name: "EAL (English as an Additional Language)", group: "English", isEnglish: true },
  { name: "English Language", group: "English", isEnglish: true },
  { name: "Literature", group: "English", isEnglish: true },

  // Sciences
  { name: "Chemistry", group: "Science" },
  { name: "Physics", group: "Science" },
  { name: "Biology", group: "Science" },
  { name: "Psychology", group: "Science" },
  { name: "Environmental Science", group: "Science" },

  // Health
  { name: "Health and Human Development", group: "Health" },
  { name: "Physical Education", group: "Health" },

  // Humanities
  { name: "Business Management", group: "Business" },
  { name: "Accounting", group: "Business" },
  { name: "Economics", group: "Business" },
  { name: "Legal Studies", group: "Humanities" },
  { name: "History: Revolutions", group: "Humanities" },
  { name: "Australian and Global Politics", group: "Humanities" },
  { name: "Geography", group: "Humanities" },
  { name: "Sociology", group: "Humanities" },
  { name: "Philosophy", group: "Humanities" },
  { name: "Religion and Society", group: "Humanities" },

  // Media / Arts
  { name: "Media", group: "Arts" },
  { name: "Studio Arts", group: "Arts" },
  { name: "Visual Communication Design", group: "Arts" },
  { name: "Art Making and Exhibiting", group: "Arts" },
  { name: "Music Performance", group: "Arts" },
  { name: "Music Repertoire Performance", group: "Arts" },
  { name: "Theatre Studies", group: "Arts" },
  { name: "Drama", group: "Arts" },
  { name: "Dance", group: "Arts" },

  // Technology
  { name: "Algorithmics (HESS)", group: "Technology" },
  { name: "Applied Computing: Software Development", group: "Technology" },
  { name: "Applied Computing: Data Analytics", group: "Technology" },
  { name: "Systems Engineering", group: "Technology" },
  { name: "Product Design and Technology", group: "Technology" },
  { name: "Food Studies", group: "Technology" },

  // Languages (a representative subset - VCAA offers ~45 languages)
  { name: "French", group: "Languages" },
  { name: "Italian", group: "Languages" },
  { name: "German", group: "Languages" },
  { name: "Spanish", group: "Languages" },
  { name: "Chinese (Second Language)", group: "Languages" },
  { name: "Japanese (Second Language)", group: "Languages" },
  { name: "Indonesian (Second Language)", group: "Languages" },
  { name: "Vietnamese", group: "Languages" },
  { name: "Greek", group: "Languages" },
  { name: "Arabic", group: "Languages" },
  { name: "Korean", group: "Languages" },
  { name: "Latin", group: "Languages" },
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
