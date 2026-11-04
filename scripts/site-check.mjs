// Daily check of the live site's sign-up paths (.github/workflows/site-check.yml).
// Opens real pages in a real browser and clicks through them, with every
// request that would save or send something faked, so nothing real happens:
// no sign-ups, no worksheets written, no emails. Catches the kind of bug
// that hid from 28 Oct to 4 Nov 2026 (the worksheet email box reopening
// empty instead of making the worksheet).
// Usage: node scripts/site-check.mjs [https://www.tuterly.com.au]
import { createRequire } from "node:module";
// require() so a globally installed Playwright works too (the workflow installs it).
const { chromium } = createRequire(import.meta.url)("playwright");

const BASE = (process.argv[2] || "https://www.tuterly.com.au").replace(/\/$/, "");
const TOPIC_PAGE = "/worksheets/year-7-integers";
const fails = [];
const ok = (name) => console.log(`✓ ${name}`);
const fail = (name, why) => { fails.push(`${name}: ${why}`); console.log(`✗ ${name}: ${why}`); };

async function step(name, fn) {
  try { await fn(); ok(name); } catch (e) { fail(name, String(e?.message || e).split("\n")[0].slice(0, 300)); }
}

const json = (body, status = 200) => ({ status, contentType: "application/json", body: JSON.stringify(body) });
const FAKE_WORKSHEET = { content: "## Practice\n\n**Question 1**\n\nCalculate $-3 + 8$.", year_level: "Year 7", topic_label: "Integers" };

const browser = await chromium.launch();
async function page({ generate = json(FAKE_WORKSHEET), fresh = true } = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } });
  const p = await ctx.newPage();
  if (!fresh) await p.addInitScript(() => { localStorage.setItem("tuterly:worksheet_email", "sitecheck@example.com"); localStorage.setItem("tuterly:worksheet_year", "Year 7"); });
  await p.route("**/api/worksheets/email", (r) => r.fulfill(json({ ok: true })));
  await p.route("**/api/worksheets/generate", (r) => r.fulfill(generate));
  await p.route("**/api/topic-test/request", (r) => r.fulfill(json({ ok: true })));
  await p.route("**/api/study-waitlist", (r) => r.fulfill(json({ ok: true })));
  await p.goto(BASE + TOPIC_PAGE, { waitUntil: "networkidle", timeout: 60_000 });
  return { p, ctx };
}

// 1. Pages load.
for (const path of ["/", "/worksheets", TOPIC_PAGE, "/worksheets/year-8", "/year-9-maths-test"]) {
  await step(`page ${path} loads`, async () => {
    const res = await fetch(BASE + path);
    if (res.status !== 200) throw new Error(`status ${res.status}`);
  });
}

// 2. First visit: email box, then the worksheet appears (the 28 Oct bug).
await step("new visitor: email box leads to a worksheet", async () => {
  const { p, ctx } = await page();
  await p.getByRole("button", { name: "Generate worksheet" }).first().click();
  const dialog = p.getByText("Unlock your free worksheet");
  await dialog.waitFor({ timeout: 10_000 });
  await p.locator("input[type=email]").first().fill("sitecheck@example.com");
  await p.getByRole("button", { name: "Generate worksheet" }).last().click();
  await p.getByText("Your worksheet is ready").first().waitFor({ timeout: 15_000 });
  if (await dialog.isVisible()) throw new Error("email box still open after submitting");
  await ctx.close();
});

// 3. Free limit reached: the topic test offer appears and sends.
await step("free limit: topic test offer works", async () => {
  const { p, ctx } = await page({ fresh: false, generate: json({ rate_limited: true, error: "limit" }, 429) });
  await p.getByRole("button", { name: "Generate worksheet" }).first().click();
  const offer = p.locator("[data-study-cta=worksheet_limit_test]");
  await offer.waitFor({ timeout: 15_000 });
  await offer.getByRole("button").click();
  await offer.getByRole("status").waitFor({ timeout: 10_000 });
  await ctx.close();
});

// 4. Topic page: sample questions and the "get the full test" form.
await step("topic page: test sample and email form work", async () => {
  const { p, ctx } = await page();
  const sec = p.locator("#topic-test");
  await sec.waitFor({ timeout: 10_000 });
  const qs = await sec.getByText(/^Question \d$/).count();
  if (qs < 4) throw new Error(`only ${qs} sample questions showing`);
  if (await sec.locator(".katex-error").count()) throw new Error("maths not rendering in the sample");
  await sec.locator("input[type=email]").fill("sitecheck@example.com");
  await sec.getByRole("button").click();
  await sec.getByRole("status").waitFor({ timeout: 10_000 });
  await ctx.close();
});

// 5. The sign-up endpoints are up (an invalid email is refused, nothing saved).
for (const path of ["/api/worksheets/email", "/api/topic-test/request", "/api/study-waitlist"]) {
  await step(`endpoint ${path} answers`, async () => {
    const res = await fetch(BASE + path, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "not-an-email" }) });
    if (res.status !== 400) throw new Error(`expected 400 for a bad email, got ${res.status}`);
  });
}

await browser.close();
console.log(fails.length ? `\n${fails.length} check(s) failed` : "\nAll checks passed");
if (process.env.GITHUB_STEP_SUMMARY && fails.length) {
  const fs = await import("node:fs");
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `## Site check failed\n\n${fails.map((f) => `- ${f}`).join("\n")}\n`);
  fs.writeFileSync("site-check-failures.md", fails.map((f) => `- ${f}`).join("\n"));
}
process.exit(fails.length ? 1 : 0);
