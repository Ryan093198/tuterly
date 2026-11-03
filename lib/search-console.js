import crypto from "node:crypto";

// Google Search Console, read-only, for the weekly organic search report
// (app/api/cron/search-console). No Google SDK: a service account signs a
// short JWT, Google swaps it for an access token, and we call the
// Search Analytics REST endpoint directly.
//
// Setup (Nov 2026): service account tuterly-reader@tuterly-495402 in the
// "Tuterly" Google Cloud project (admin@baysideacademics.com.au), added to the
// tuterly.com.au Search Console property as a Restricted (read-only) user.
// Its JSON key lives ONLY in the Vercel env var GSC_SERVICE_ACCOUNT_JSON
// (paste the whole file; base64 of it also works). Never commit it.

const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
export const GSC_SITE = process.env.GSC_SITE_URL || "https://www.tuterly.com.au/";

function credentials() {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("GSC_SERVICE_ACCOUNT_JSON is not set");
  const text = raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
  const c = JSON.parse(text);
  if (!c.client_email || !c.private_key) throw new Error("GSC_SERVICE_ACCOUNT_JSON is missing client_email or private_key");
  return { email: c.client_email, key: c.private_key.replace(/\\n/g, "\n") };
}

const b64url = (v) => Buffer.from(typeof v === "string" ? v : JSON.stringify(v)).toString("base64url");

let cached = null; // { token, exp }
async function accessToken() {
  if (cached && cached.exp > Date.now() + 60_000) return cached.token;
  const { email, key } = credentials();
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64url({ alg: "RS256", typ: "JWT" })}.${b64url({
    iss: email, scope: SCOPE, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600,
  })}`;
  const sig = crypto.createSign("RSA-SHA256").update(unsigned).sign(key).toString("base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${sig}` }),
  });
  const d = await res.json().catch(() => ({}));
  if (!res.ok || !d.access_token) throw new Error(`Google token error: ${d.error_description || d.error || res.status}`);
  cached = { token: d.access_token, exp: Date.now() + (d.expires_in || 3600) * 1000 };
  return cached.token;
}

// rows: [{ keys: [..], clicks, impressions, ctr, position }]
export async function searchAnalytics({ startDate, endDate, dimensions, rowLimit = 1000, filters }) {
  const token = await accessToken();
  const body = { startDate, endDate, dimensions, rowLimit, dataState: "final" };
  if (filters) body.dimensionFilterGroups = [{ filters }];
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`,
    { method: "POST", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" }, body: JSON.stringify(body) }
  );
  const d = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Search Console error ${res.status}: ${d?.error?.message || "unknown"}`);
  return d.rows || [];
}

// YYYY-MM-DD in Melbourne, `daysAgo` days before today. Search Console data
// lags about 2 to 3 days, so reports end 3 days back.
export function melbDate(daysAgo = 0) {
  const d = new Date(Date.now() - daysAgo * 86_400_000);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Melbourne" }).format(d);
}
