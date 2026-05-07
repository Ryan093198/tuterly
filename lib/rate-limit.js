import { createAdminClient } from "@/lib/supabase-admin";

/**
 * Simple per-user rolling-window rate limit backed by Supabase.
 *
 * @param {string} userId — auth.users.id
 * @param {string} endpoint — short string identifying the route
 * @param {{ perHour?: number, perMinute?: number }} limits
 * @returns {Promise<{ ok: true } | { ok: false, retryAfterSeconds: number, message: string }>}
 */
export async function checkRateLimit(userId, endpoint, limits = {}) {
  const { perHour = 60, perMinute = 10 } = limits;
  const admin = createAdminClient();

  const now = Date.now();
  const hourAgo = new Date(now - 60 * 60 * 1000).toISOString();
  const minuteAgo = new Date(now - 60 * 1000).toISOString();

  const [{ count: hourCount }, { count: minuteCount }] = await Promise.all([
    admin
      .from("api_rate_limits")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("endpoint", endpoint)
      .gte("called_at", hourAgo),
    admin
      .from("api_rate_limits")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("endpoint", endpoint)
      .gte("called_at", minuteAgo),
  ]);

  if ((hourCount ?? 0) >= perHour) {
    return {
      ok: false,
      retryAfterSeconds: 3600,
      message: `Hourly limit reached (${perHour} requests/hr). Try again in an hour.`,
    };
  }
  if ((minuteCount ?? 0) >= perMinute) {
    return {
      ok: false,
      retryAfterSeconds: 60,
      message: `Slow down — ${perMinute} requests/min cap. Try again in a minute.`,
    };
  }

  // Log this call.
  await admin.from("api_rate_limits").insert({
    user_id: userId,
    endpoint,
  });

  return { ok: true };
}
