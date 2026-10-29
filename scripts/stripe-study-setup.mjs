// One-off: create Tuterly Study Plus in Stripe (Bayside Academics).
// Run with the key for the mode you want (test first):
//   STRIPE_SECRET_KEY=sk_test_... node scripts/stripe-study-setup.mjs
// Safe to run again: it reuses the product and prices by lookup key.
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-12-18.acacia" });
const mode = process.env.STRIPE_SECRET_KEY?.startsWith("sk_live") ? "LIVE" : "test";

const PRICES = [
  { lookup_key: "study_plus_monthly", unit_amount: 2999, interval: "month", nickname: "Plus monthly (launch special)" },
  { lookup_key: "study_plus_weekly", unit_amount: 899, interval: "week", nickname: "Plus weekly (launch special)" },
];

const existing = await stripe.products.search({ query: "metadata['app']:'tuterly_study'" });
const product = existing.data[0] ?? await stripe.products.create({
  name: "Tuterly Study Plus",
  description: "Unlimited snaps, drills, tests, notes and term plans in Tuterly Study.",
  metadata: { app: "tuterly_study" },
});
console.log(`${mode} product: ${product.id}`);

for (const p of PRICES) {
  const found = await stripe.prices.list({ lookup_keys: [p.lookup_key], limit: 1 });
  if (found.data[0]) { console.log(`${p.lookup_key}: ${found.data[0].id} (already there)`); continue; }
  const price = await stripe.prices.create({
    product: product.id, currency: "aud", unit_amount: p.unit_amount, tax_behavior: "inclusive",
    recurring: { interval: p.interval }, lookup_key: p.lookup_key, nickname: p.nickname, metadata: { app: "tuterly_study" },
  });
  console.log(`${p.lookup_key}: ${price.id}`);
}
