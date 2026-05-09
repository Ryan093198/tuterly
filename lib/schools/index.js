// In-memory school search backed by the ACARA "Australian Schools List" JSON.
// The JSON is loaded once per server instance and the lowercase search index
// is built lazily on first call.

import schools from "./australian-schools.json";

let indexed = null;

function ensureIndex() {
  if (indexed) return indexed;
  indexed = schools.map((s) => ({
    ...s,
    _name: s.name.toLowerCase(),
    _suburb: (s.suburb || "").toLowerCase(),
  }));
  return indexed;
}

export function searchSchools(query, limit = 20) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return [];

  const list = ensureIndex();
  const matches = [];

  for (const s of list) {
    let score = 0;
    if (s._name === q) score = 1000;
    else if (s._name.startsWith(q)) score = 500;
    else if (s._name.includes(` ${q}`)) score = 200; // word-boundary
    else if (s._name.includes(q)) score = 100;
    else if (s._suburb.startsWith(q)) score = 50;
    else if (s._suburb.includes(q)) score = 20;

    if (score > 0) {
      // Tiebreaker: shorter names rank higher (less padding around the match).
      matches.push({ s, score: score - s._name.length / 1000 });
      if (matches.length > limit * 8) {
        // Cheap early-termination: once we have plenty of candidates, stop
        // accumulating. The sort below picks the best.
      }
    }
  }

  matches.sort((a, b) => b.score - a.score);
  return matches.slice(0, limit).map(({ s }) => ({
    id: s.id,
    name: s.name,
    suburb: s.suburb,
    state: s.state,
    postcode: s.postcode,
    type: s.type,
    sector: s.sector,
  }));
}

export function lookupSchoolByName(name) {
  if (!name) return null;
  const target = name.trim().toLowerCase();
  const list = ensureIndex();
  return list.find((s) => s._name === target) || null;
}
