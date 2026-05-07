"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";

export default function UpdatePassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  // When the user clicks the reset link in the email, Supabase puts a
  // recovery token in the URL hash and signs them in. Wait for that auth
  // event before showing the form to avoid a flash of "no session".
  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled && data?.session) setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords don't match.");

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return setError(error.message);
    setDone(true);
    setTimeout(() => router.push("/dashboard"), 1500);
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-12 bg-gradient-to-b from-brand-pale via-surface-soft to-surface-soft">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="flex flex-col items-center mb-8 text-center">
          <Logo size="lg" />
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card shadow-xl shadow-black/5 p-6 sm:p-8 space-y-5">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Set a new password
            </h1>
            <p className="text-sm text-muted mt-1">
              {done
                ? "Updated. Redirecting to your dashboard…"
                : ready
                  ? "Pick something at least 8 characters."
                  : "Verifying your reset link…"}
            </p>
          </div>

          {ready && !done && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <Field
                label="New password"
                value={password}
                onChange={setPassword}
                autoComplete="new-password"
              />
              <Field
                label="Confirm new password"
                value={confirm}
                onChange={setConfirm}
                autoComplete="new-password"
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Updating…" : "Update password"}
              </Button>
            </form>
          )}

          {error && (
            <p className="text-sm text-red-500 text-center" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

function Field({ label, value, onChange, autoComplete }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </span>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        minLength={8}
        required
        className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
      />
    </label>
  );
}
