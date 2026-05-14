import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

// POST /api/payments/purchase-pack
//   Body: { pack_id: uuid }
//   Auth: signed-in parent
//
// Creates a Stripe Checkout session in `payment` mode (one-time charge,
// not a subscription) for a session pack from the session_packs table.
// On success Stripe redirects back to /dashboard/parent and the webhook
// (checkout.session.completed) credits the parent + writes an invoice.
//
// We reuse the parent's Stripe customer when one exists (from the
// subscription trial flow), so saved cards and invoice history stay on
// a single customer record.

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "expected json body" }, { status: 400 });
  }

  const packId = body?.pack_id?.toString();
  if (!packId) {
    return NextResponse.json(
      { error: "pack_id required" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();

  // Load the pack. Must exist and be active.
  const { data: pack } = await admin
    .from("session_packs")
    .select("id, name, sessions, price")
    .eq("id", packId)
    .eq("active", true)
    .maybeSingle();
  if (!pack) {
    return NextResponse.json(
      { error: "pack not found or no longer available" },
      { status: 404 }
    );
  }

  // Resolve the Stripe customer for this parent. Check profiles first
  // (canonical per the payment spec), then fall back to whichever
  // subscriptions row carried the id over from the trial flow.
  const { data: profile } = await admin
    .from("profiles")
    .select("email, full_name, stripe_customer_id")
    .eq("id", user.id)
    .maybeSingle();
  let customerId = profile?.stripe_customer_id ?? null;
  if (!customerId) {
    const { data: sub } = await admin
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .not("stripe_customer_id", "is", null)
      .limit(1)
      .maybeSingle();
    customerId = sub?.stripe_customer_id ?? null;
    // Mirror it onto profiles so future calls hit the fast path.
    if (customerId) {
      await admin
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }
  }

  const origin =
    request.headers.get("origin") ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://app.tuterly.com.au";

  try {
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      // Reuse the existing customer if we found one; otherwise let
      // Stripe spin up a fresh one from the email.
      ...(customerId
        ? { customer: customerId }
        : { customer_email: profile?.email || user.email || undefined }),
      // Create an Invoice in Stripe alongside the PaymentIntent so the
      // parent gets a receipt and we can store the hosted URL.
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `Tuterly ${pack.name} — ${pack.sessions} session pack`,
          metadata: {
            pack_id: pack.id,
            pack_name: pack.name,
            sessions: String(pack.sessions),
            user_id: user.id,
          },
        },
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "aud",
            unit_amount: Math.round(Number(pack.price) * 100),
            product_data: {
              name: `Tuterly ${pack.name} pack`,
              description: `${pack.sessions} tutoring session credits`,
            },
          },
        },
      ],
      // Webhook reads these to attribute the purchase.
      metadata: {
        kind: "session_pack",
        pack_id: pack.id,
        pack_sessions: String(pack.sessions),
        user_id: user.id,
      },
      success_url: `${origin}/dashboard/parent?pack_purchase=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/parent?pack_purchase=cancelled`,
      allow_promotion_codes: true,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("[payments/purchase-pack] checkout create failed:", e);
    return NextResponse.json(
      { error: e?.message || "Could not start checkout." },
      { status: 500 }
    );
  }
}
