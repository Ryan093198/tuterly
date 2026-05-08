import Link from "next/link";
import { createStudent } from "../actions";
import { SCHOOL_YEARS, CURRICULUM_LEVELS, SUBJECTS } from "@/lib/levels";
import SubmitButton from "@/components/ui/SubmitButton";

export default function NewStudentPage() {
  return (
    <div className="px-6 sm:px-8 py-8 sm:py-10 max-w-2xl mx-auto animate-fade-in-up">
      <div className="mb-6">
        <Link
          href="/dashboard/tutor"
          className="text-sm text-muted hover:text-foreground transition"
        >
          ← Back
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight mt-2">
          Add a student
        </h1>
        <p className="text-sm text-muted mt-1">
          Set the curriculum level if they're working ahead or behind their year.
        </p>
      </div>

      <form action={createStudent} className="space-y-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card p-6 shadow-sm">
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="First name" name="first_name" required />
          <Field label="Last name" name="last_name" required />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Select label="Year level" name="year_level" required options={SCHOOL_YEARS} />
          <Field label="School" name="school" />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Select
            label="Subject"
            name="subject"
            required
            optionPairs={SUBJECTS}
            defaultValue="maths"
            hint="Drives which curriculum block the AI references."
          />
          <Select
            label="Working level (curriculum)"
            name="working_level"
            options={CURRICULUM_LEVELS}
            hint="Leave blank if same as year level."
            allowEmpty
          />
        </div>
        <Field
          label="VCE study designs (optional)"
          name="subjects"
          placeholder="VCE Maths Methods, VCE Specialist Maths"
          hint="Comma-separated. Only needed for VCE students."
        />
        <TextArea
          label="Goals"
          name="goals"
          placeholder="What does the student want to achieve this term?"
        />
        <TextArea
          label="Concerns"
          name="concerns"
          placeholder="Any areas of difficulty or anxiety?"
        />

        <div className="pt-2">
          <SubmitButton pendingLabel="Adding…">Add student</SubmitButton>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, hint, ...rest }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </span>
      <input
        name={name}
        className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
        {...rest}
      />
      {hint && <span className="block text-xs text-muted">{hint}</span>}
    </label>
  );
}

function Select({
  label,
  name,
  options,
  optionPairs,
  required,
  allowEmpty,
  hint,
  defaultValue = "",
}) {
  const pairs =
    optionPairs ?? (options ?? []).map((o) => ({ value: o, label: o }));
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </span>
      <select
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="w-full h-11 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
      >
        {(allowEmpty || defaultValue === "") && (
          <option value="" disabled={!allowEmpty}>
            {allowEmpty ? "Same as year level" : "Choose…"}
          </option>
        )}
        {pairs.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && <span className="block text-xs text-muted">{hint}</span>}
    </label>
  );
}

function TextArea({ label, name, ...rest }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </span>
      <textarea
        name={name}
        rows={3}
        className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
        {...rest}
      />
    </label>
  );
}
