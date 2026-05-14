// Client-side Stripe helper. Lazy-loads @stripe/stripe-js the first time
// any browser code needs to mount Stripe Elements or call confirmCardSetup.
//
// Add `@stripe/stripe-js` to package.json before using this:
//
//   npm install @stripe/stripe-js
//
// And set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in your environment.

import { loadStripe } from "@stripe/stripe-js";

let stripePromise = null;

export function getStripe() {
  if (stripePromise) return stripePromise;
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY missing");
  }
  stripePromise = loadStripe(key);
  return stripePromise;
}
