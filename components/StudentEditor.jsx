"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateStudent } from "@/app/dashboard/tutor/students/actions";
import { SCHOOL_YEARS, CURRICULUM_LEVELS } from "@/lib/levels";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function StudentEditor({ student, newSessionHref }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [pending, startSaving] = useTransition();

  function handleSubmit(formData) {
    startSaving(async () => {
      await updateStudent(formData);
      setEditing(false);
      router.refresh();
    });
  }

  if (!editing) {
    const initials = `${student.first_name?.[0] ?? ""}${student.last_name?.[0] ?? ""}`.toUpperCase();
    return (
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 min-w-0">
          <div className="h-14 w-14 shrink-0 rounded-full bg-brand-pale text-brand-foreground flex items-center justify-center text-lg font-semibold">
            {initials}
          </div>
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tracking-tight truncate">
              {student.first_name} {student.last_name}
            </h1>
            <p className="text-sm text-muted mt-0.5 truncate">
              {student.year_level}
              {student.working_level && student.working_level !== student.year_level
                ? ` · working at ${student.working_level}`
                : ""}
              {student.school ? ` · ${student.school}` : ""}
            </p>
            {student.subjects?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {student.subjects.map((subj) => (
                  <Badge key={subj} tone="brand">
                    {subj}
                  </Badge>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-xs text-muted hover:text-foreground mt-2.5 transition"
            >
              Edit details
            </button>
          </div>
        </div>
        <Link href={newSessionHref}>
          <Button variant="primary" size="md">
            <span aria-hidden="true">+</span> New session
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card"
    >
      <input type="hidden" name="id" value={student.id} />
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="First name"
          name="first_name"
          defaultValue={student.first_name}
          required
        />
        <Field
          label="Last name"
          name="last_name"
          defaultValue={student.last_name}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <SelectField
          label="Year level"
          name="year_level"
          options={SCHOOL_YEARS}
          defaultValue={student.year_level}
          required
        />
        <SelectField
          label="Working level"
          name="working_level"
          options={CURRICULUM_LEVELS}
          defaultValue={student.working_level || ""}
          allowEmpty
          emptyLabel="Same as year level"
        />
      </div>
      <Field label="School" name="school" defaultValue={student.school || ""} />
      <Field
        label="Subjects (comma-separated)"
        name="subjects"
        defaultValue={(student.subjects || []).join(", ")}
      />
      <TextArea label="Goals" name="goals" defaultValue={student.goals || ""} />
      <TextArea
        label="Concerns"
        name="concerns"
        defaultValue={student.concerns || ""}
      />
      <div className="flex gap-2 pt-1">
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? "Saving…" : "Save"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setEditing(false)}
          disabled={pending}
        >
          Cancel
        </Button>
      </div>
    </form>
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
        className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
        {...rest}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  defaultValue,
  required,
  allowEmpty,
  emptyLabel,
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </span>
      <select
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full h-10 px-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
      >
        <option value="" disabled={!allowEmpty}>
          {allowEmpty ? emptyLabel || "—" : "Choose…"}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
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
