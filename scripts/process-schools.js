// One-off script to convert the ACARA "Australian Schools List" Excel export
// into the JSON we serve from the schools autocomplete API.
//
// Run: `node scripts/process-schools.js`
// Reads:  australian-schools/australian-schools.xlsx (committed manually by ops)
// Writes: lib/schools/australian-schools.json (committed)

const fs = require("node:fs");
const path = require("node:path");
const XLSX = require("xlsx");

const SOURCE = path.join(
  __dirname,
  "..",
  "australian-schools",
  "australian-schools.xlsx"
);
const OUT_DIR = path.join(__dirname, "..", "lib", "schools");
const OUT_FILE = path.join(OUT_DIR, "australian-schools.json");

const SECTOR_MAP = {
  Gov: "government",
  Cath: "catholic",
  Ind: "independent",
};

function main() {
  const wb = XLSX.readFile(SOURCE);
  const ws = wb.Sheets[wb.SheetNames[0]];
  // First row of the sheet is the actual header. Skip the workbook's title row.
  const rows = XLSX.utils.sheet_to_json(ws, { defval: null, range: 1 });

  const out = [];
  for (const r of rows) {
    if (r.Status !== "Open") continue;
    const name = (r["School Name"] || "").toString().trim();
    if (!name) continue;
    out.push({
      id: String(r["ACARA ID"]),
      name,
      suburb: (r.Suburb || "").toString().trim() || null,
      state: (r.State || "").toString().trim() || null,
      postcode: (r.Postcode || "").toString().trim() || null,
      type: r.Type || null,
      sector: SECTOR_MAP[r.Sector] || (r.Sector ? r.Sector.toLowerCase() : null),
    });
  }

  // Sort alphabetically — suggestion ranking happens at query time, this just
  // makes the file diff-friendly.
  out.sort((a, b) => a.name.localeCompare(b.name));

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(out));

  const states = Object.fromEntries(
    Object.entries(
      out.reduce((acc, s) => {
        acc[s.state || "?"] = (acc[s.state || "?"] || 0) + 1;
        return acc;
      }, {})
    ).sort(([, a], [, b]) => b - a)
  );

  console.log(`Wrote ${out.length} schools to ${path.relative(process.cwd(), OUT_FILE)}`);
  console.log("By state:", states);
  console.log("First 3:", out.slice(0, 3));
}

main();
