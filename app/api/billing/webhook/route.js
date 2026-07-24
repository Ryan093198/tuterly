import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendTrialWelcomeEmail, sendPackWelcomeEmail } from "@/lib/email";
import { findReferrerByCode } from "@/lib/referrals";

export const runtime = "nodejs";

// Stripe needs the raw request body to verify the signature, so we have
// to consume it as text and pass straight to constructEvent.
//
// Events we care about:
//   checkout.session.completed
//     Trial signup completed. Create the Supabase auth user, profile,
//     and subscription row. Mail them a magic-link to sign in.
//   customer.subscription.updated
//     Status changes (trialing → active → past_due → canceled). Mirror
//     to the subscriptions row.
//   customer.subscription.deleted
//     Subscription cancelled/ended. Mark row as canceled.
//
// Webhook secret comes from `stripe listen --print-secret` locally and
// from the dashboard webhook endpoint in production.
export async function POST(request) {
  const sig = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) {
    return NextResponse.json(
      { error: "missing signature or secret" },
      { status: 400 }
    );
  }

  const raw = await request.text();
  let event;
  try {
    event = stripe().webhooks.constructEvent(raw, sig, secret);
  } catch (e) {
    console.warn("[billing/webhook] signature verification failed:", e?.message);
    return NextResponse.json({ error: "bad signature" }, { status: 400 });
  }

  // Global event-level idempotency (audit H4). Record the event id; if it's
  // already present, this is a redelivery — acknowledge and skip. This guards
  // every handler at once, on top of the per-row constraints below.
  const dedupAdmin = createAdminClient();
  const { data: firstSeen, error: dedupErr } = await dedupAdmin
    .from("stripe_events")
    .upsert(
      { event_id: event.id, type: event.type },
      { onConflict: "event_id", ignoreDuplicates: true }
    )
    .select("event_id")
    .maybeSingle();
  if (dedupErr) {
    console.warn("[billing/webhook] event dedup insert failed:", dedupErr.message);
    // Fail open — the per-row idempotency constraints still protect us.
  } else if (!firstSeen) {
    console.log("[billing/webhook] duplicate event ignored:", event.id);
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        // The same event fires for subscription trial signups (mode =
        // 'subscription') and one-off session-pack purchases (mode =
        // 'payment'). Route to the right handler based on mode.
        if (event.data.object.mode === "payment") {
          await onPackPurchaseCompleted(event.data.object);
        } else {
          await onCheckoutCompleted(event.data.object);
        }
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await syncSubscription(event.data.object);
        break;
      case "customer.subscription.deleted":
        await syncSubscription(event.data.object);
        break;
      default:
        // Ignore — log noisily once if it shows up so we know to handle.
        console.log("[billing/webhook] unhandled event:", event.type);
    }
    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("[billing/webhook] handler failed:", event.type, e);
    // 500 prompts Stripe to retry. Idempotent handlers below mean retries
    // are safe.
    return NextResponse.json({ error: "handler failed" }, { status: 500 });
  }
}

