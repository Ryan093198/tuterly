// Renders every mind map to public/mind-maps/<year>/<slug>.png and .pdf
// using local Google Chrome (headless). No API calls, no cost.
//
//   npm run build && npx next start -p 3131   (in another terminal)
//   node scripts/render-mind-maps.mjs [http://localhost:3131]
//
// It reads the list from /api/mind-maps on that server, so new maps are
// picked up automatically. Commit the files it writes.
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";

const BASE = process.argv[2] || "http://localhost:3131";
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = path.join(process.cwd(), "public");

const { maps, booklets } = await (await fetch(`${BASE}/api/mind-maps`)).json();
for (const m of maps) {
  const sheet = `${BASE}${m.sheet}`;
  const png = path.join(OUT, new URL(m.png).pathname);
  const pdf = path.join(OUT, new URL(m.pdf).pathname);
  mkdirSync(path.dirname(png), { recursive: true });
  const common = ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--virtual-time-budget=8000"];
  // 2x: crisp enough to zoom into on a phone (3360 x 2376).
  execFileSync(CHROME, [...common, "--force-device-scale-factor=2", "--window-size=1680,1188", `--screenshot=${png}`, sheet], { stdio: "ignore" });
  execFileSync(CHROME, [...common, "--no-pdf-header-footer", `--print-to-pdf=${pdf}`, `${sheet}?pdf=1`], { stdio: "ignore" });
  console.log(`Year ${m.year} ch${m.chapter}: ${path.relative(process.cwd(), png)}, .pdf`);
}

// One booklet per year: every chapter's PDF in order (needs pdfunite, from
// poppler: brew install poppler).
for (const b of booklets) {
  const pdfs = maps.filter((m) => m.year === b.year).sort((a, c) => a.chapter - c.chapter).map((m) => path.join(OUT, new URL(m.pdf).pathname));
  const out = path.join(OUT, new URL(b.pdf).pathname);
  execFileSync("pdfunite", [...pdfs, out]);
  console.log(`Year ${b.year} booklet: ${path.relative(process.cwd(), out)} (${pdfs.length} pages)`);
}
