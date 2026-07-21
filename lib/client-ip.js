// Trusted client-IP resolution for rate limiting (audit C8).
//
// The old implementation trusted the LEFTMOST value of x-forwarded-for, which
// the caller fully controls (the platform appends the real hop after it). That
// let anyone defeat the per-IP worksheet cap by rotating a random XFF header —
// unbounded, unauthenticated AI spend.
//
// On Vercel the reliable, platform-set signals are `x-real-ip` and
// `x-vercel-forwarded-for` (Vercel overwrites these; a client cannot forge
// them). We prefer those. Only as a last resort do we read x-forwarded-for, and
// then the RIGHTMOST entry — the hop closest to the platform, which the client
// cannot control — never the leftmost.
export function trustedClientIp(request) {
  const realIp = request.headers.get("x-real-ip");
  if (realIp && realIp.trim()) return realIp.trim();

  const vercelFwd = request.headers.get("x-vercel-forwarded-for");
  if (vercelFwd && vercelFwd.trim()) {
    const parts = vercelFwd.split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }

  const fwd = request.headers.get("x-forwarded-for");
  if (fwd && fwd.trim()) {
    const parts = fwd.split(",").map((s) => s.trim()).filter(Boolean);
    // Rightmost = closest to the platform, hardest to spoof.
    if (parts.length) return parts[parts.length - 1];
  }

  return null;
}
