"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import Button from "@/components/ui/Button";

export default function Auth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const initialEmail = searchParams.get("email") || "";
  const paramRole = searchParams.get("role");
  const initialRole =
    paramRole === "tutor"
      ? "tutor"
      : paramRole === "student"
        ? "student"
        : "parent";
  const isInvite = !!searchParams.get("inviter");

  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState(initialRole);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setLoading(false);
      if (error) return setError(error.message);
      router.push(next);
      router.refresh();
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, role },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      setLoading(false);
      if (error) return setError(error.message);
      setError("Check your email to confirm your account.");
    }
  }

  async function handleGoogle() {
    const supabase = createClient();
    const params = new URLSearchParams({ next });
    if (mode === "signup") params.set("role", role);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?${params.toString()}`,
      },
    });
    if (error) setError(error.message);
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-sm font-medium">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`h-9 rounded-lg transition ${
            mode === "login"
              ? "bg-white dark:bg-zinc-800 shadow-sm text-foreground"
              : "text-zinc-500 hover:text-foreground"
          }`}
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`h-9 rounded-lg transition ${
            mode === "signup"
              ? "bg-white dark:bg-zinc-800 shadow-sm text-foreground"
              : "text-zinc-500 hover:text-foreground"
          }`}
        >
          Sign up
        </button>
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        className="w-full h-11 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-3 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted">
        <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
        or with email
        <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === "signup" && (
          <Field
            label="Full name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        )}
        <Field
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Password
            </span>
            {mode === "login" && (
              <Link
                href="/auth/forgot"
                className="text-xs text-brand hover:text-brand-dark"
              >
                Forgot password?
              </Link>
            )}
          </div>
          <input
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
            className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
          />
        </div>
        {mode === "signup" && !isInvite && (
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              I'm signing up as
            </span>
            <div className="grid grid-cols-3 gap-2">
              <RoleOption
                value="parent"
                label="Parent"
                description="View reports"
                selected={role === "parent"}
                onSelect={setRole}
              />
              <RoleOption
                value="tutor"
                label="Tutor"
                description="Run sessions"
                selected={role === "tutor"}
                onSelect={setRole}
              />
              <RoleOption
                value="student"
                label="Student"
                description="See my progress"
                selected={role === "student"}
                onSelect={setRole}
              />
            </div>
          </div>
        )}

        <div className="pt-1">
          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            size="lg"
            className="w-full"
          >
            {loading
              ? "…"
              : mode === "login"
                ? "Log in"
                : "Create account"}
          </Button>
        </div>
      </form>

      {error && (
        <p
          className={`text-sm text-center ${
            error.startsWith("Check your email")
              ? "text-emerald-600"
              : "text-red-500"
          }`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function Field({ label, ...rest }) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </span>
      <input
        {...rest}
        className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
      />
    </label>
  );
}

function RoleOption({ value, label, description, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`text-left px-3.5 py-3 rounded-xl border transition ${
        selected
          ? "border-brand bg-brand-pale shadow-sm shadow-brand/10"
          : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
      }`}
    >
      <div className={`text-sm font-medium ${selected ? "text-brand-foreground" : ""}`}>
        {label}
      </div>
      <div className={`text-[11px] mt-0.5 ${selected ? "text-brand-foreground/70" : "text-muted"}`}>
        {description}
      </div>
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
    </svg>
  );
}
