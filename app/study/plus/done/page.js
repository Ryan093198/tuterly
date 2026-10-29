import Link from "next/link";
import Logo from "@/components/Logo";
import { stripe } from "@/lib/stripe";
import { STUDY_APP, STUDY_APP_STORE_URL } from "@/lib/study-plus";

export const metadata = { title: "You're on Tuterly Study Plus", robots: { index: false, follow: false } };

// After Stripe Checkout: the family code, or which email to sign in with.
export default async function StudyPlusDone({ searchParams }) {
  const { session_id } = await searchParams;
  let s = null;
  try {
    if (typeof session_id === "string" && session_id.startsWith("cs_")) s = await stripe().checkout.sessions.retrieve(session_id);
  } catch {
    s = null;
  }
  const ok = s && s.metadata?.app === STUDY_APP && s.status === "complete";
  const family = ok && s.metadata.kind === "family";

  return (
    <main className="flex flex-1 flex-col items-center px-6 py-12 bg-surface-soft">
      <div className="w-full max-w-xl">
        <header className="flex items-center justify-between mb-10">
          <Link href="/"><Logo /></Link>
        </header>
        <article className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card shadow-sm p-8 sm:p-10 space-y-5">
          {!ok ? (
            <>
              <h1 className="text-3xl font-semibold tracking-tight">Almost there</h1>
              <p className="text-muted">
                We couldn&apos;t find that checkout. If you&apos;ve paid, check your email for your details, or write to
                learning@baysideacademics.com.au.
              </p>
            </>
          ) : family ? (
            <>
              <h1 className="text-3xl font-semibold tracking-tight">You&apos;re all set!</h1>
              <p>Your family code is:</p>
              <p className="text-4xl font-extrabold tracking-[0.2em] text-center py-2 select-all">{s.metadata.family_code}</p>
              <ol className="list-decimal pl-5 space-y-1.5">
                <li>Download <a className="underline font-medium" href={STUDY_APP_STORE_URL}>Tuterly Study</a> on your child&apos;s phone.</li>
                <li>When they set it up, they enter this code and Plus switches on straight away.</li>
                <li>Already using the app? Me, then Link a tutor or parent, then Got a family code.</li>
              </ol>
              <p className="text-sm text-muted">Up to 3 children can use one code. We&apos;ve emailed it to {s.metadata.email} too.</p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-semibold tracking-tight">You&apos;re on Plus!</h1>
              <ol className="list-decimal pl-5 space-y-1.5">
                <li>Download <a className="underline font-medium" href={STUDY_APP_STORE_URL}>Tuterly Study</a>.</li>
                <li>Sign in with <b>{s.metadata.email}</b>. Plus is on as soon as you do.</li>
              </ol>
            </>
          )}
          <p className="text-sm text-muted">
            Change or cancel any time at <Link className="underline" href="/study/manage">tuterly.com.au/study/manage</Link>.
          </p>
        </article>
      </div>
    </main>
  );
}
