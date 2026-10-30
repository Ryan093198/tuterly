import Link from "next/link";
import Logo from "@/components/Logo";
import ManageForm from "./ManageForm";

export const metadata = { title: "Manage Tuterly Study Plus", robots: { index: false, follow: false } };

export default async function StudyManage({ searchParams }) {
  const { done } = await searchParams;
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-12 bg-surface-soft">
      <div className="w-full max-w-xl">
        <header className="flex items-center justify-between mb-10">
          <Link href="/"><Logo /></Link>
        </header>
        <article className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card shadow-sm p-8 sm:p-10 space-y-5">
          <h1 className="text-3xl font-semibold tracking-tight">{done ? "All done" : "Manage Tuterly Study Plus"}</h1>
          <p className="text-muted">
            {done
              ? "Your changes are saved. Need anything else? Enter your email for a new link."
              : "Bought Plus on our website? Enter the email you used and we'll send you a link to change your plan or card, or cancel."}
          </p>
          <ManageForm />
          <p className="text-sm text-muted">
            Bought it in the app? Manage it in your iPhone&apos;s Settings, then your name, then Subscriptions.
          </p>
        </article>
      </div>
    </main>
  );
}