// Session-pack purchase completed. Credit the parent + write the invoice
// row + append a ledger transaction. Idempotent on the
// stripe_payment_intent_id so duplicate webhook deliveries (Stripe
// retries, manual replays) collapse safely.
async function onPackPurchaseCompleted(session) {
  const admin = createAdminClient();
  let userId = session.metadata?.user_id || null;
  const packId = session.metadata?.pack_id;
  const packSessions = parseInt(session.metadata?.pack_sessions || "0", 10);
  const paymentIntentId = session.payment_intent;
  const stripeInvoiceId = session.invoice ?? null;
  const customerId = session.customer ?? null;
  const email = session.customer_details?.email?.toLowerCase()?.trim() || null;
  if (!packId || !packSessions || !paymentIntentId) {
    console.warn("[billing/webhook] pack purchase missing fields:", {
      packId,
      packSessions,
      paymentIntentId,
    });
    return;
  }

  // Anonymous direct-buy (the /get-started flow): no account existed before
  // payment. Create-or-find the account from the Stripe email — mirroring the
  // trial flow — so credits attach to a real parent. On redelivery,
  // findUserIdByEmail finds the existing account, so no duplicate is created;
  // the ledger constraint below still guards double-crediting.
  let isNewUser = false;
  if (!userId) {
    if (!email) {
      console.warn("[billing/webhook] pack purchase missing user_id and email");
      return;
    }
    userId = await findUserIdByEmail(admin, email);
    if (!userId) {
      const { data: created, error: createErr } =
        await admin.auth.admin.createUser({
          email,
          email_confirm: true,
          user_metadata: { source: "pack_purchase" },
        });
      if (createErr) throw createErr;
      userId = created.user?.id;
      isNewUser = true;
    }
    if (!userId) throw new Error("could not create or find user for pack purchase");
    // Ensure a parent profile exists for this account.
    const { data: prof } = await admin
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .maybeSingle();
    if (!prof) {
      const { error: profErr } = await admin
        .from("profiles")
        .insert({ id: userId, email, role: "parent" });
      if (profErr) throw profErr;
    }
  }

  // Look up the pack for the amount (don't trust client-side metadata
  // for money — refetch the canonical row).
  const { data: pack } = await admin
    .from("session_packs")
    .select("id, name, sessions, price")
    .eq("id", packId)
    .maybeSingle();
  if (!pack) {
    console.warn("[billing/webhook] pack not found:", packId);
    return;
  }

  // Insert-first idempotency (audit H4): the unique index on
  // credit_transactions(stripe_payment_intent_id) is the atomic gate. Write
  // the ledger row FIRST; if it's a duplicate (unique violation), this
  // delivery has already been processed — bail before crediting again. This
  // closes the check-then-insert race that could double-credit on overlapping
  // Stripe retries.
  const { error: txErr } = await admin.from("credit_transactions").insert({
    parent_id: userId,
    type: "purchase",
    credits: pack.sessions,
    stripe_payment_intent_id: paymentIntentId,
    notes: `Purchased ${pack.name} pack (${pack.sessions} sessions)`,
  });
  if (txErr) {
    if (isUniqueViolation(txErr)) {
      console.log(
        "[billing/webhook] pack purchase already credited:",
        paymentIntentId
      );
      return;
    }
    throw txErr;
  }

  // Now that we own this delivery, add the credits atomically (creates the
  // row on first purchase; avoids the read-modify-write lost-update race).
  const { error: addErr } = await admin.rpc("add_credits", {
    p_parent_id: userId,
    p_amount: pack.sessions,
    p_pack_size: pack.sessions,
  });
  if (addErr) throw addErr;

  // A session pack already includes the software the $29/mo membership pays
  // for, so a parent who was subscribing no longer needs that membership.
  // Flag it to cancel at period end — they keep what they've already paid for
  // (no refund, no access gap: the credits row above keeps hasSoftwareAccess
  // true once the membership lapses) and it simply stops renewing. Best-effort:
  // the credits are already applied and this only runs on the first (non-
  // duplicate) delivery — a Stripe hiccup here must not fail the webhook.
  try {
    await cancelMembershipForPackBuyer(admin, userId);
  } catch (e) {
    console.warn(
      "[billing/webhook] membership cancel-on-pack failed:",
      e?.message
    );
  }

  // Build the parent-facing invoice record. Stripe also generates its
  // own hosted invoice via invoice_creation:enabled — we mirror the id
  // here so parents can pull receipts from inside Tuterly later.
  const { error: invoiceErr } = await admin.from("invoices").insert({
    parent_id: userId,
    type: "session_pack",
    amount: pack.price,
    description: `${pack.name} pack — ${pack.sessions} sessions`,
    stripe_invoice_id: stripeInvoiceId,
    stripe_payment_intent_id: paymentIntentId,
    status: "paid",
  });
  if (invoiceErr) {
    console.warn("[billing/webhook] invoice insert failed:", invoiceErr.message);
  }

  // Mirror the Stripe customer id onto profiles if it isn't there yet,
  // so future purchase-pack calls can reuse the saved card.
  if (customerId) {
    await admin
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("id", userId)
      .is("stripe_customer_id", null);
  }

  // Brand-new account from a direct buy → email a magic-link so they can sign
  // in and add their child. (Existing/logged-in buyers already have access.)
  if (isNewUser && email) {
    try {
      const origin =
        process.env.NEXT_PUBLIC_APP_URL || "https://app.tuterly.com.au";
      const { data: linkData, error: linkErr } =
        await admin.auth.admin.generateLink({
          type: "magiclink",
          email,
          options: { redirectTo: `${origin}/dashboard/parent?welcome=pack` },
        });
      if (linkErr) throw linkErr;
      const magicLink = linkData?.properties?.action_link;
      if (magicLink) await sendPackWelcomeEmail({ to: email, magicLink });
    } catch (e) {
      console.warn("[billing/webhook] pack welcome email failed:", e?.message);
    }
  }
}

