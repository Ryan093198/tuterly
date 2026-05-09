import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import Logo from "@/components/Logo";
import SubmitButton from "@/components/ui/SubmitButton";
import { setInitialRole } from "./actions";

export default async function ChooseRolePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, email")
    .eq("id", user.id)
    .single();

  if (profile?.role) redirect("/dashboard");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-surface">
      <div className="w-full max-w-2xl space-y-8 animate-fade-in-up">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-sm text-muted">
            Tell us how you&apos;ll be using Tuterly. We&apos;ll set up the
            right dashboard for you.
          </p>
        </div>

        <form action={setInitialRole} className="space-y-4">
          <fieldset className="grid sm:grid-cols-3 gap-3">
            <legend className="sr-only">Role</legend>
            <RoleCard
              value="tutor"
              title="Tutor"
              description="I run sessions, write reports, and look after my students."
              iconName="students"
            />
            <RoleCard
              value="parent"
              title="Parent"
              description="I want to see my child's progress and reports from their tutor."
              iconName="heart"
            />
            <RoleCard
              value="student"
              title="Student"
              description="I want to see my own reports, ratings, and tutor resources."
              iconName="book"
            />
          </fieldset>
          <div className="flex justify-center pt-2">
            <SubmitButton size="lg" pendingLabel="Setting up…">
              Continue
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}

function RoleCard({ value, title, description, iconName }) {
  return (
    <label className="cursor-pointer group">
      <input
        type="radio"
        name="role"
        value={value}
        required
        className="peer sr-only"
      />
      <div className="h-full rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-card p-5 transition shadow-sm peer-checked:border-brand peer-checked:shadow-md peer-checked:bg-brand-pale/30 hover:border-brand/40">
        <div className="h-10 w-10 rounded-xl bg-brand-pale text-brand-dark flex items-center justify-center mb-3 group-hover:bg-brand-pale/80 transition">
          <Icon name={iconName} />
        </div>
        <p className="font-semibold">{title}</p>
        <p className="text-xs text-muted mt-1 leading-relaxed">{description}</p>
      </div>
    </label>
  );
}

function Icon({ name }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (name === "students") {
    return (
      <svg {...common} aria-hidden="true">
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 19c.7-3.3 3.4-5.5 6.5-5.5s5.8 2.2 6.5 5.5" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M15 14.5c1.6.4 3 1.7 3.5 3.5" />
      </svg>
    );
  }
  if (name === "heart") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10z" />
      </svg>
    );
  }
  if (name === "book") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v14H5.5A1.5 1.5 0 0 0 4 18.5V4.5z" />
        <path d="M4 18.5A1.5 1.5 0 0 0 5.5 20H19" />
      </svg>
    );
  }
  return null;
}
