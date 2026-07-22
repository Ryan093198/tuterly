import { createAdminClient } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/admin";
import { billingEnabled } from "@/lib/billing-config";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import {
  approveApplication,
  rejectApplication,
  setTutorApproval,
} from "./actions";

export const dynamic = "force-dynamic";

// Minimal internal admin control plane (audit C6). Gated by the ADMIN_EMAILS
// allowlist via requireAdmin(). Three sections: pending tutor applications,
// the tutor roster with a suspend/reinstate toggle, and a recent-activity feed
// from the session report log.
export default async function AdminDashboard() {
  await requireAdmin();
  const admin = createAdminClient();

  const [{ data: pendingApps }, { data: tutors }, { data: activity }] =
    await Promise.all([
      admin
        .from("tutor_applications")
        .select("id, name, email, phone, subjects, year_levels, experience, created_at")
        .eq("status", "pending")
        .order("created_at", { ascending: false }),
      admin
        .from("profiles")
        .select("id, full_name, email, approved, created_at")
        .eq("role", "tutor")
        .order("created_at", { ascending: false }),
      admin
        .from("session_report_log")
        .select("id, tutor_name, student_name, year_level, subject, session_date, generated_at")
        .order("generated_at", { ascending: false })
        .limit(25),
    ]);

  // Pending tutor payouts (phased MVP), grouped by tutor — this is the
  // manual payout worklist until automated Stripe Connect transfers ship.
  let pendingPayouts = [];
  if (billingEnabled()) {
    const { data: rows } = await admin
      .from("tutor_payouts")
      .select("amount, tutor_id, profiles:tutor_id(full_name, email)")
      .eq("status", "pending");
    const byTutor = new Map();
    for (const r of rows ?? []) {
      const key = r.tutor_id;
      const cur = byTutor.get(key) || {
        name: r.profiles?.full_name || r.profiles?.email || "Tutor",
        email: r.profiles?.email || "",
        total: 0,
        count: 0,
      };
      cur.total += Number(r.amount || 0);
      cur.count += 1;
      byTutor.set(key, cur);
    }
    pendingPayouts = [...byTutor.values()].sort((a, b) => b.total - a.total);
  }

  return (
    <div className="px-6 sm:px-8 py-8 sm:py-10 max-w-5xl mx-auto animate-fade-in-up space-y-10">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
        <p className="text-sm text-muted mt-1">
          Vet tutor applications, manage the tutor roster, and monitor activity.
        </p>
      </header>

      {/* ── Pending applications ─────────────────────────────────────── */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">Pending tutor applications</h2>
          {pendingApps?.length ? (
            <Badge>{pendingApps.length}</Badge>
          ) : null}
        </div>
        {!pendingApps?.length ? (
          <p className="text-sm text-muted">No applications waiting for review.</p>
        ) : (
          <div className="space-y-3">
            {pendingApps.map((app) => (
              <Card key={app.id} className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-medium">{app.name}</div>
                    <div className="text-sm text-muted">
                      {app.email}
                      {app.phone ? ` · ${app.phone}` : ""}
                    </div>
                    <div className="text-sm mt-2">
                      <span className="text-muted">Subjects:</span> {app.subjects || "—"}
                      <span className="text-muted"> · Levels:</span> {app.year_levels || "—"}
                    </div>
                    {app.experience ? (
                      <p className="text-sm mt-2 whitespace-pre-wrap">{app.experience}</p>
                    ) : null}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <form action={approveApplication}>
                      <input type="hidden" name="application_id" value={app.id} />
                      <Button type="submit" variant="primary" size="sm">
                        Approve
                      </Button>
                    </form>
                    <form action={rejectApplication}>
                      <input type="hidden" name="application_id" value={app.id} />
                      <Button type="submit" variant="ghost" size="sm">
                        Reject
                      </Button>
                    </form>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        <p className="text-xs text-muted">
          Approving promotes the matching account (by email) to an approved
          tutor. If they haven&apos;t signed up yet, approve again once they have
          — or they&apos;ll appear in the roster below when they do.
        </p>
      </section>

      {/* ── Tutor roster ─────────────────────────────────────────────── */}
      <section className="space-y-3">
        <h2 className="text-lg font-medium">Tutors</h2>
        {!tutors?.length ? (
          <p className="text-sm text-muted">No tutor accounts yet.</p>
        ) : (
          <div className="space-y-2">
            {tutors.map((t) => (
              <Card key={t.id} className="p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium truncate">
                    {t.full_name || "Unnamed"}
                  </div>
                  <div className="text-sm text-muted truncate">{t.email}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge tone={t.approved ? "success" : "warning"}>
                    {t.approved ? "Approved" : "Pending"}
                  </Badge>
                  <form action={setTutorApproval}>
                    <input type="hidden" name="tutor_id" value={t.id} />
                    <input
                      type="hidden"
                      name="approved"
                      value={t.approved ? "false" : "true"}
                    />
                    <Button type="submit" variant="ghost" size="sm">
                      {t.approved ? "Suspend" : "Approve"}
                    </Button>
                  </form>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* ── Pending tutor payouts (manual payout worklist) ───────────── */}
      {billingEnabled() && (
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Pending tutor payouts</h2>
          {!pendingPayouts.length ? (
            <p className="text-sm text-muted">No payouts owing.</p>
          ) : (
            <Card className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {pendingPayouts.map((p, i) => (
                <div
                  key={i}
                  className="p-3 flex items-center justify-between gap-3 text-sm"
                >
                  <div className="min-w-0">
                    <span className="font-medium">{p.name}</span>
                    {p.email ? (
                      <span className="text-muted"> · {p.email}</span>
                    ) : null}
                    <span className="text-muted">
                      {` · ${p.count} session${p.count === 1 ? "" : "s"}`}
                    </span>
                  </div>
                  <span className="font-semibold tabular-nums shrink-0">
                    ${p.total.toFixed(2)}
                  </span>
                </div>
              ))}
            </Card>
          )}
          <p className="text-xs text-muted">
            These are the net amounts owed to each tutor. Pay them out manually
            for now; automated Stripe Connect transfers come in the next phase.
          </p>
        </section>
      )}

      {/* ── Recent activity ──────────────────────────────────────────── */}
      <section className="space-y-3">
        <h2 className="text-lg font-medium">Recent reports</h2>
        {!activity?.length ? (
          <EmptyState title="No activity yet" description="Generated reports will appear here." />
        ) : (
          <Card className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {activity.map((a) => (
              <div key={a.id} className="p-3 flex items-center justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <span className="font-medium">{a.tutor_name || "Tutor"}</span>
                  <span className="text-muted"> → {a.student_name || "Student"}</span>
                  {a.year_level ? <span className="text-muted"> · {a.year_level}</span> : null}
                  {a.subject ? <span className="text-muted"> · {a.subject}</span> : null}
                </div>
                <div className="text-muted shrink-0">
                  {a.generated_at
                    ? new Date(a.generated_at).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "short",
                      })
                    : ""}
                </div>
              </div>
            ))}
          </Card>
        )}
      </section>
    </div>
  );
}
