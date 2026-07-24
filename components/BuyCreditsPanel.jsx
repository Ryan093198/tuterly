"use client";

import { useState } from "react";
import { readJsonOrFallback } from "@/lib/practice-client";

// Parent-facing "Buy session credits" widget. Lives at the top of the
// parent dashboard. Shows current balance and the three pack tiers from
// the session_packs table; clicking a pack POSTs to
// /api/payments/purchase-pack and redirects to Stripe Checkout. The
// webhook credits the balance on success.
//
// `creditsRemaining` and `packs` are server-rendered so the panel is
// fully populated before hydration. The Buy buttons are the only
// interactive surface.
export default function BuyCreditsPanel({
  creditsRemaining,
  packs,
  hasPack = false,
  softwareIncluded = false,
}) {
  const [pending, setPending] = useState(null);
  const [error, setError] = useState(null);

  async function buy(packId) {
    setError(null);
    setPending(packId);
    try {
      const res = await fetch("/api/payments/purchase-pack", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ pack_id: packId }),
      });
      const data = await readJsonOrFallback(res);
      if (!res.ok || !data?.url) {
        throw new Error(data?.error || "Could not start checkout.");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e.message || "Could not start checkout.");
      setPending(null);
    }
  }

  // Urgency only makes sense once they're actually on the sessions plan.
  const lowBalance = hasPack && creditsRemaining <= 1;

  return (
    <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card p-6 sm:p-7 mb-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-brand font-semibold">
            {hasPack ? "Session credits" : "Book tutoring sessions"}
          </p>
          {hasPack ? (
            <p className="mt-1 text-2xl font-semibold tracking-tight">
              {creditsRemaining}{" "}
              <span className="text-base font-normal text-muted">
                {creditsRemaining === 1 ? "session left" : "sessions left"}
              </span>
            </p>
          ) : (
            <p className="mt-1 text-2xl font-semibold tracking-tight">
              Session packs
            </p>
          )}
          <p className="mt-1 text-xs text-muted max-w-md">
            {hasPack
              ? lowBalance
                ? "Buy a pack so your child's next session can run uninterrupted."
                : "One credit is used each time your tutor publishes a session report."
              : "Buy a pack to book sessions with a tutor. Every pack includes full Tuterly software — reports, practice and progress tracking — at no extra cost."}
          </p>
        </div>
        {lowBalance && (
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 whitespace-nowrap">
            Top up soon
          </span>
        )}
      </div>

      {/* The key clarifier: for anyone on a paid path, spell out that the
          software comes with it — so they never think they also owe $29/mo. */}
      {softwareIncluded && (
        <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-brand/15 bg-brand-pale/40 px-4 py-3">
          <span className="mt-0.5 shrink-0 text-brand">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <p className="text-xs text-foreground leading-relaxed">
            <span className="font-semibold">Software included.</span> Session
            reports, the practice generator and progress tracking come with your
            sessions — there&apos;s no separate $29/month membership to pay.
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-3 gap-3 mt-5">
        {(packs || []).map((p) => (
          <div
            key={p.id}
            className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 bg-surface-soft flex flex-col"
          >
            <p className="text-sm font-semibold text-foreground">{p.name}</p>
            <p className="text-xs text-muted mt-0.5">
              {p.sessions} sessions
            </p>
            <p className="mt-3 text-xl font-semibold tracking-tight">
              ${Number(p.price).toFixed(0)}
            </p>
            <p className="text-[11px] text-muted">
              ${Number(p.per_session).toFixed(2)} per session
              {Number(p.savings) > 0 && (
                <>
                  {" · "}save ${Number(p.savings).toFixed(0)}
                </>
              )}
            </p>
            <button
              type="button"
              onClick={() => buy(p.id)}
              disabled={pending !== null}
              className="mt-4 px-3 h-9 rounded-full bg-foreground text-background text-xs font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {pending === p.id ? "Redirecting…" : `Buy ${p.name}`}
            </button>
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-3 text-xs text-red-600 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}
    </div>
  );
}
