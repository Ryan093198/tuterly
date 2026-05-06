import { Suspense } from "react";
import Auth from "@/components/Auth";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-12 bg-gradient-to-b from-brand-pale via-surface-soft to-surface-soft">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="flex flex-col items-center mb-8 text-center">
          <Logo size="lg" />
          <p className="mt-3 text-sm text-muted max-w-xs">
            Tutoring sessions, tracked. Reports parents actually read.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card shadow-xl shadow-black/5 p-6 sm:p-8">
          <Suspense fallback={null}>
            <Auth />
          </Suspense>
        </div>

        <p className="mt-6 text-xs text-center text-muted">
          By signing up you agree to Tuterly's terms of service. Reports are
          stored privately for you and the linked parent.
        </p>
      </div>
    </main>
  );
}
