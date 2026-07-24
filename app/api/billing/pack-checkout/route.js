import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

// POST /api/billing/pack-checkout
//   Body: { pack_id: uuid, email?: string }
//   PUBLIC — no auth required.
//
// The /get-started "buy credits" direct-buy flow. An anonymous parent picks a
// pack and pays; Stripe collects their email + card on its hosted page, and
// the billing webhook (onPackPurchaseCompleted) creates their account from
// that email, credits them, and emails a magic-link welcome. Account-after-
// payment, so there's no signup wall before the money.
//
// Logged-in parents buying from their dashboard use /api/payments/purchase-pack
// instead (which reuses their existing Stripe customer + attaches user_id).
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "expected json body" }, { status: 400 });
  }

  const packId = body?.pack_id?.toString();
  const email = sanitizeEmail(body?.email);
  if (!packId) {
    return NextResponse.json({ error: "pack_id required" }, { status: 400 });
  }

  const admin = createAdminClient();

  // Load the pack. Must exist and be active. Price is taken from the DB row,
  // never from the client, so the amount can't be tampered with.
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

  const origin =
    request.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://tuterly.com.au";

  try {
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email || undefined,
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `Tuterly ${pack.name} — ${pack.sessions} session pack`,
          metadata: {
            pack_id: pack.id,
            pack_name: pack.name,
            sessions: String(pack.sessions),
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
              description: `${pack.sessions} tutoring session credits — Tuterly software included`,
            },
          },
        },
      ],
      // Webhook reads these to attribute + credit the purchase. No user_id:
      // the account is created from the Stripe email after payment.
      metadata: {
        kind: "session_pack",
        pack_id: pack.id,
        pack_sessions: String(pack.sessions),
      },
      success_url: `${origin}/get-started?purchased=1`,
      cancel_url: `${origin}/get-started?cancelled=1`,
      allow_promotion_codes: true,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("[billing/pack-checkout] checkout create failed:", e);
    return NextResponse.json(
      { error: e?.message || "Could not start checkout. Please try again." },
      { status: 500 }
    );
  }
}

function sanitizeEmail(raw) {
  if (typeof raw !== "string") return null;
  const t = raw.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return null;
  if (t.length > 254) return null;
  return t;
}
