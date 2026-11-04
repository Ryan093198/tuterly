import { NextResponse, after } from "next/server";
import { yearTopicStatus, getOrCreateTopicTest } from "@/lib/topic-test";

export const runtime = "nodejs";
export const maxDuration = 300;

// GET /api/topic-test/prewrite?year=Year%207&key=CRON_SECRET
// Writes a year level's topic tests in advance, so parents never wait for
// one. Each call answers straight away with progress, writes the next
// missing test in the background, then calls itself for the one after, so
// opening the link once does the whole year (each test in its own run, well
// inside the 5-minute limit). Open it again any time to see progress; it
// won't start a second chain while a test is being written.
//   &status=1  progress only, writes nothing
//   &retry=1   also retry topics whose test failed

function authorized(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  if (request.headers.get("authorization") === `Bearer ${secret}`) return true;
  return new URL(request.url).searchParams.get("key") === secret;
}

export async function GET(request) {
  if (!authorized(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const url = new URL(request.url);
  const year = url.searchParams.get("year") || "";
  const list = await yearTopicStatus(year);
  if (!list) return NextResponse.json({ error: "year must be Year 7, Year 8, Year 9, Year 10 or Year 10A" }, { status: 400 });

  const done = list.filter((x) => x.done).map((x) => x.topic.label);
  const writing = list.filter((x) => x.writing).map((x) => x.topic.label);
  // A topic that failed is skipped (so the chain can't loop on it) unless
  // the link has &retry=1.
  const retry = url.searchParams.get("retry") === "1";
  const failed = list.filter((x) => x.failed).map((x) => x.topic.label);
  const todo = list.filter((x) => !x.done && !x.writing && (retry || !x.failed));
  const summary = { year, total: list.length, done: done.length, writing, remaining: todo.length + writing.length, failed };

  if (url.searchParams.get("status") === "1" || !todo.length || writing.length) {
    return NextResponse.json({
      ...summary,
      note: !todo.length && !writing.length ? "All written." : writing.length ? "Writing now. Refresh to see progress." : "Status only.",
    });
  }

  const next = todo[0].topic;
  after(async () => {
    try {
      await getOrCreateTopicTest(next);
    } catch (err) {
      console.error("[topic-test/prewrite]", year, next.label, err?.message || err);
    }
    // Hand on to a fresh run for the next topic. It replies at once (its
    // work happens in its own after()), so this run can finish.
    try {
      const nextUrl = new URL(request.url);
      nextUrl.searchParams.delete("status");
      nextUrl.searchParams.delete("retry");
      await fetch(nextUrl, { headers: { authorization: `Bearer ${process.env.CRON_SECRET}` } });
    } catch (err) {
      console.error("[topic-test/prewrite] chain failed", err?.message || err);
    }
  });

  return NextResponse.json({ ...summary, writing: [next.label], note: "Started. Each test takes a minute or two; refresh this page to see progress." });
}
