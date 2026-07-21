import { randomBytes } from "node:crypto";

// Helper module for the parent referral program.
//
// Codes: 8-char base32 (no I, O, 1, 0 to keep them human-typable). The
// space is ~32^8 = 1.1 trillion, far more than we'll ever need, but the
// retry loop covers the (vanishingly small) chance of collision.

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CODE_LEN = 8;

function generateCandidate() {
  const bytes = randomBytes(CODE_LEN);
  let out = "";
  for (let i = 0; i < CODE_LEN; i++) {
    out += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return out;
}

/**
 * Fetch (or generate-and-store) the referral code for the given user.
 * Uses the admin client so we can read/write profile rows owned by the
 * caller without depending on the RLS policies.
 */
export async function ensureReferralCode(admin, userId) {
  const { data: row } = await admin
    .from("profiles")
    .select("referral_code")
    .eq("id", userId)
    .maybeSingle();
  if (row?.referral_code) return row.referral_code;

  // Up to 5 retries - collision probability with 8 chars is ~0 in
  // practice, but the unique index will catch the impossible case.
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCandidate();
    const { error } = await admin
      .from("profiles")
      .update({ referral_code: code })
      .eq("id", userId)
      .is("referral_code", null);
    if (!error) return code;
    if (!error.message?.includes("duplicate")) {
      // Non-collision error - surface it.
      throw error;
    }
  }
  throw new Error("Could not allocate a unique referral code after 5 tries");
}

/**
 * Look up a user id by referral code. Returns null if the code doesn't
 * match an existing parent.
 */
export async function findReferrerByCode(admin, code) {
  if (!code || typeof code !== "string") return null;
  const normalised = code.trim().toUpperCase();
  if (!/^[A-Z2-9]{6,12}$/.test(normalised)) return null;
  const { data } = await admin
    .from("profiles")
    .select("id, email")
    .eq("referral_code", normalised)
    .maybeSingle();
  return data ?? null;
}

/**
 * Fire the referral credit for a given referee user. Idempotent: if the
 * referrals row is already 'credited', nothing happens. Skips silently
 * (logging only) when the referrer has no stripe_customer_id yet - in
 * that case the credit stays "pending" and the next webhook trigger
 * after they subscribe will pick it up.
 *
 * Returns:
 *   { applied: true, amountCents } on success
 *   { applied: false, reason } when skipped
 */
// Max credited referrals one referrer can earn. Cheap abuse cap (audit H4).
const MAX_CREDITS_PER_REFERRER = 10;

export async function awardReferralCreditForReferee(admin, stripe, refereeUserId) {
  // Find a pending referrals row pointing at this referee.
  const { data: referral } = await admin
    .from("referrals")
    .select("id, referrer_id, credit_amount_cents, credit_currency, status")
    .eq("referred_user_id", refereeUserId)
    .eq("status", "signed_up")
    .limit(1)
    .maybeSingle();
  if (!referral) return { applied: false, reason: "no_pending_referral" };

  // Require the REFEREE to have actually converted to a paying subscription
  // (audit H4). Crediting on a free trial let a colluding tutor generate a
  // "first report" for a fake student and farm credits. Only reward once the
  // referred account is genuinely paying.
  const { data: refereeSub } = await admin
    .from("subscriptions")
    .select("status")
    .eq("user_id", refereeUserId)
    .in("status", ["active", "past_due"])
    .limit(1)
    .maybeSingle();
  if (!refereeSub) {
    return { applied: false, reason: "referee_not_paid_yet" };
  }

  // Per-referrer cap.
  const { count: creditedCount } = await admin
    .from("referrals")
    .select("id", { count: "exact", head: true })
    .eq("referrer_id", referral.referrer_id)
    .eq("status", "credited");
  if ((creditedCount ?? 0) >= MAX_CREDITS_PER_REFERRER) {
    return { applied: false, reason: "referrer_cap_reached" };
  }

  // Find the referrer's Stripe customer id.
  const { data: sub } = await admin
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", referral.referrer_id)
    .not("stripe_customer_id", "is", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!sub?.stripe_customer_id) {
    return { applied: false, reason: "no_stripe_customer" };
  }

  // Claim-before-charge (audit H4): atomically flip signed_up→credited and
  // only proceed if THIS call won the flip. Two concurrent "first report"
  // events can't both charge, because only one UPDATE matches status.
  const { data: claimed } = await admin
    .from("referrals")
    .update({ status: "credited", credited_at: new Date().toISOString() })
    .eq("id", referral.id)
    .eq("status", "signed_up")
    .select("id")
    .maybeSingle();
  if (!claimed) {
    return { applied: false, reason: "already_claimed" };
  }

  // Apply the credit as a negative customer balance transaction. If Stripe
  // fails, revert the claim so it can be retried rather than lost.
  let tx;
  try {
    tx = await stripe.customers.createBalanceTransaction(
      sub.stripe_customer_id,
      {
        amount: -Math.abs(referral.credit_amount_cents),
        currency: referral.credit_currency,
        description: `Tuterly referral credit (referral ${referral.id})`,
      }
    );
  } catch (e) {
    await admin
      .from("referrals")
      .update({ status: "signed_up", credited_at: null })
      .eq("id", referral.id);
    throw e;
  }

  await admin
    .from("referrals")
    .update({ stripe_balance_transaction_id: tx.id })
    .eq("id", referral.id);

  return { applied: true, amountCents: referral.credit_amount_cents };
}
