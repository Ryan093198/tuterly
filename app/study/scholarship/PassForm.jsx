"use client";

import { useState } from "react";

export default function PassForm() {
  const [kind, setKind] = useState("family");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/study/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "sch_pass", kind, email: email.trim(), agreed }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) {
        setError(data.error || "Couldn't start checkout. Try again in a moment.");
        setBusy(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Couldn't start checkout. Check your connection and try again.");
      setBusy(false);
    }
  }

  const choice = (on) => `flex-1 rounded-xl border-2 px-4 py-3 text-left transition ${on ? "border-[#0e9fc1] bg-[#e3f6fa]" : "border-zinc-200 dark:border-zinc-700"}`;

  return (
    <form onSubmit={submit} className="space-y-5">
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium mb-1">Who&apos;s it for?</legend>
        <div className="flex gap-3">
          <button type="button" className={choice(kind === "family")} onClick={() => setKind("family")}>
            <div className="font-semibold">My child</div>
            <div className="text-xs text-muted">You get a code for your child to enter</div>
          </button>
          <button type="button" className={choice(kind === "self")} onClick={() => setKind("self")}>
            <div className="font-semibold">Me</div>
            <div className="text-xs text-muted">Sign in to the app with the same email</div>
          </button>
        </div>
      </fieldset>

      <div className="rounded-xl border-2 border-[#0e9fc1] bg-[#e3f6fa] p-4 text-center">
        <p className="text-xs font-semibold text-amber-700 mb-1">Launch special: 50% off</p>
        <p className="text-3xl font-bold">$99</p>
        <p className="text-xs text-muted"><s>$198</s> once, yours to keep</p>
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium">{kind === "family" ? "Your email" : "The email you'll use in the app"}</span>
        <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3" />
      </label>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" className="mt-1" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
        <span>{kind === "family"
          ? "I'm the parent or guardian, and I agree to my child using Tuterly Study as described in the Privacy Policy."
          : "I'm 18 or older, or my parent or guardian has said yes."}</span>
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button type="submit" disabled={busy || !agreed || !email.trim()}
        className="w-full rounded-xl bg-[#0e9fc1] py-3 font-semibold text-white disabled:opacity-50">
        {busy ? "Opening checkout…" : "Get the Scholarship Pass"}
      </button>
    </form>
  );
}
