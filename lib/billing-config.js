// Master switch for the credit/payout billing chain (phased MVP).
//
// While this is false (the default), the app behaves exactly as it does in the
// free pilot: sending a report never deducts a credit and never queues a tutor
// payout, and the parent/tutor credit UIs stay hidden. Flip BILLING_ENABLED to
// "true" (start with a Stripe TEST-mode environment) to turn the chain on.
//
// Keeping this server-only and env-driven means you can enable billing on a
// preview/test deployment and validate the whole flow before touching prod.
export function billingEnabled() {
  return process.env.BILLING_ENABLED === "true";
}

// Tuterly's commission on each tutor payout. Configurable so you can finalise
// the rate later without a code change; defaults to 15%.
export function commissionRate() {
  const raw = Number(process.env.TUTERLY_COMMISSION_RATE);
  if (Number.isFinite(raw) && raw >= 0 && raw < 1) return raw;
  return 0.15;
}
