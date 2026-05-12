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
    topics: items.map((item) => {
      const fullDesc = item.desc;
      return {
        id: isVCE ? `${strand}::${item.topic}` : item.code,
        label: isVCE ? item.topic : shortLabel(fullDesc),
        desc: fullDesc,
        strand,
      };
    }),
  }));
}

// VCAA F-10 descriptors are long, comma-jointed sentences ("Solve simultaneous
// linear equations, using algebraic and graphical techniques including using
// digital tools"). In a dropdown they wrap or get truncated mid-clause, so
// we trim at the first qualifier connector to surface just the core action.
// The full descriptor is still sent to the model via the API's topic_id
// lookup, so trimming the display label doesn't degrade generation.
function shortLabel(desc) {
  if (!desc) return "";
  // Cut at the first connector that introduces an implementation-detail clause.
  // Tested against real VC2M10 descriptors — see curriculum.js.
  const re = /,\s+(?:using|including|by|with|to|such as|or using|where|growth|and including)\b|\s+(?:such as|—)\s+|\s+\((?=[A-Za-z])/i;
  const m = desc.match(re);
  let short = m && m.index > 20 ? desc.slice(0, m.index) : desc;
  // Backstop in case no connector matched and the descriptor is still long.
  // 80 chars fits the dropdown's visible width without needing browser
  // truncation, and is generous enough to keep most descriptors intact.
  if (short.length > 80) short = short.slice(0, 79).replace(/\s+\S*$/, "") + "…";
  return short.trim();
}
