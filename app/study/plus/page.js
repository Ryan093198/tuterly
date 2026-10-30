import Link from "next/link";
import Logo from "@/components/Logo";
import PlusForm from "./PlusForm";

export const metadata = {
  title: "Tuterly Study Plus",
  description: "Unlimited snaps, drills, tests and study notes in Tuterly Study. Start with a free week.",
  alternates: { canonical: "/study/plus" },
};

const PERKS = [
  "Unlimited snaps and a bank as big as you like",
  "Unlimited drills",
  "Upload whole marked tests: every wrong question in one go",
  "Topic tests, Test any topic and the Weekly review",
  "Study notes on any topic",
  "Follow your class's term plan",
];

export default function StudyPlus() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-12 bg-surface-soft">
      <div className="w-full max-w-xl">
        <header className="flex items-center justify-between mb-10">
          <Link href="/">
            <Logo />
          </Link>
        </header>
        <article className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card shadow-sm p-8 sm:p-10 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">Tuterly Study Plus</h1>
            <p className="text-muted">
              Everything in Tuterly Study, for Years 7 to 10 maths. Start with a free week, cancel any time.
            </p>
          </div>
          <ul className="space-y-1.5 text-[15px]">
            {PERKS.map((p) => (
              <li key={p} className="flex gap-2">
                <span aria-hidden className="text-[#0e9fc1] font-bold">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <PlusForm />
          <p className="text-xs text-muted leading-relaxed">
            Billed by Bayside Academics. Prices in Australian dollars, including GST. Subscriptions renew
            automatically until cancelled; cancel any time at{" "}
            <Link className="underline" href="/study/manage">tuterly.com.au/study/manage</Link>. See our{" "}
            <Link className="underline" href="/terms">Terms</Link> and{" "}
            <Link className="underline" href="/privacy">Privacy Policy</Link>.
          </p>
        </article>
      </div>
    </main>
  );
}
