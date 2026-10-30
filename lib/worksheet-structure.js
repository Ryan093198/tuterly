// Deterministic structure check for a generated worksheet (no model call).
// Returns a list of problems; empty means the layout is right.
export function worksheetStructureProblems(md) {
  const problems = [];
  if (typeof md !== "string" || !md.trim()) return ["empty"];
  const nums = [...md.matchAll(/^\*\*Question (\d+)\*\*\s*$/gm)].map((m) => Number(m[1]));
  if (nums.join(",") !== "1,2,3,4,5,6") problems.push(`questions numbered ${nums.join(",") || "none"}`);
  const heads = [...md.matchAll(/^## (Foundation|Standard|Extension)\s*$/gm)].map((m) => [m[1], m.index]);
  if (heads.map((h) => h[0]).join(",") !== "Foundation,Standard,Extension") problems.push("section headings missing or out of order");
  else {
    const qAt = (n) => md.search(new RegExp(`^\\*\\*Question ${n}\\*\\*`, "m"));
    const [f, s, e] = heads.map((h) => h[1]);
    const inOrder = f < qAt(1) && qAt(2) < s && s < qAt(3) && qAt(4) < e && e < qAt(5);
    if (!inOrder) problems.push("questions under the wrong headings");
  }
  const opens = (md.match(/<details>/g) || []).length;
  const closes = (md.match(/<\/details>/g) || []).length;
  if (opens !== 6 || closes !== 6) problems.push(`${opens} solution blocks`);
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
