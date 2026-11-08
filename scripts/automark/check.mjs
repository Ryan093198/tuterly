// Checks reviewed keys and new auto-markable questions.
//   node --import <reg.mjs> scripts/automark/check.mjs [keysFile|newFile ...]
// With no files, checks everything in content/automark. Prints problems
// and exits 1 if there are any.
import fs from "node:fs";
import path from "node:path";
const { keyProblems } = await import(path.resolve("lib/automark.js"));
const root = path.resolve("content/automark");
let files = process.argv.slice(2).map((f) => path.resolve(f));
if (!files.length) for (const sub of ["keys", "new"]) for (const f of fs.readdirSync(path.join(root, sub)).filter((f) => f.endsWith(".json"))) files.push(path.join(root, sub, f));
let bad = 0, nKeys = 0, nNull = 0, nNew = 0;
for (const f of files) {
  let d;
  try { d = JSON.parse(fs.readFileSync(f, "utf8")); } catch (e) { console.log(`${f}: not valid JSON: ${e.message}`); bad++; continue; }
  const isNew = f.includes(`${path.sep}new${path.sep}`) || Object.keys(d).some((k) => /^Year /.test(k));
  if (!isNew) {
    for (const [h, k] of Object.entries(d)) {
      if (k === null) { nNull++; continue; }
      nKeys++;
      for (const p of keyProblems(k)) { console.log(`${path.basename(f)} ${h}: ${p}`); bad++; }
    }
  } else {
    for (const [y, secs] of Object.entries(d)) for (const [code, items] of Object.entries(secs)) (items || []).forEach((it, i) => {
      nNew++;
      const at = `${path.basename(f)} ${y} ${code} #${i + 1}`;
      for (const fld of ["question", "answer", "solution", "key"]) if (!it[fld]) { console.log(`${at}: missing ${fld}`); bad++; }
      if (it.kind && !["short", "extended"].includes(it.kind)) { console.log(`${at}: kind must be short or extended`); bad++; }
      if (/—/.test(JSON.stringify(it))) { console.log(`${at}: em dash`); bad++; }
      for (const p of keyProblems(it.key)) { console.log(`${at}: ${p}`); bad++; }
    });
  }
}
console.log(`${nKeys} keys, ${nNull} paper-only, ${nNew} new questions, ${bad} problems`);
process.exit(bad ? 1 : 0);
