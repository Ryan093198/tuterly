import { getCurriculumForStudent } from "@/lib/curriculum";

// Flatten a level's curriculum into a UI-friendly { strand, topics[] } list
// for the practice-question topic picker. VCAA F-10 entries are keyed by
// `code` and use `desc` as the human label; VCE entries already carry a
// `topic` short-name.
//
// `id` is the value sent back to the API. The API doesn't actually need to
// resolve the id back to the curriculum entry - we also send `label` and
// `level` - but a stable id makes a future "regenerate same topic" cheap.

/**
 * @param {string} level - year level or VCE study key (matches lib/curriculum.js)
 * @param {'maths' | 'english'} subject
 * @param {string[] | null} subjects - student.subjects, used to pick up VCE
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
  // Cut at the first qualifier connector that introduces an implementation
  // detail clause - but only past 30 chars, so we keep the verb phrase. We
  // iterate matches so an early "involving" or "to" at the start of a
  // descriptor doesn't disqualify a perfectly good later cut.
  const re = /\s+(?:using|including|with|by|such as|or using|involving|that use|where|to solve for|and including|that comply)\b/gi;
  let short = desc;
  let m;
  while ((m = re.exec(desc)) !== null) {
    if (m.index >= 30) {
      short = desc.slice(0, m.index);
      break;
    }
  }
  // Strip any leftover trailing comma from "X, including Y" patterns.
  short = short.replace(/,\s*$/, "");
  // Hard backstop. The dropdown looks tidy up to ~70 chars; beyond that we
  // cut at the last word boundary and drop trailing function words so we
  // don't end on "and" / "to" / "of".
  if (short.length > 70) {
    short = short.slice(0, 70).replace(/\s+\S*$/, "");
    short = short.replace(/[,;:]?\s+(?:and|or|but|to|of|the|a|an|in|on|for|with|by)$/i, "");
    short += "…";
  }
  return short.trim();
}
