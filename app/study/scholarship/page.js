import Link from "next/link";
import Logo from "@/components/Logo";
import PassForm from "./PassForm";

export const metadata = {
  title: "Scholarship Pass",
  description: "Get ready for Year 5, 6 and 7 entry scholarship and selective tests with Tuterly Study: a full diagnostic and practice on every skill. One payment, yours to keep.",
  alternates: { canonical: "/study/scholarship" },
};

const PERKS = [
  "The full 40-question numerical reasoning diagnostic and report",
  "Ace it? A harder next-level diagnostic is included",
  "Unlimited practice on every skill your child missed",
  "New similar questions until each one is mastered",
  "Snap questions from any prep book or past paper",
  "Pay once. Yours to keep, no subscription",
];

export default function SchPassPage() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-12 bg-surface-soft">
      <div className="w-full max-w-xl">
        <header className="flex items-center justify-between mb-10">
          <Link href="/"><Logo /></Link>
        </header>
        <article className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card shadow-sm p-8 sm:p-10 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">Scholarship Pass</h1>
            <p className="text-muted">
              For Year 4 to 6 students preparing for Year 5, 6 or 7 entry scholarship and selective tests: ACER,
              Edutest, AAS and selective schools. Try the first 10 diagnostic questions free in the app.
            </p>
          </div>
          <ul className="space-y-1.5 text-[15px]">
            {PERKS.map((p) => (
              <li key={p} className="flex gap-2"><span aria-hidden className="text-[#0e9fc1] font-bold">✓</span><span>{p}</span></li>
            ))}
          </ul>
          <PassForm />
          <p className="text-xs text-muted leading-relaxed">
            Billed by Bayside Academics. A one-off payment in Australian dollars, including GST. No subscription. See our{" "}
            <Link className="underline" href="/terms">Terms</Link> and <Link className="underline" href="/privacy">Privacy Policy</Link>.
          </p>
        </article>
      </div>
    </main>
  );
}
