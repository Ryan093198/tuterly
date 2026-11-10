import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import { getWorkedExamples } from "@/lib/worked-examples";
import { mdToEmailHtml } from "@/lib/try-email";
import { appCta } from "@/lib/study-app";
import { SITE_URL } from "@/lib/site";

// Weekly worksheet email (app/api/cron/weekly-email). One topic a week per
// year level, rotating through that year's topic pages, with three checked
// questions from the topic page and a link to the full worksheet.
// No em dashes in copy. Links go through the click tracker.

export const WEEKLY_YEARS = ["Year 7", "Year 8", "Year 9", "Year 10", "Year 10A"];

// Monday of the current week (Melbourne), as YYYY-MM-DD.
export function weekOf(date = new Date()) {
  const melb = new Date(date.toLocaleString("en-US", { timeZone: "Australia/Melbourne" }));
  const day = (melb.getDay() + 6) % 7; // Monday = 0
  melb.setDate(melb.getDate() - day);
  const y = melb.getFullYear(), m = String(melb.getMonth() + 1).padStart(2, "0"), d = String(melb.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Topics for a year that have checked questions, in a stable order.
function topicsFor(yearLevel) {
  return WORKSHEET_LANDING_PAGES.filter((p) => p.yearLevel === yearLevel && getWorkedExamples(p.slug)?.examples?.length >= 3);
}

// Same topic for everyone in a year level in a given week, moving one topic
// on each week. Year 10A subscribers alternate Year 10 and 10A topics.
export function topicForWeek(yearLevel, week) {
  const n = Math.floor((Date.parse(week) - Date.parse("2026-01-05")) / (7 * 86_400_000));
  const pool = yearLevel === "Year 10A" ? (n % 2 ? topicsFor("Year 10A") : topicsFor("Year 10")) : topicsFor(yearLevel);
  if (!pool.length) return null;
  return pool[((n % pool.length) + pool.length) % pool.length];
}

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const btn = (href, label, dark = true) =>
  `<a href="${href}" style="display:inline-block;background:${dark ? "#0e7490" : "#ffffff"};color:${dark ? "#ffffff" : "#0e7490"};border:2px solid #0e7490;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px;">${esc(label)}</a>`;

// Builds the email for one subscriber. track(path) wraps a site path in the
// click tracker; pixel and unsubscribe are full URLs.
export function buildWeeklyEmail({ page, yearLevel, track, pixelUrl, unsubscribeUrl }) {
  const w = getWorkedExamples(page.slug);
  const qs = w.examples.slice(0, 3).map((e) => e.question);
  const topic = page.topic;
  const topicPath = `/worksheets/${page.slug}?utm_source=weekly&utm_medium=email&utm_campaign=weekly_worksheet`;
  const cta = appCta();
  const appPath = `${cta.href}${cta.href.includes("?") ? "&" : "?"}utm_source=weekly&utm_medium=email&utm_campaign=weekly_app`;

  const subject = `This week's free ${page.yearLevel} worksheet: ${topic}`;
  const questions = qs
    .map((q, i) => `<div style="margin:0 0 14px;padding:14px 16px;border:1px solid #e4e4e7;border-radius:12px;background:#ffffff;"><p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#0e7490;">Question ${i + 1}</p>${mdToEmailHtml(q)}</div>`)
    .join("");

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:#f4f7fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#18181b;">
<div style="max-width:560px;margin:0 auto;padding:28px 20px;">
  <div style="font-size:20px;font-weight:800;margin-bottom:20px;color:#0b1a2c;">tuterly</div>
  <p style="margin:0 0 6px;font-size:13px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:#0e7490;">${esc(page.yearLevel)} maths · this week</p>
  <h1 style="margin:0 0 10px;font-size:24px;line-height:1.25;color:#0b1a2c;">${esc(topic)}</h1>
  <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#3f3f46;">Here are three ${esc(page.yearLevel)} questions on ${esc(topic.toLowerCase())} to try this week. The answers and full worked solutions are on the worksheet page, with a fresh worksheet of six more.</p>
  ${questions}
  <p style="margin:6px 0 26px;">${btn(track(topicPath), "See the answers and the full worksheet")}</p>
  <div style="padding:18px 20px;border-radius:14px;background:#e6f6fa;">
    <p style="margin:0 0 6px;font-size:16px;font-weight:800;color:#0b1a2c;">Got one wrong? That's the useful part.</p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#27272a;">With the Tuterly app, your child snaps any maths question they got wrong, from homework, a textbook or a test. Tuterly shows the worked solution, then writes fresh questions on the same idea until it's mastered.${cta.live ? "" : " It's coming soon on iPhone: sign up now to hear when it launches."}</p>
    <p style="margin:0;">${btn(track(appPath), cta.live ? "Download Tuterly" : cta.label, false)}</p>
  </div>
  <p style="margin:28px 0 6px;font-size:12px;line-height:1.6;color:#71717a;">You're getting this because you asked for a free weekly worksheet at tuterly.com.au. <a href="${unsubscribeUrl}" style="color:#71717a;">Unsubscribe</a> with one click, any time.</p>
  <p style="margin:0;font-size:12px;line-height:1.6;color:#a1a1aa;">Tuterly by Bayside Academics · 240 Bay Street, Brighton VIC 3186 · <a href="${SITE_URL}" style="color:#a1a1aa;">tuterly.com.au</a></p>
  <img src="${pixelUrl}" width="1" height="1" alt="" style="display:block;border:0;">
</div></body></html>`;

  const text = [
    `${page.yearLevel} maths this week: ${topic}`,
    "",
    ...qs.map((q, i) => `Question ${i + 1}: ${q.replace(/\$+/g, "")}`),
    "",
    `Answers and the full worksheet: ${track(topicPath)}`,
    "",
    `Got one wrong? Tuterly turns it into practice until it's mastered: ${track(appPath)}`,
    "",
    `Unsubscribe: ${unsubscribeUrl}`,
    "Tuterly by Bayside Academics, 240 Bay Street, Brighton VIC 3186",
  ].join("\n");

  return { subject, html, text };
}
