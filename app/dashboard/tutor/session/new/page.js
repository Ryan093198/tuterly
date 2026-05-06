import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { createSession } from "../actions";
import SessionNotesField from "@/components/SessionNotesField";
import SubmitButton from "@/components/ui/SubmitButton";

const NOTE_PROMPTS = `e.g.
- Topics covered: …
- How the student performed: …
- Areas of concern: …
- Homework set: …`;

export default async function NewSessionPage({ searchParams }) {
  const sp = await searchParams;
  const preselectId = sp?.student;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: links } = await supabase
    .from("tutor_students")
    .select("students(id, first_name, last_name, year_level)")
    .eq("tutor_id", user.id)
    .eq("status", "active");

  const students = (links ?? []).map((l) => l.students).filter(Boolean);

  if (students.length === 0) {
    redirect("/dashboard/tutor/students/new");
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="px-6 sm:px-8 py-8 sm:py-10 max-w-3xl mx-auto animate-fade-in-up">
      <div className="mb-6">
        <Link
          href={
            preselectId
              ? `/dashboard/tutor/students/${preselectId}`
              : "/dashboard/tutor"
          }
          className="text-sm text-muted hover:text-foreground transition"
        >
          ← Back
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight mt-2">
          New session
        </h1>
        <p className="text-sm text-muted mt-1">
          Capture notes, photos, or audio — Claude will turn them into the parent's report.
        </p>
      </div>

      <form
        action={createSession}
        className="space-y-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card p-6 shadow-sm"
      >
        <Label text="Student">
          <select
            name="student_id"
            defaultValue={preselectId ?? ""}
            required
            className="w-full h-11 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
          >
            <option value="" disabled>
              Choose a student
            </option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.first_name} {s.last_name} ({s.year_level})
              </option>
            ))}
          </select>
        </Label>

        <div className="grid grid-cols-2 gap-3">
          <Label text="Date">
            <input
              type="date"
              name="date"
              defaultValue={today}
              required
              className="w-full h-11 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
            />
          </Label>
          <Label text="Duration (min)">
            <input
              type="number"
              name="duration_minutes"
              defaultValue={60}
              min={5}
              step={5}
              required
              className="w-full h-11 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
            />
          </Label>
        </div>

        <Label text="Session notes">
          <SessionNotesField placeholder={NOTE_PROMPTS} />
        </Label>

        <Label text="Photos of working (optional)">
          <input
            type="file"
            name="photos"
            multiple
            accept="image/*"
            className="block w-full text-sm file:h-9 file:px-3 file:rounded-lg file:border file:border-zinc-200 dark:file:border-zinc-800 file:bg-card file:text-sm file:font-medium file:mr-3 file:cursor-pointer hover:file:bg-surface-soft"
          />
          <span className="block text-xs text-muted mt-1.5">
            Snap the whiteboard or the student's working — Claude will see them when generating the report.
          </span>
        </Label>

        <div className="pt-2">
          <SubmitButton pendingLabel="Saving…">Save session</SubmitButton>
        </div>
      </form>
    </div>
  );
}

function Label({ text, children }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {text}
      </span>
      {children}
    </label>
  );
}
