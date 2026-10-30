// Tuterly Study Plus sold on the website (billed by Bayside Academics
// through Stripe). Same prices and free week as the App Store. Stripe's
// events go to the Study app's own webhook (Supabase function
// stripe-webhook), which recognises them by metadata.app.
import { randomInt } from "node:crypto";
import { stripe } from "@/lib/stripe";

export const STUDY_APP = "tuterly_study";
export const STUDY_TRIAL_DAYS = 7;
export const STUDY_APP_STORE_URL = "https://apps.apple.com/au/app/id6826966555";
// The Scholarship Pass: one-off, per entry level. Each entry test is for
// the year below (Year 4 students sit Year 5 entry).
export const SCH_PASS_LEVELS = [5, 6, 7];
export const SCH_PASS = { price: "$99", usual: "$198" };
export const schPassKey = (entryYear) => `study_sch_pass_y${entryYear}`;

export const STUDY_PLANS = {
  monthly: { lookupKey: "study_plus_monthly", label: "Monthly", price: "$29.99", per: "a month", usual: "$59.99" },
  weekly: { lookupKey: "study_plus_weekly", label: "Weekly", price: "$8.99", per: "a week", usual: "$17.99" },
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const cleanEmail = (v) => {
  const e = typeof v === "string" ? v.trim().toLowerCase() : "";
  return EMAIL.test(e) && e.length <= 200 ? e : null;
};

/** QUINN-XXXXXX, without letters that look alike (0/O, 1/I/L). */
export function familyCode() {
  const A = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += A[randomInt(A.length)];
  return `QUINN-${s}`;
}

/** Every Study subscription Stripe has for this email (any status). */
export async function studySubscriptionsFor(email) {
  const customers = await stripe().customers.list({ email, limit: 10 });
  const subs = [];
  for (const c of customers.data) {
    const list = await stripe().subscriptions.list({ customer: c.id, status: "all", limit: 20 });
    subs.push(...list.data.filter((s) => s.metadata?.app === STUDY_APP));
  }
  return { customers: customers.data, subs };
}

export async function priceFor(plan) {
  const key = typeof plan === "string" && plan.startsWith("sch_pass_y") ? schPassKey(plan.slice(10)) : STUDY_PLANS[plan]?.lookupKey;
  if (!key) return null;
  const list = await stripe().prices.list({ lookup_keys: [key], active: true, limit: 1 });
  return list.data[0] ?? null;
}