// When a parent who holds an active membership buys a session pack, the pack
// already bundles the software the membership pays for. Set the Stripe
// subscription to cancel at period end so it stops renewing without
// interrupting access or triggering a refund. Idempotent and defensive: skips
// subs that are already canceled or already flagged to cancel (calling update
// on a canceled subscription would error). The customer.subscription.updated
// event Stripe fires for this change flows back through syncSubscription and
// mirrors the new status to the subscriptions row.
async function cancelMembershipForPackBuyer(admin, userId) {
  const { data: subs } = await admin
    .from("subscriptions")
    .select("stripe_subscription_id, status")
    .eq("user_id", userId)
    .in("status", ["trialing", "active", "past_due", "trial"]);
  if (!subs || subs.length === 0) return;

  for (const row of subs) {
    const subId = row.stripe_subscription_id;
    if (!subId) continue;

    let stripeSub;
    try {
      stripeSub = await stripe().subscriptions.retrieve(subId);
    } catch (e) {
      console.warn(
        "[billing/webhook] could not retrieve sub for cancel:",
        subId,
        e?.message
      );
      continue;
    }

    if (
      !stripeSub ||
      stripeSub.status === "canceled" ||
      stripeSub.status === "incomplete_expired" ||
      stripeSub.cancel_at_period_end
    ) {
      continue;
    }

    await stripe().subscriptions.update(subId, {
      cancel_at_period_end: true,
      metadata: {
        ...(stripeSub.metadata || {}),
        canceled_reason: "pack_purchase_includes_software",
      },
    });
    console.log(
      "[billing/webhook] membership set to cancel at period end after pack purchase:",
      subId
    );
  }
}

