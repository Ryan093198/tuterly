// Post-processor for generated reports. Models love em dashes - they're
// one of the top "this was written by AI" tells. The prompt forbids them
// explicitly, but a single residual em dash undoes the human-voice work.
// This module sweeps any that slip through, replacing each with a comma
// (which preserves the rhythm in 95% of cases). Hyphens (-) and minus
// signs in math are untouched.
//
// Math blocks (`$...$` and `$$...$$`) are preserved verbatim - KaTeX
// content can contain literal `-` in rare cases (text-mode strings) and
// we shouldn't second-guess it.

export function stripEmDashes(md) {
  if (!md || typeof md !== "string") return md;

  const out = [];
  const n = md.length;
  let i = 0;

  while (i < n) {
    const ch = md[i];

    // Pass through fenced code blocks.
    if (ch === "`" && md.startsWith("```", i)) {
      const end = md.indexOf("```", i + 3);
      const stop = end === -1 ? n : end + 3;
      out.push(md.slice(i, stop));
      i = stop;
      continue;
    }

    // Pass through inline code.
    if (ch === "`") {
      const end = md.indexOf("`", i + 1);
      const stop = end === -1 ? n : end + 1;
      out.push(md.slice(i, stop));
      i = stop;
      continue;
    }

    // Pass through display math.
    if (ch === "$" && md[i + 1] === "$") {
      const end = md.indexOf("$$", i + 2);
      const stop = end === -1 ? n : end + 2;
      out.push(md.slice(i, stop));
      i = stop;
      continue;
    }

    // Pass through inline math (unescaped $...$). Use a one-line lookahead
    // so we don't gobble multi-paragraph chunks if a $ is unbalanced.
    if (ch === "$" && md[i - 1] !== "\\") {
      let j = i + 1;
      while (j < n && md[j] !== "\n") {
        if (md[j] === "$" && md[j - 1] !== "\\") break;
        j++;
      }
      if (j < n && md[j] === "$") {
        out.push(md.slice(i, j + 1));
        i = j + 1;
        continue;
      }
    }

    // Em dash in prose - replace with comma + space, collapsing any
    // surrounding spaces so we don't end up with double spaces.
    if (ch === "-") {
      // Trim trailing space already in out.
      while (out.length && out[out.length - 1] === " ") out.pop();
      out.push(",");
      // Eat the em dash and any following spaces, we'll add exactly one back.
      i++;
      while (i < n && md[i] === " ") i++;
      out.push(" ");
      continue;
    }

    out.push(ch);
    i++;
  }

  return out.join("");
}
