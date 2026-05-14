"use client";

import { useEffect, useState } from "react";
import { readJsonOrFallback } from "@/lib/practice-client";

// Refer-a-friend UI for parents. Loads the user's referral code (lazy-
// created on first call) plus the list of referrals from /api/referral/*.
// Copy-to-clipboard, totals card, and a pending/credited list make up
// the page.
//
// Credit applies automatically via Stripe customer balance the moment
// the referred student's first session report is generated, so there's
// no "Apply credit" button — it just lands on their next invoice.
export default function ParentReferralPanel() {
  const [code, setCode] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [totalCents, setTotalCents] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [creditedCount, setCreditedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [copyState, setCopyState] = useState("idle");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [codeRes, listRes] = await Promise.all([
          fetch("/api/referral/code"),
          fetch("/api/referral/list"),
        ]);
        const codeData = await readJsonOrFallback(codeRes);
        const listData = await readJsonOrFallback(listRes);
        if (cancelled) return;
        if (codeData?.code) setCode(codeData.code);
        if (Array.isArray(listData?.referrals)) {
          setReferrals(listData.referrals);
          setTotalCents(listData.total_earned_cents ?? 0);
          setPendingCount(listData.pending_count ?? 0);
          setCreditedCount(listData.credited_count ?? 0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://app.tuterly.com.au";
  const shareUrl = code ? `${origin}/parents?ref=${code}` : "";

  async function copyLink() {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("idle");
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card p-6 sm:p-8 space-y-5">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-brand font-semibold">
            Refer a friend
          </p>
          <h2 className="text-2xl font-semibold tracking-tight mt-1">
            Give $20, get $20
          </h2>
          <p className="text-sm text-muted mt-2 leading-relaxed max-w-prose">
            Share your link with another parent. The moment their child has
            their first tutoring session with a report generated, you both
            win: they get a 7-day free trial, and you get a $20 credit
            applied automatically to your next Tuterly invoice.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            readOnly
            value={shareUrl || (loading ? "Loading your link…" : "Could not load link")}
            className="flex-1 h-11 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-surface-soft text-sm font-mono text-foreground"
            onFocus={(e) => e.target.select()}
          />
          <button
            type="button"
            onClick={copyLink}
            disabled={!shareUrl}
            className="h-11 px-5 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {copyState === "copied" ? "Copied!" : "Copy link"}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Stat label="Total earned" value={`$${(totalCents / 100).toFixed(2)}`} accent />
          <Stat label="Pending" value={pendingCount} />
          <Stat label="Credited" value={creditedCount} />
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card p-6 sm:p-8">
        <h3 className="text-base font-semibold tracking-tight mb-4">
          Your referrals
        </h3>
        {loading ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : referrals.length === 0 ? (
          <p className="text-sm text-muted">
            No referrals yet. Share your link with any parent who could
            benefit from structured tutoring with detailed reports.
          </p>
        ) : (
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-900">
            {referrals.map((r) => (
              <li
                key={r.id}
                className="flex items-center justify-between py-3 gap-3 flex-wrap"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {r.referred_email}
                  </p>
                  <p className="text-[11px] text-muted mt-0.5">
                    Signed up{" "}
                    {new Date(r.created_at).toLocaleDateString("en-AU", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <StatusBadge status={r.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, accent = false }) {
  return (
    <div
      className={`rounded-2xl border ${
        accent
          ? "border-brand/30 bg-brand-pale/40"
          : "border-zinc-200 dark:border-zinc-800 bg-surface-soft"
      } px-4 py-3`}
    >
      <p className="text-[10px] uppercase tracking-wider text-muted">{label}</p>
      <p
        className={`text-lg font-semibold mt-0.5 ${
          accent ? "text-brand-dark" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === "credited") {
    return (
      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-pale text-brand-dark">
        Credited $20
      </span>
    );
  }
  if (status === "cancelled") {
    return (
      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-muted">
        Cancelled
      </span>
    );
  }
  return (
    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
      Pending first lesson
    </span>
  );
}