async function onCheckoutCompleted(session) {
  const email = session.customer_details?.email?.toLowerCase()?.trim();
  const customerId = session.customer;
  const subscriptionId = session.subscription;
  if (!email || !customerId || !subscriptionId) {
    console.warn("[billing/webhook] checkout missing fields:", {
      email,
      customerId,
      subscriptionId,
    });
    return;
  }

  const admin = createAdminClient();

  // Find or create the Supabase auth user for this email. listUsers paged
  // by email is the only way to look one up by address without admin RPC.
  let userId = await findUserIdByEmail(admin, email);
  if (!userId) {
    const { data: created, error: createErr } =
      await admin.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: { source: "worksheets_trial" },
      });
    if (createErr) throw createErr;
    userId = created.user?.id;
  }
  if (!userId) throw new Error("could not create or find user");

  // Profile row — they'll be a parent by default. If they already had a
  // profile (e.g. they signed up earlier as a tutor), don't overwrite.
  const { data: existingProfile } = await admin
    .from("profiles")
    .select("id, role")
    .eq("id", userId)
    .maybeSingle();
  if (!existingProfile) {
    const { error: profileErr } = await admin.from("profiles").insert({
      id: userId,
      email,
      role: "parent",
    });
    if (profileErr) throw profileErr;
  }

  // Fetch the full subscription so we get status / period end. The
  // checkout.session.completed event only carries the id.
  const subscription = await stripe().subscriptions.retrieve(subscriptionId);

  // Upsert the subscriptions row keyed on the stripe subscription id.
  // This handler is idempotent — duplicate Stripe webhook deliveries
  // (or our own retries) collapse onto the same row.
  const subRow = {
    user_id: userId,
    plan: "parent_monthly",
    stripe_subscription_id: subscription.id,
    stripe_customer_id: customerId,
    status: subscription.status,
    trial_ends_at: subscription.trial_end
      ? new Date(subscription.trial_end * 1000).toISOString()
      : null,
    current_period_end: subscription.current_period_end
      ? new Date(subscription.current_period_end * 1000).toISOString()
      : null,
  };
  const { error: upsertErr } = await admin
    .from("subscriptions")
    .upsert(subRow, { onConflict: "stripe_subscription_id" });
  if (upsertErr) throw upsertErr;

  // Record the referral, if any. The checkout-session route forwarded
  // the referrer's code into subscription_data.metadata.referral_code,
  // so we read it off the freshly-retrieved subscription. Idempotent
  // via the (referrer_id, referred_user_id) unique index — duplicate
  // webhook deliveries collapse onto the same referrals row.
  const referralCode = subscription.metadata?.referral_code;
  if (referralCode) {
    try {
      const referrer = await findReferrerByCode(admin, referralCode);
      // Reject self-referral by identity OR by email (audit H4) — otherwise
      // one person could farm $20 credits with throwaway trial emails on
      // their own code.
      const selfReferral =
        referrer &&
        (referrer.id === userId ||
          referrer.email?.toLowerCase()?.trim() === email);
      if (referrer && !selfReferral) {
        const { error: refErr } = await admin
          .from("referrals")
          .upsert(
            {
              referrer_id: referrer.id,
              referred_email: email,
              referred_user_id: userId,
              status: "signed_up",
            },
            { onConflict: "referrer_id,referred_user_id" }
          );
        if (refErr) {
          console.warn(
            "[billing/webhook] referral insert failed:",
            refErr.message
          );
        }
      }
    } catch (e) {
      console.warn("[billing/webhook] referral attribution failed:", e?.message);
    }
  }

  // Email them a magic link so they can sign in without a password.
  // generateLink returns the action_link we control delivery on — using
  // our Resend template keeps the branding consistent.
  const origin =
    process.env.NEXT_PUBLIC_APP_URL || "https://app.tuterly.com.au";
  const { data: linkData, error: linkErr } =
    await admin.auth.admin.generateLink({
      type: "magiclink",
      email,
      options: { redirectTo: `${origin}/worksheets?welcome=1` },
    });
  if (linkErr) throw linkErr;
  const magicLink = linkData?.properties?.action_link;
  if (magicLink) {
    try {
      await sendTrialWelcomeEmail({ to: email, magicLink });
    } catch (e) {
      console.warn("[billing/webhook] welcome email failed:", e?.message);
    }
  }
}

async function syncSubscription(subscription) {
  const admin = createAdminClient();
  // Upsert, not update (audit H4): if a `customer.subscription.updated` event
  // arrives before the `checkout.session.completed` that carries our user_id,
  // an UPDATE would match zero rows and the status change would be lost. The
  // upsert inserts a row (plan defaults; user_id stays null and is filled in
  // by the checkout handler later) or updates the existing one. We never write
  // user_id here so we don't clobber it once set.
  const { error } = await admin.from("subscriptions").upsert(
    {
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer ?? null,
      status: subscription.status,
      trial_ends_at: subscription.trial_end
        ? new Date(subscription.trial_end * 1000).toISOString()
        : null,
      current_period_end: subscription.current_period_end
        ? new Date(subscription.current_period_end * 1000).toISOString()
        : null,
    },
    { onConflict: "stripe_subscription_id" }
  );
  if (error) throw error;
}

// Find the Supabase auth user id for an email. Every auth user has a matching
// profiles row (created by the on-signup trigger), and profiles.email is
// indexed, so this is O(1) and — unlike the old listUsers({perPage:200}) scan —
// keeps working past 200 users (audit H4). Returns null if no user exists yet.
async function findUserIdByEmail(admin, email) {
  const { data: profile } = await admin
    .from("profiles")
    .select("id")
    .ilike("email", email)
    .maybeSingle();
  if (profile?.id) return profile.id;

  // Fallback for the rare orphan case (auth user exists but no profile row):
  // scan a bounded page. Uncommon, but keeps provisioning correct.
  const { data } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
  const match = (data?.users ?? []).find(
    (u) => u.email?.toLowerCase() === email
  );
  return match?.id ?? null;
}

function isUniqueViolation(err) {
  return err?.code === "23505" || /duplicate key/i.test(err?.message || "");
}
