import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

// Only honour same-origin relative redirect targets (audit L1) — reject
// absolute / protocol-relative `next` values to prevent an open redirect.
function safeNext(next) {
  return typeof next === "string" &&
    next.startsWith("/") &&
    !next.startsWith("//")
    ? next
    : "/dashboard";
}

export async function GET(request) {
  const url = new URL(request.url);
  const token_hash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const next = safeNext(url.searchParams.get("next"));

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      return NextResponse.redirect(new URL(next, url.origin));
    }
  }

  return NextResponse.redirect(new URL("/?error=confirm", url.origin));
}
