import Stripe from "stripe";

// Single shared Stripe client. Pin the API version so behaviour doesn't
// shift under us when Stripe updates defaults; bump intentionally when
// we want a new feature.
let cached = null;

export function stripe() {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY missing");
  cached = new Stripe(key, { apiVersion: "2024-10-28.acacia" });
  return cached;
}

export const PARENT_PLAN_PRICE_ID = () => {
  const id = process.env.STRIPE_PARENT_PRICE_ID;
  if (!id) throw new Error("STRIPE_PARENT_PRICE_ID missing");
  return id;
};

export const PARENT_PLAN_TRIAL_DAYS = 7;
