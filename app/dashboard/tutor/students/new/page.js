import Link from "next/link";
import { createStudent } from "../actions";
import { SCHOOL_YEARS, CURRICULUM_LEVELS } from "@/lib/levels";
import Button from "@/components/ui/Button";

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
        <Select
          label="Working level (curriculum)"
          name="working_level"
          options={CURRICULUM_LEVELS}
          hint="Leave blank if same as year level. Set if the student is ahead or behind."
          allowEmpty
        />
        <Field
          label="Subjects"
          name="subjects"
          placeholder="Maths, English (comma-separated)"
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
          <Button variant="primary" size="lg" type="submit">
            Add student
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, ...rest }) {
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
    </label>
  );
}

function Select({ label, name, options, required, allowEmpty, hint }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full h-11 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
      >
        <option value="" disabled={!allowEmpty}>
          {allowEmpty ? "Same as year level" : "Choose…"}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
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
