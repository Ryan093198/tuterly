import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendTrialWelcomeEmail } from "@/lib/email";
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

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await onCheckoutCompleted(event.data.object);
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
      if (referrer && referrer.id !== userId) {
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
  const { error } = await admin
    .from("subscriptions")
    .update({
      status: subscription.status,
      trial_ends_at: subscription.trial_end
        ? new Date(subscription.trial_end * 1000).toISOString()
        : null,
      current_period_end: subscription.current_period_end
        ? new Date(subscription.current_period_end * 1000).toISOString()
        : null,
    })
    .eq("stripe_subscription_id", subscription.id);
  if (error) throw error;
}

async function findUserIdByEmail(admin, email) {
  // listUsers doesn't filter server-side by email in supabase-js, so we
  // page through a small slice. New trial users almost always come back
  // as not-found on page 1 anyway.
  const { data, error } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });
  if (error) throw error;
  const match = (data?.users ?? []).find(
    (u) => u.email?.toLowerCase() === email
  );
  return match?.id ?? null;
}
