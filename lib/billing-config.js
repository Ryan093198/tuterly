// Master switch for the credit/payout billing chain (phased MVP).
//
// While this is false (the default), the app behaves exactly as it does in the
// free pilot: sending a report never deducts a credit and never queues a tutor
// payout, and the parent/tutor credit UIs stay hidden. Flip BILLING_ENABLED to
// "true" (start with a Stripe TEST-mode environment) to turn the chain on.
export function billingEnabled() {
  return process.env.BILLING_ENABLED === "true";
}

// Tutor pay model (managed marketplace): a base hourly wage PLUS superannuation
// on top. Both are configurable via env so you can adjust without a code change.
// The per-tutor rate on profiles.hourly_rate overrides this base, so standout
// tutors can be paid more (e.g. $40-45) while $35 stays the default floor.
export function tutorBaseRate() {
  const raw = Number(process.env.TUTOR_BASE_RATE);
  return Number.isFinite(raw) && raw > 0 ? raw : 35;
}

// Australian Super Guarantee rate — 12% since 1 July 2025. Paid on top of the
// wage into the tutor's super fund, not to the tutor directly. Override via
// SUPER_RATE if the rate changes; confirm the treatment with your accountant.
export function superRate() {
  const raw = Number(process.env.SUPER_RATE);
  return Number.isFinite(raw) && raw >= 0 && raw < 1 ? raw : 0.12;
}
