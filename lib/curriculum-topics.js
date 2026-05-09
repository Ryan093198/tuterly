import { getCurriculumForStudent } from "@/lib/curriculum";

// Flatten a level's curriculum into a UI-friendly { strand, topics[] } list
// for the practice-question topic picker. VCAA F-10 entries are keyed by
// `code` and use `desc` as the human label; VCE entries already carry a
// `topic` short-name.
//
// `id` is the value sent back to the API. The API doesn't actually need to
// resolve the id back to the curriculum entry — we also send `label` and
// `level` — but a stable id makes a future "regenerate same topic" cheap.

/**
 * @param {string} level — year level or VCE study key (matches lib/curriculum.js)
 * @param {'maths' | 'english'} subject
 * @param {string[] | null} subjects — student.subjects, used to pick up VCE
 *   study designs even when `level` is a generic year (e.g. "Year 11").
 */
export function getTopicGroupsForLevel(level, subject = "maths", subjects = null) {
  const lookup = getCurriculumForStudent(level, subjects ?? [level], subject);
  if (!lookup) return [];
  const isVCE = lookup.isVCE;

  return Object.entries(lookup.curriculum).map(([strand, items]) => ({
    strand,
    topics: items.map((item) => ({
      id: isVCE ? `${strand}::${item.topic}` : item.code,
      label: isVCE ? item.topic : item.desc,
      desc: isVCE ? item.desc : item.desc,
      strand,
    })),
  }));
}
