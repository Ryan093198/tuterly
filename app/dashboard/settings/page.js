import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import EmailChangeForm from "@/components/EmailChangeForm";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, role")
    .eq("id", user.id)
    .single();

  return (
    <div className="px-6 sm:px-8 py-8 sm:py-10 max-w-2xl mx-auto animate-fade-in-up">
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <p className="text-sm text-muted mt-1">
        Manage your account and sign-in details.
      </p>

      <section className="mt-8 space-y-3">
        <h2 className="text-[11px] uppercase tracking-wider text-muted font-medium">
          Profile
        </h2>
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card p-5 space-y-2">
          <Row label="Name" value={profile?.full_name || "—"} />
          <Row label="Email" value={profile?.email || user.email} />
          <Row label="Role" value={titleCase(profile?.role || "—")} />
        </div>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-[11px] uppercase tracking-wider text-muted font-medium">
          Change email
        </h2>
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card p-5">
          <EmailChangeForm currentEmail={profile?.email || user.email} />
        </div>
      </section>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-muted">{label}</span>
      <span className="font-medium truncate">{value}</span>
    </div>
  );
}

function titleCase(s) {
  if (!s) return "";
  return s[0].toUpperCase() + s.slice(1);
}
