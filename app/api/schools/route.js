import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { searchSchools } from "@/lib/schools";

export const runtime = "nodejs";

export async function GET(request) {
  // Login-gate so we don't expose this list as a free public API. Cheap check;
  // the heavy work is the in-memory filter that follows.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const q = request.nextUrl.searchParams.get("q") || "";
  const stateFilter = (request.nextUrl.searchParams.get("state") || "")
    .trim()
    .toUpperCase();

  let results = searchSchools(q, 20);
  if (stateFilter) results = results.filter((s) => s.state === stateFilter);

  return NextResponse.json({ results });
}
