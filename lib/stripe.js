import Stripe from "stripe";

// Single shared Stripe client. Pin the API version so behaviour doesn't
// shift under us when Stripe updates defaults; bump intentionally when
// we want a new feature.
//
// Exported in two forms:
//   - `stripe()` callable, lazy-initialised (existing imports continue
//     to work). Construction is deferred so the module can be imported
//     in build environments where STRIPE_SECRET_KEY isn't set.
//   - `stripeClient` const proxy for new code that prefers the plain
//     attribute access pattern shown in the payment-system spec.
const STRIPE_API_VERSION = "2024-12-18.acacia";
let cached = null;

export function stripe() {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY missing");
  cached = new Stripe(key, { apiVersion: STRIPE_API_VERSION });
  return cached;
}

// Proxy that forwards property access to the underlying client. Lets new
// code do `stripeClient.customers.create(...)` without paying the cost
// of constructing the client at import time.
export const stripeClient = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = stripe();
      const value = client[prop];
      return typeof value === "function" ? value.bind(client) : value;
    },
  }
);

export const PARENT_PLAN_PRICE_ID = () => {
  const id = process.env.STRIPE_PARENT_PRICE_ID;
  if (!id) throw new Error("STRIPE_PARENT_PRICE_ID missing");
  return id;
};

export const PARENT_PLAN_TRIAL_DAYS = 7;
