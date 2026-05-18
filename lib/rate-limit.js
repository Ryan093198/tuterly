import { createAdminClient } from "@/lib/supabase-admin";

/**
 * Simple per-user rolling-window rate limit backed by Supabase.
 *
 * @param {string} userId - auth.users.id
 * @param {string} endpoint - short string identifying the route
 * @param {{ perDay?: number, perHour?: number, perMinute?: number }} limits
 * @returns {Promise<{ ok: true } | { ok: false, retryAfterSeconds: number, message: string }>}
 */
export async function checkRateLimit(userId, endpoint, limits = {}) {
  const { perDay, perHour = 60, perMinute = 10 } = limits;
  const admin = createAdminClient();

  const now = Date.now();
  const dayAgo = new Date(now - 24 * 60 * 60 * 1000).toISOString();
  const hourAgo = new Date(now - 60 * 60 * 1000).toISOString();
  const minuteAgo = new Date(now - 60 * 1000).toISOString();

  // Only query the daily window if the caller specified one. Most endpoints
  // don't need it and the extra COUNT is wasteful.
  const queries = [
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
  ];
  if (perDay != null) {
    queries.push(
      admin
        .from("api_rate_limits")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("endpoint", endpoint)
        .gte("called_at", dayAgo)
    );
  }
  const results = await Promise.all(queries);
  const hourCount = results[0].count ?? 0;
  const minuteCount = results[1].count ?? 0;
  const dayCount = perDay != null ? results[2].count ?? 0 : 0;

  if (perDay != null && dayCount >= perDay) {
    return {
      ok: false,
      retryAfterSeconds: 24 * 3600,
      message: `Daily limit reached (${perDay} requests/day). Try again tomorrow.`,
    };
  }
  if (hourCount >= perHour) {
    return {
      ok: false,
      retryAfterSeconds: 3600,
      message: `Hourly limit reached (${perHour} requests/hr). Try again in an hour.`,
    };
  }
  if (minuteCount >= perMinute) {
    return {
      ok: false,
      retryAfterSeconds: 60,
      message: `Slow down - ${perMinute} requests/min cap. Try again in a minute.`,
    };
  }

  // Log this call.
  await admin.from("api_rate_limits").insert({
    user_id: userId,
    endpoint,
  });

  return { ok: true };
}
