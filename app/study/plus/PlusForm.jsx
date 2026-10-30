"use client";

import Link from "next/link";
import { useState } from "react";
import { LAUNCH_SPECIAL_LINE } from "@/lib/study-launch";

const PLANS = [
  { key: "monthly", label: "Monthly", price: "$29.99", per: "a month", usual: "$59.99", note: "7 days free, then $29.99 a month" },
  { key: "weekly", label: "Weekly", price: "$8.99", per: "a week", usual: "$17.99", note: "Billed every week" },
];

export default function PlusForm() {
  const [kind, setKind] = useState("family");
  const [plan, setPlan] = useState("monthly");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [manage, setManage] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setManage(false);
    try {
      const res = await fetch("/api/study/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, plan, email: email.trim(), agreed }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) {
        setError(data.error || "Couldn't start checkout. Try again in a moment.");
        setManage(!!data.manage);
        setBusy(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Couldn't start checkout. Check your connection and try again.");
      setBusy(false);
    }
  }

  const choice = (on) =>
    `flex-1 rounded-xl border-2 px-4 py-3 text-left transition ${on ? "border-[#0e9fc1] bg-[#e3f6fa]" : "border-zinc-200 dark:border-zinc-700"}`;

  return (
    <form onSubmit={submit} className="space-y-5">
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium mb-1">Who&apos;s it for?</legend>
        <div className="flex gap-3">
          <button type="button" className={choice(kind === "family")} onClick={() => setKind("family")}>
            <div className="font-semibold">My child</div>
            <div className="text-xs text-muted">You get a family code for up to 3 children</div>
          </button>
          <button type="button" className={choice(kind === "self")} onClick={() => setKind("self")}>
            <div className="font-semibold">Me</div>
            <div className="text-xs text-muted">Sign in to the app with the same email</div>
          </button>
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium mb-1">Plan</legend>
        {PLANS.map((p) => (
          <button key={p.key} type="button" className={`w-full flex items-center justify-between ${choice(plan === p.key)}`}
            onClick={() => setPlan(p.key)}>
            <span>
              <span className="font-semibold">{p.label}</span>
              {p.key === "monthly" ? <span className="ml-2 rounded-md bg-green-700 px-1.5 py-0.5 text-[10px] font-bold text-white">7 DAYS FREE</span> : null}
              <span className="block text-xs text-muted">{p.note}</span>
            </span>
            <span className="text-right">
              <span className="block font-bold text-lg">{p.price}</span>
              <span className="text-xs text-muted whitespace-nowrap"><s>{p.usual}</s> {p.per}</span>
            </span>
          </button>
        ))}
        <p className="text-xs font-semibold text-amber-700">{LAUNCH_SPECIAL_LINE}</p>
      </fieldset>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium">{kind === "family" ? "Your email" : "The email you'll use in the app"}</span>
        <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3" />
      </label>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" className="mt-1" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
        <span>
          {kind === "family"
            ? "I'm the parent or guardian, and I agree to my child using Tuterly Study as described in the Privacy Policy."
            : "I'm 18 or older, or my parent or guardian has said yes."}
        </span>
      </label>

      {error ? (
        <p className="text-sm text-red-600">
          {error} {manage ? <Link className="underline" href="/study/manage">Manage subscription</Link> : null}
        </p>
      ) : null}

      <button type="submit" disabled={busy || !agreed || !email.trim()}
        className="w-full rounded-xl bg-[#0e9fc1] py-3 font-semibold text-white disabled:opacity-50">
        {busy ? "Opening checkout…" : plan === "monthly" ? "Start my free week" : "Get Plus weekly"}
      </button>
      <p className="text-xs text-muted text-center">
        {plan === "monthly"
          ? "Free for 7 days, then $29.99 a month until you cancel. We'll email you before the free week ends."
          : "$8.99 a week until you cancel."}
      </p>
    </form>
  );
}
