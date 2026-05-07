"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-client";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });
    setLoading(false);
    if (error) return setError(error.message);
    setSent(true);
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
              Reset your password
            </h1>
            <p className="text-sm text-muted mt-1">
              {sent
                ? "If an account exists for that email, we've sent a reset link. Check your inbox."
                : "Enter your email and we'll send you a link to set a new password."}
            </p>
          </div>

          {!sent && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  Email
                </span>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
                />
              </label>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Sending…" : "Send reset link"}
              </Button>
            </form>
          )}

          {error && (
            <p className="text-sm text-red-500 text-center" role="alert">
              {error}
            </p>
          )}

          <p className="text-xs text-center text-muted">
            <Link href="/" className="text-brand hover:text-brand-dark">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
