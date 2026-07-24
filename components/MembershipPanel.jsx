"use client";

import { useState } from "react";
import { readJsonOrFallback } from "@/lib/practice-client";

// Parent-facing Tuterly membership widget ($29/mo platform subscription).
// Lives at the top of the parent dashboard, above session credits.
//
// `subscription` is server-rendered (null when the parent has no live
// membership). Shape: { status, trial_ends_at, current_period_end }.
//   - null / canceled  → pitch + "Start membership" (7-day free trial)
//   - trialing         → trial status + "Manage membership"
//   - active           → renews-on status + "Manage membership"
//   - past_due         → payment warning + "Update payment"
export default function MembershipPanel({ subscription, hasPack = false }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const status = subscription?.status || null;
  const hasMembership =
    status === "trialing" || status === "active" || status === "past_due";

  async function post(url) {
    setError(null);
    setPending(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await readJsonOrFallback(res);
      if (!res.ok || !data?.url) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
      setPending(false);
    }
  }

  const fmt = (iso) =>
    iso
      ? new Date(iso).toLocaleDateString("en-AU", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : null;

  // ── Active / trialing / past_due members ──────────────────────────────
  if (hasMembership) {
    const trialEnd = fmt(subscription.trial_ends_at);
    const renews = fmt(subscription.current_period_end);
    return (
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card p-6 sm:p-7 mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-brand font-semibold">
              Tuterly membership
            </p>
            {status === "trialing" && (
              <>
                <p className="mt-1 text-2xl font-semibold tracking-tight">
                  Free trial{" "}
                  <span className="text-base font-normal text-muted">
                    active
                  </span>
                </p>
                <p className="mt-1 text-xs text-muted">
                  {trialEnd
                    ? `Your first $29 payment is on ${trialEnd}.`
                    : "Your 7-day free trial is running."}
                </p>
              </>
            )}
            {status === "active" && (
              <>
                <p className="mt-1 text-2xl font-semibold tracking-tight">
                  Active
                </p>
                <p className="mt-1 text-xs text-muted">
                  {renews
                    ? `$29/month · renews ${renews}.`
                    : "$29/month membership."}
                </p>
              </>
            )}
            {status === "past_due" && (
              <>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-amber-600">
                  Payment needed
                </p>
                <p className="mt-1 text-xs text-muted">
                  Your last payment didn&apos;t go through. Update your card to
                  keep your membership.
                </p>
              </>
            )}
          </div>
          {status !== "past_due" ? (
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 whitespace-nowrap">
              {status === "trialing" ? "Trial" : "Member"}
            </span>
          ) : (
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 whitespace-nowrap">
              Action needed
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => post("/api/billing/portal")}
          disabled={pending}
          className="mt-5 px-4 h-9 rounded-full bg-foreground text-background text-xs font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {pending
            ? "Opening…"
            : status === "past_due"
              ? "Update payment"
              : "Manage membership"}
        </button>

        {error && (
          <p className="mt-3 text-xs text-red-600 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}
      </div>
    );
  }

  // ── No membership ─────────────────────────────────────────────────────
  // A parent who's bought a session pack already has full software access —
  // the pack includes it. Pitching a separate $29/mo membership here is what
  // invited the double-charge, so we hide this panel entirely for them.
  if (hasPack) return null;

  // Otherwise pitch the membership as the SOFTWARE-ONLY option — clearly
  // distinct from session packs (which bundle tutoring). This is for parents
  // using their own tutor who just want the reports + practice tools.
  return (
    <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card p-6 sm:p-7 mb-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-brand font-semibold">
            Software only · Tuterly membership
          </p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">
            $29<span className="text-base font-normal text-muted">/month</span>
          </p>
          <p className="mt-1 text-xs text-muted max-w-md">
            Just want the software? Get session reports, progress tracking, the
            practice generator and the tutor directory — without buying session
            packs. Best if you&apos;re using your own tutor. Start with a 7-day
            free trial; cancel anytime.
          </p>
          <p className="mt-2 text-xs text-muted max-w-md">
            Buying a session pack instead? The software is already included —
            you won&apos;t need this.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => post("/api/billing/subscribe")}
        disabled={pending}
        className="mt-5 px-4 h-10 rounded-full bg-brand text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
      >
        {pending ? "Redirecting…" : "Start 7-day free trial"}
      </button>

      {error && (
        <p className="mt-3 text-xs text-red-600 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}
    </div>
  );
}
