"use client";

import { useEffect, useState } from "react";

const ENDPOINT = "https://iuiqiqtthmpvtxmirdam.supabase.co/functions/v1/parent-consent-page";

async function call(body) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong. Try again in a moment.");
  return data;
}

export default function ConsentForm({ token }) {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(token ? null : "This link isn't complete. Open it again from the email.");
  const [name, setName] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token) return;
    call({ token })
      .then((d) => { setInfo(d); if (d.consented) setDone(true); })
      .catch((e) => setError(e.message));
  }, [token]);

  async function agree(e) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await call({ token, action: "agree", parent_name: name.trim(), confirm });
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const child = info?.first_name ?? "your child";

  if (done) {
    return (
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Thanks, you&apos;re all set</h1>
        <p className="text-muted">
          {`${child} can keep using Tuterly Study. We've let them know in the app.`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          {info ? `${child} would like to use Tuterly Study` : "Tuterly Study"}
        </h1>
        <p className="text-muted">
          Because {child} is under 16, we ask a parent or guardian to say yes. Have a read below, then
          type your name.
        </p>
      </div>

      {error ? <p className="text-red-600 text-sm">{error}</p> : null}

      {info ? (
        <form onSubmit={agree} className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Your name</span>
            <input
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </label>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" className="mt-1" checked={confirm} onChange={(e) => setConfirm(e.target.checked)} />
            <span>
              I&apos;m {child}&apos;s parent or guardian, and I agree to them using Tuterly Study as described
              below and in the Privacy Policy.
            </span>
          </label>
          <button
            type="submit"
            disabled={busy || name.trim().length < 2 || !confirm}
            className="w-full rounded-xl bg-[#0e9fc1] text-white font-semibold py-3 disabled:opacity-50"
          >
            {busy ? "Saving…" : "Yes, they can use it"}
          </button>
        </form>
      ) : null}
    </div>
  );
}
