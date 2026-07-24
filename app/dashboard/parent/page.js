import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import EmptyState from "@/components/ui/EmptyState";
import AddChildButton from "@/components/AddChildButton";
import OnboardingWelcome from "@/components/OnboardingWelcome";
import ParentActivityFeed from "@/components/ParentActivityFeed";
import BuyCreditsPanel from "@/components/BuyCreditsPanel";
import MembershipPanel from "@/components/MembershipPanel";
import { billingEnabled } from "@/lib/billing-config";
import {
  fetchTutorsForStudents,
  tutoringSummary,
} from "@/lib/tutoring-summary";
import { fetchParentActivity } from "@/lib/parent-activity";
import { fetchChildSnapshots } from "@/lib/parent-snapshot";

// Parent dashboard. Two-zone layout:
//   1. Children strip up top — compact entry points; each card opens
//      that child's detail page where reports + practice + flags live.
//   2. Recent activity feed below — chronological stream of new
//      reports, flagged questions, and worksheets across every child.
//      This is the reason the parent comes back: "what's new since I
//      last looked?" — a single glance answers it without drilling.
//
// No payments / credits during internal testing.

export default async function ParentDashboard({ searchParams }) {
  const sp = searchParams ? await searchParams : {};
  // Post-checkout magic-link lands here with ?welcome=pack; direct trial
  // signups may arrive with ?welcome=trial. Either drives the onboarding card.
  const welcomeRaw = typeof sp.welcome === "string" ? sp.welcome : null;
  const welcomeType =
    welcomeRaw === "pack" ? "pack" : welcomeRaw === "trial" ? "trial" : null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: students } = await supabase
    .from("students")
    .select(
      "id, first_name, last_name, year_level, working_level, school, subject"
    )
    .eq("parent_id", user.id)
    .order("first_name");

  const studentList = students ?? [];
  const studentIds = studentList.map((s) => s.id);

  // Show the onboarding card when they arrive fresh from checkout (welcome
  // param) or whenever the account has no children yet — the two moments a
  // parent most needs a nudge toward the next step.
  const showOnboarding = welcomeType !== null || studentList.length === 0;
  // Minimal rows the match modal's child picker needs.
  const onboardingStudents = studentList.map((s) => ({
    id: s.id,
    first_name: s.first_name,
    last_name: s.last_name,
    year_level: s.year_level,
    subject: s.subject,
  }));

  // Children cards need tutor names + the per-child snapshot (sessions
  // in the window, flag counts, suggested practice topics). Both run
  // in parallel; the activity feed hits 3 more tables and streams in
  // separately via <Suspense> below so it can't block the strip.
  const [tutorsByStudent, snapshotsByStudent] = studentIds.length
    ? await Promise.all([
        fetchTutorsForStudents(studentIds),
        fetchChildSnapshots(supabase, studentIds),
      ])
    : [new Map(), new Map()];

  // Session credits (phased MVP). Only surfaced when billing is enabled — the
  // free pilot never shows or spends credits.
  let credits = null;
  let packs = [];
  let membership = null;
  // hasPack: a credits row exists only once they've bought a session pack, so
  // it's the durable "they're on the sessions plan" signal even after the
  // balance is spent down to 0. Software is included with packs, so a pack
  // buyer must NOT be pitched the separate $29/mo membership.
  let hasPack = false;
  if (billingEnabled()) {
    const admin = createAdminClient();
    const [{ data: creditRow }, { data: packRows }, { data: subRow }] =
      await Promise.all([
        admin
          .from("credits")
          .select("credits_remaining")
          .eq("parent_id", user.id)
          .maybeSingle(),
        admin
          .from("session_packs")
          .select("id, name, sessions, price, per_session, savings")
          .eq("active", true)
          .order("sessions"),
        // Most recent live membership, if any. trialing/active/past_due all
        // count as "has a membership"; anything else falls through to the
        // start-trial pitch.
        admin
          .from("subscriptions")
          .select("status, trial_ends_at, current_period_end")
          .eq("user_id", user.id)
          .in("status", ["trialing", "active", "past_due"])
          .order("current_period_end", { ascending: false, nullsFirst: false })
          .limit(1)
          .maybeSingle(),
      ]);
    credits = creditRow?.credits_remaining ?? 0;
    hasPack = creditRow != null;
    packs = packRows ?? [];
    membership = subRow ?? null;
  }

  // Software is included whenever they're on either paid path — a session pack
  // or an active membership. Drives the "included, no separate membership"
  // messaging on the credits panel.
  const hasSub = membership != null;
  const softwareIncluded = hasPack || hasSub;

  return (
    <div className="px-4 sm:px-8 py-6 sm:py-10 max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight font-grotesk">
            Parent&apos;s Dashboard
          </h1>
          <p className="text-sm text-muted mt-1">
            {studentList.length === 0
              ? "Add your child to start generating worksheets and lesson plans straight away."
              : "What's new across your children's tutoring."}
          </p>
        </div>
        {studentList.length > 0 && <AddChildButton />}
      </header>

      {showOnboarding && (
        <OnboardingWelcome
          welcomeType={welcomeType}
          hasChildren={studentList.length > 0}
          firstStudentId={studentList[0]?.id ?? null}
          students={onboardingStudents}
        />
      )}

      {/* Credits first: for a pack buyer this is their primary relationship,
          and leading with it (plus the "software included" note) is what
          prevents the confusing double-ask with the membership panel. */}
      {billingEnabled() && (
        <BuyCreditsPanel
          creditsRemaining={credits}
          packs={packs}
          hasPack={hasPack}
          softwareIncluded={softwareIncluded}
        />
      )}

      {/* Membership panel hides its $29/mo pitch entirely for pack buyers —
          their software is already included. */}
      {billingEnabled() && (
        <MembershipPanel subscription={membership} hasPack={hasPack} />
      )}

      {studentList.length === 0 ? (
        // The onboarding card already owns the "add your child" call to action,
        // so don't double up with the plain empty state when it's showing.
        showOnboarding ? null : (
          <EmptyState
            icon={<HeartIcon />}
            title="Add your child to get started"
            description="Once they're added, you can generate practice worksheets and lesson plans for them straight away. If a tutor invites you later, their sessions will plug into the same record."
            action={<AddChildButton variant="primary" label="Add your child" />}
          />
        )
      ) : (
        <>
          {/* CHILDREN — snapshot cards */}
          <section className="space-y-3">
            <h2 className="text-[11px] uppercase tracking-wider text-muted font-medium">
              Your children
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {studentList.map((s) => (
                <li key={s.id}>
                  <ChildSnapshotCard
                    student={s}
                    tutorLine={tutoringSummary(s, tutorsByStudent.get(s.id))}
                    snapshot={snapshotsByStudent.get(s.id)}
                  />
                </li>
              ))}
            </ul>
          </section>

          {/* ACTIVITY FEED */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight font-grotesk">
              Recent activity
            </h2>
            <Suspense fallback={<ActivityFeedSkeleton />}>
              <ActivityFeedStream
                parentId={user.id}
                students={studentList}
              />
            </Suspense>
          </section>
        </>
      )}
    </div>
  );
}

