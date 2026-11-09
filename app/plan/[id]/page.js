import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import PlanView from "@/components/planner/PlanView";
import { createAdminClient } from "@/lib/supabase-admin";
import { melbourneToday, parentCheckIns } from "@/lib/study-plan";
import "@/components/state/state-hub.css";
import "@/components/planner/planner.css";

// /plan/[id]: a saved maths exam study plan, opened from the emailed link.
// Private, not indexed.
export const dynamic = "force-dynamic";

async function loadPlan(id) {
  if (!/^[a-z2-9]{8,16}$/.test(String(id))) return null;
  try {
    const admin = createAdminClient();
    const { data } = await admin.from("study_plans").select("id, role, plan, done, opens").eq("id", id).maybeSingle();
    if (data) {
      await admin.from("study_plans").update({ opens: (data.opens || 0) + 1, last_opened_at: new Date().toISOString() }).eq("id", id);
    }
    return data || null;
  } catch {
    return null;
  }
}

export const metadata = {
  title: "Your maths exam plan | Tuterly",
  robots: { index: false, follow: false },
};

export default async function PlanPage({ params }) {
  const { id } = await params;
  const row = await loadPlan(id);
  return (
    <div className="sh">
      <MarketingNav />
      {row ? (
        <PlanView id={row.id} plan={row.plan} initialDone={row.done || {}} role={row.role} today={melbourneToday()} checkIns={parentCheckIns(row.plan)} />
      ) : (
        <header className="sh-hero">
          <p className="sh-eyebrow">Study plan</p>
          <h1>We couldn&rsquo;t find this plan</h1>
          <p className="sh-lead">
            Check the link in your email, or <Link href="/study-planner">make a new plan</Link>. It takes about a minute.
          </p>
        </header>
      )}
      <MarketingFooter />
    </div>
  );
}
