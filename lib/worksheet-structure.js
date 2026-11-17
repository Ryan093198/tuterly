// Questions per difficulty band for a worksheet of n questions:
// 6 -> 2/2/2, 9 -> 3/3/3, 10 -> 3/4/3, 3 -> 1/1/1.
export function bandSplit(n = 6) {
  const base = Math.floor(n / 3);
  const rem = n % 3;
  const f = base;
  const s = base + (rem >= 1 ? 1 : 0);
  const e = base + (rem >= 2 ? 1 : 0);
  return { count: n, foundation: [1, f], standard: [f + 1, f + s], extension: [f + s + 1, n] };
}

// Deterministic structure check for a generated worksheet (no model call).
// Returns a list of problems; empty means the layout is right.
export function worksheetStructureProblems(md, count = 6) {
  const problems = [];
  if (typeof md !== "string" || !md.trim()) return ["empty"];
  const plan = bandSplit(count);
  const nums = [...md.matchAll(/^\*\*Question (\d+)\*\*\s*$/gm)].map((m) => Number(m[1]));
  const want = Array.from({ length: count }, (_, i) => i + 1).join(",");
  if (nums.join(",") !== want) problems.push(`questions numbered ${nums.join(",") || "none"}`);
  const heads = [...md.matchAll(/^## (Foundation|Standard|Extension)\s*$/gm)].map((m) => [m[1], m.index]);
  if (heads.map((h) => h[0]).join(",") !== "Foundation,Standard,Extension") problems.push("section headings missing or out of order");
  else {
    const qAt = (n) => md.search(new RegExp(`^\\*\\*Question ${n}\\*\\*`, "m"));
    const [f, s, e] = heads.map((h) => h[1]);
    const inOrder = f < qAt(1) && qAt(plan.foundation[1]) < s && s < qAt(plan.standard[0]) && qAt(plan.standard[1]) < e && e < qAt(plan.extension[0]);
    if (!inOrder) problems.push("questions under the wrong headings");
  }
  const opens = (md.match(/<details>/g) || []).length;
  const closes = (md.match(/<\/details>/g) || []).length;
  if (opens !== count || closes !== count) problems.push(`${opens} solution blocks`);
  // More than one differing "Answer" line inside a solution.
  const blocks = md.split(/<details>/).slice(1).map((b) => b.split("</details>")[0]);
  blocks.forEach((b, i) => {
    const answers = [...b.matchAll(/\*\*Answer[:\s]*([^*\n]*)\*\*:?[ \t]*([^\n]*)/g)]
      .map((m) => (m[1].trim() || m[2].trim()).replace(/[\s.]+$/, ""))
      .filter(Boolean);
    if (new Set(answers).size > 1) problems.push(`question ${i + 1} states more than one answer`);
  });
  if (/\b(re-?examining|needs correction|corrected question|let me|recompute)\b/i.test(md)) problems.push("thinking out loud left in");
  return problems;
}
