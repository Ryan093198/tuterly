"use client";

import { useState } from "react";

export default function ManageForm() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/study/manage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim() }),
    }).catch(() => null);
    setBusy(false);
    if (!res?.ok) return setError("Please check the email and try again.");
    setSent(true);
  }

  if (sent) {
    return (
      <p className="rounded-xl bg-green-50 dark:bg-green-950 p-4 text-green-800 dark:text-green-200">
        If {email.trim()} has a Tuterly Study Plus subscription, we&apos;ve emailed it a link. Check your inbox (and junk folder).
      </p>
    );
  }
  return (
    <form onSubmit={submit} className="space-y-3">
      <input type="email" required autoComplete="email" placeholder="you@example.com" value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3" />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button type="submit" disabled={busy || !email.trim()}
        className="w-full rounded-xl bg-[#0e9fc1] py-3 font-semibold text-white disabled:opacity-50">
        {busy ? "Sending…" : "Email me a link"}
      </button>
    </form>
  );
}
