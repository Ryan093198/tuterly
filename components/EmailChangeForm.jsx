"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import Button from "@/components/ui/Button";

export default function EmailChangeForm({ currentEmail }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'ok' | 'err', msg }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    const next = email.trim().toLowerCase();
    if (!next) return;
    if (next === (currentEmail || "").toLowerCase()) {
      setStatus({ type: "err", msg: "That's already your current email." });
      return;
    }

    setPending(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ email: next });
    setPending(false);

    if (error) {
      setStatus({ type: "err", msg: error.message || "Couldn't update email." });
      return;
    }

    setStatus({
      type: "ok",
      msg: `We've sent a confirmation link to ${next}. Click it to finish changing your email, your sign-in won't change until you do.`,
    });
    setEmail("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm text-muted leading-relaxed">
        Enter the new email you'd like to use for signing in. We'll send a
        confirmation link to that address, click it to finish the change.
      </p>
      <label className="block space-y-1.5">
        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          New email address
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="new.email@example.com"
          className="w-full h-10 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
        />
      </label>
      <div className="flex gap-2 pt-1">
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? "Sending…" : "Send confirmation link"}
        </Button>
      </div>
      {status && (
        <p
          className={`text-sm leading-relaxed ${
            status.type === "ok"
              ? "text-emerald-700 dark:text-emerald-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {status.msg}
        </p>
      )}
    </form>
  );
}