function ChildSnapshotCard({ student, tutorLine, snapshot }) {
  const sessions = snapshot?.sessions ?? 0;
  const flagsOpen = snapshot?.flagsOpen ?? 0;
  const flagsResolved = snapshot?.flagsResolved ?? 0;
  const topics = snapshot?.suggestedTopics ?? [];
  const profileHref = `/dashboard/parent/students/${student.id}`;
  // Block-link pattern: the card is a positioned container and the
  // name link has an ::after that covers the card surface, so clicking
  // any "empty" area opens the profile. Chip links use position:
  // relative so they sit above the overlay and stay independently
  // clickable.
  return (
    <div className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card p-4 sm:p-5 hover:border-brand/40 hover:shadow-sm transition h-full">
      <div className="flex items-center gap-3">
        <Avatar name={`${student.first_name} ${student.last_name}`} />
        <div className="min-w-0 flex-1">
          <Link
            href={profileHref}
            className="font-medium truncate block after:absolute after:inset-0 after:content-['']"
          >
            {student.first_name} {student.last_name}
          </Link>
          <p className="text-xs text-muted truncate">{tutorLine}</p>
        </div>
        <span className="text-muted group-hover:text-brand transition shrink-0">
          →
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Stat
          label="Sessions · last 4 wks"
          value={sessions}
        />
        <Stat
          label="Open flags"
          value={flagsOpen}
          sublabel={
            flagsResolved > 0
              ? `${flagsResolved} resolved`
              : flagsOpen === 0
                ? "all clear"
                : null
          }
        />
      </dl>

      {topics.length > 0 && (
        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-900">
          <p className="text-[11px] uppercase tracking-wider text-muted font-medium mb-1.5">
            Suggested practice
          </p>
          <div className="flex flex-wrap gap-1.5">
            {topics.map((t, i) => {
              const params = new URLSearchParams({ practice_topic: t.topic });
              if (t.subtopic) params.set("practice_subtopic", t.subtopic);
              return (
                <Link
                  key={`${t.topic}-${t.subtopic ?? ""}-${i}`}
                  href={`${profileHref}?${params.toString()}`}
                  className="relative text-xs px-2 py-0.5 rounded-md bg-brand-pale text-brand-foreground hover:bg-brand hover:text-white transition"
                  title={`Generate a worksheet on ${t.subtopic || t.topic}`}
                >
                  {t.subtopic ? `${t.topic} · ${t.subtopic}` : t.topic}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, sublabel }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wider text-muted font-medium">
        {label}
      </dt>
      <dd className="mt-0.5 text-lg font-semibold tabular-nums">{value}</dd>
      {sublabel && (
        <dd className="text-[11px] text-muted mt-0.5">{sublabel}</dd>
      )}
    </div>
  );
}

async function ActivityFeedStream({ parentId, students }) {
  const supabase = await createClient();
  const events = await fetchParentActivity(supabase, parentId, students);
  return <ParentActivityFeed events={events} />;
}

function ActivityFeedSkeleton() {
  return (
    <ul className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card divide-y divide-zinc-100 dark:divide-zinc-900 overflow-hidden animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <li
          key={i}
          className="flex items-start gap-3 px-4 py-3 sm:px-5 sm:py-4"
        >
          <div className="h-9 w-9 shrink-0 rounded-full bg-zinc-200/70 dark:bg-zinc-800/60" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-40 rounded bg-zinc-200/70 dark:bg-zinc-800/60" />
            <div className="h-3 w-28 rounded bg-zinc-200/60 dark:bg-zinc-800/50" />
          </div>
          <div className="h-3 w-8 rounded bg-zinc-200/50 dark:bg-zinc-800/40 mt-1" />
        </li>
      ))}
    </ul>
  );
}

function Avatar({ name }) {
  const initials = (name || "?")
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="h-10 w-10 shrink-0 rounded-full bg-brand-pale text-brand-foreground flex items-center justify-center text-sm font-semibold">
      {initials}
    </div>
  );
}

function HeartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10z" />
    </svg>
  );
}
