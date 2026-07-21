import { createAdminClient } from "@/lib/supabase-admin";
import { trustedClientIp } from "@/lib/client-ip";

// Abuse protection for the public, unauthenticated forms — contact, enquiry,
// tutor-application (audit H2). Two cheap layers, no third-party dependency:
//
//   1. Honeypot: the forms render a visually-hidden field a human never fills.
//      If it arrives non-empty, it's a bot — we silently accept and drop.
//   2. Per-IP rate limit backed by public_request_log (service-role only).
//
// A CAPTCHA (e.g. Cloudflare Turnstile) is the natural next layer if abuse
// continues; it needs an account + keys so it's intentionally not wired here.

// Default hidden field name. Keep it plausible so bots fill it.
export const HONEYPOT_FIELD = "company_website";

export function isHoneypotTripped(body, field = HONEYPOT_FIELD) {
  const v = body?.[field];
  return typeof v === "string" && v.trim().length > 0;
}

// Returns { ok: true } or { ok: false, retryAfterSeconds }. Fails OPEN on a
// logging error (never block a legitimate enquiry because the log table hiccuped).
export async function checkPublicRateLimit(request, endpoint, limits = {}) {
  const { perMinute = 3, perHour = 10, perDay = 30 } = limits;
  const ip = trustedClientIp(request);
  // No trustworthy IP → can't key a limit; allow (the honeypot still applies).
  if (!ip) return { ok: true, ip: null };

  const admin = createAdminClient();
  const now = Date.now();
  const windows = [
    { since: new Date(now - 60 * 1000).toISOString(), max: perMinute, retry: 60 },
    { since: new Date(now - 60 * 60 * 1000).toISOString(), max: perHour, retry: 3600 },
    { since: new Date(now - 24 * 60 * 60 * 1000).toISOString(), max: perDay, retry: 24 * 3600 },
  ];

  try {
    for (const w of windows) {
      const { count } = await admin
        .from("public_request_log")
        .select("id", { count: "exact", head: true })
        .eq("ip", ip)
        .eq("endpoint", endpoint)
        .gte("created_at", w.since);
      if ((count ?? 0) >= w.max) {
        return { ok: false, retryAfterSeconds: w.retry, ip };
      }
    }
    // Record this request (reserve). Best-effort.
    await admin.from("public_request_log").insert({ ip, endpoint });
  } catch (e) {
    console.warn(`[public-form-guard] ${endpoint} limiter error:`, e?.message || e);
    return { ok: true, ip };
  }

  return { ok: true, ip };
}

// Convenience: run honeypot + rate limit. Returns a NextResponse-ready result
// { blocked: boolean, silent: boolean, retryAfterSeconds? }.
export async function guardPublicForm(request, body, endpoint, limits) {
  if (isHoneypotTripped(body)) {
    // Silent success — don't tell the bot why nothing happened.
    return { blocked: true, silent: true };
  }
  const rl = await checkPublicRateLimit(request, endpoint, limits);
  if (!rl.ok) {
    return { blocked: true, silent: false, retryAfterSeconds: rl.retryAfterSeconds };
  }
  return { blocked: false };
}
