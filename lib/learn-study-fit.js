// How strongly a Learn article should point to Tuterly Study (Years 7 to 10
// maths only). Decided from the slug so it also works for new auto-written
// posts without anyone tagging them.
//
//   "full"  maths / NAPLAN numeracy / practice-test articles that cover
//           Years 7 to 10: inline CTA after the first third + end card
//   "soft"  everything else that isn't primary-only (English, science,
//           VCE, choosing a tutor...): one soft card at the end
//   "none"  primary-only and selective / scholarship articles: no app
//
// A post can override with `studyApp: full | soft | none` in frontmatter.
const PRIMARY_ONLY = /(^|-)(year-[3-6]|years?-3-6|year-4-6|year-5-6|primary)(-|$)|scholarship|selective|edutest/;
const MATHS = /math|naplan|algebra|practice-test|practice-maths|homework/;
const SENIOR = /^vce-|atar|year-1[12]|year-12/;

export function studyAppFit(post) {
  const override = (post?.studyApp || "").toLowerCase();
  if (["full", "soft", "none"].includes(override)) return override;
  const slug = post?.slug || "";
  if (PRIMARY_ONLY.test(slug) || post?.generator === "primary") return "none";
  if (SENIOR.test(slug)) return "soft";
  if (MATHS.test(slug)) return "full";
  return "soft";
}

// Split markdown roughly a third of the way in, at a block boundary, for the
// inline CTA. Prefers the start of a "## " section; never splits a list,
// table, quote or fenced code block. Returns [before, after] or null when
// the article is too short to split.
export function splitAtThird(markdown) {
  if (!markdown) return null;
  if (/```/.test(markdown)) return null;
  const blocks = markdown.split(/\n{2,}/);
  if (blocks.length < 6) return null;
  const total = markdown.length;
  const continues = (b) => /^\s*([-*+]\s|\d+[.)]\s|\||>|<)/.test(b);
  let fallback = -1;
  let acc = 0;
  for (let i = 0; i < blocks.length - 1; i++) {
    acc += blocks[i].length + 2;
    if (acc < total / 3) continue;
    if (acc > (total * 2) / 3) break;
    const next = blocks[i + 1];
    if (/^##\s/.test(next)) return join(blocks, i);
    if (fallback === -1 && !continues(next) && !continues(blocks[i]) && !/^#/.test(blocks[i])) fallback = i;
  }
  return fallback === -1 ? null : join(blocks, fallback);
}

function join(blocks, i) {
  return [blocks.slice(0, i + 1).join("\n\n"), blocks.slice(i + 1).join("\n\n")];
}
