import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isUnlocked } from "@/lib/mind-map-unlock";

export const runtime = "nodejs";

// GET /api/mind-maps/file/year-9/<slug>.pdf (or .png, or the booklet).
// Files live in mind-maps-files/ (not public/) and are only served once an
// email has unlocked them, or to a signed-in Tuterly Study student. Otherwise:
// back to the revision page to unlock.
const ROOT = path.join(process.cwd(), "mind-maps-files");
const TYPES = { pdf: "application/pdf", png: "image/png" };

// The Tuterly Study app has no cookie: a signed-in student sends their Supabase
// access token instead, and Supabase says whether it's valid. Anything else
// falls through to the usual email unlock.
const APP_URL = process.env.TUTERLY_APP_SUPABASE_URL || "https://iuiqiqtthmpvtxmirdam.supabase.co";
async function isAppStudent(request) {
  const token = /^Bearer\s+(\S+)$/i.exec(request.headers.get("authorization") || "")?.[1];
  const key = process.env.TUTERLY_APP_SUPABASE_ANON_KEY;
  if (!token || !key) return false;
  try {
    const r = await fetch(`${APP_URL}/auth/v1/user`, {
      headers: { apikey: key, Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    return r.ok;
  } catch {
    return false;
  }
}

export async function GET(request, { params }) {
  const parts = (await params).path || [];
  const rel = parts.join("/");
  const m = /^(year-\d+)\/([a-z0-9-]+)\.(pdf|png)$/.exec(rel);
  if (!m) return new NextResponse("Not found", { status: 404 });
  if (!isUnlocked(request) && !(await isAppStudent(request))) {
    const back = new URL(`/${m[1]}-maths-revision?unlock=1`, request.url);
    return NextResponse.redirect(back, 307);
  }
  try {
    const data = await readFile(path.join(ROOT, m[1], `${m[2]}.${m[3]}`));
    const download = new URL(request.url).searchParams.has("download");
    return new NextResponse(data, {
      headers: {
        "Content-Type": TYPES[m[3]],
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="tuterly-${m[1]}-${m[2]}.${m[3]}"`,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
