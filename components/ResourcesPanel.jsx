"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  uploadResource,
  deleteResource,
  updateResource,
} from "@/app/dashboard/resource-actions";
import EmptyState from "@/components/ui/EmptyState";

const CATEGORIES = [
  { id: "textbook", label: "Textbook" },
  { id: "term_outline", label: "Term outline" },
  { id: "school_report", label: "School report" },
  { id: "teacher_notes", label: "Teacher notes" },
  { id: "assessment", label: "Assessment" },
  { id: "assessment_schedule", label: "Assessment schedule" },
  { id: "other", label: "Other" },
];

const CATEGORY_LABEL = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.label])
);

export default function ResourcesPanel({ studentId, resources }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [showPaste, setShowPaste] = useState(false);

  async function handleFiles(files) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.set("student_id", studentId);
        fd.set("file", file);
        await uploadResource(fd);
      }
      router.refresh();
    } catch (e) {
      setError(e.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-4">
      <Dropzone
        uploading={uploading}
        onPick={(files) => handleFiles(files)}
        onTogglePaste={() => setShowPaste((v) => !v)}
        showPaste={showPaste}
        fileInputRef={fileInputRef}
      />

      {showPaste && (
        <PasteForm
          studentId={studentId}
          onClose={() => setShowPaste(false)}
          onSaved={() => {
            setShowPaste(false);
            router.refresh();
          }}
        />
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {(resources?.length ?? 0) === 0 ? (
        <EmptyState
          title="No resources yet"
          description="Upload a textbook contents page, term outline, or school report and the AI will reference it in future reports."
        />
      ) : (
        <ul className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card divide-y divide-zinc-100 dark:divide-zinc-900 overflow-hidden">
          {resources.map((r) => (
            <ResourceRow key={r.id} resource={r} />
          ))}
        </ul>
      )}
    </div>
  );
}

function Dropzone({ uploading, onPick, onTogglePaste, showPaste, fileInputRef }) {
  const [dragOver, setDragOver] = useState(false);
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        onPick(e.dataTransfer.files);
      }}
      onClick={() => !uploading && fileInputRef.current?.click()}
      className={`rounded-2xl border border-dashed transition cursor-pointer p-6 text-center ${
        dragOver
          ? "border-brand bg-brand-pale/60"
          : "border-zinc-300 dark:border-zinc-700 hover:border-brand/50 hover:bg-brand-pale/30"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt,.md,.csv,.png,.jpg,.jpeg"
        className="hidden"
        onChange={(e) => onPick(e.target.files)}
      />
      <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-brand-pale text-brand-dark flex items-center justify-center">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 4v12" />
          <path d="m6 10 6-6 6 6" />
          <path d="M4 20h16" />
        </svg>
      </div>
      <p className="text-sm font-medium">
        {uploading ? "Uploading…" : "Drop a file or click to upload"}
      </p>
      <p className="text-xs text-muted mt-1">
        PDF, Word, text or image — auto-classified by filename. Max 25MB per file.{" "}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onTogglePaste();
          }}
          className="text-brand hover:text-brand-dark underline-offset-2 hover:underline"
        >
          {showPaste ? "Cancel paste" : "Or paste contents →"}
        </button>
      </p>
    </div>
  );
}

function PasteForm({ studentId, onClose, onSaved }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("textbook");
  const [notes, setNotes] = useState("");
  const [pending, setPending] = useState(false);
  const [err, setErr] = useState(null);

  async function handleSave() {
    if (!name.trim() || !text.trim()) return;
    setPending(true);
    setErr(null);
    try {
      const fd = new FormData();
      fd.set("student_id", studentId);
      fd.set("inline_name", name);
      fd.set("inline_text", text);
      fd.set("category", category);
      if (notes) fd.set("notes", notes);
      await uploadResource(fd);
      onSaved?.();
    } catch (e) {
      setErr(e.message || "Save failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card p-4 space-y-3">
      <div className="grid sm:grid-cols-2 gap-2.5">
        <label className="block space-y-1.5">
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            Document name
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Cambridge Y9 — Chapter 5 contents"
            className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            Category
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-10 px-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Paste the contents here…"
        className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
      />
      <input
        type="text"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Optional notes"
        className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
      />
      <div className="flex gap-2 items-center">
        <button
          type="button"
          onClick={handleSave}
          disabled={pending || !name.trim() || !text.trim()}
          className="h-10 px-4 rounded-full bg-brand hover:bg-brand-dark text-white text-sm font-medium shadow-sm shadow-brand/20 disabled:bg-zinc-300 disabled:text-zinc-500 disabled:shadow-none transition"
        >
          {pending ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-muted hover:text-foreground transition"
        >
          Cancel
        </button>
        {err && <p className="text-xs text-red-500 ml-auto">{err}</p>}
      </div>
    </div>
  );
}

function ResourceRow({ resource }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [category, setCategory] = useState(resource.category);
  const [notes, setNotes] = useState(resource.notes ?? "");
  const [pending, startSaving] = useTransition();
  const [deletePending, startDeleting] = useTransition();

  function handleSave() {
    startSaving(async () => {
      const fd = new FormData();
      fd.set("resource_id", resource.id);
      if (category !== resource.category) fd.set("category", category);
      fd.set("notes", notes);
      await updateResource(fd);
      setEditing(false);
      router.refresh();
    });
  }

  function handleDelete() {
    if (!confirm(`Delete "${resource.name}"?`)) return;
    startDeleting(async () => {
      const fd = new FormData();
      fd.set("resource_id", resource.id);
      await deleteResource(fd);
      router.refresh();
    });
  }

  return (
    <li className="px-4 py-3 hover:bg-surface-soft transition">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <CategoryIcon category={resource.category} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              {resource.signed_url ? (
                <a
                  href={resource.signed_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium truncate hover:text-brand transition"
                >
                  {resource.name}
                </a>
              ) : (
                <span className="text-sm font-medium truncate">
                  {resource.name}
                </span>
              )}
              <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-surface-soft text-muted font-medium border border-zinc-200 dark:border-zinc-800">
                {CATEGORY_LABEL[resource.category] ?? resource.category}
              </span>
              {!resource.file_url && (
                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-brand-pale text-brand-foreground font-medium">
                  Pasted
                </span>
              )}
            </div>
            {!editing && resource.notes && (
              <p className="text-xs text-muted mt-1 leading-snug">
                {resource.notes}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          <IconButton
            label={editing ? "Close edit" : "Edit"}
            onClick={() => setEditing((v) => !v)}
          >
            {editing ? <CloseIcon /> : <EditIcon />}
          </IconButton>
          <IconButton
            label="Delete"
            onClick={handleDelete}
            disabled={deletePending}
            danger
          >
            <TrashIcon />
          </IconButton>
        </div>
      </div>

      {editing && (
        <div className="mt-3 pl-9 space-y-2">
          <div className="grid sm:grid-cols-2 gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-9 px-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
              className="h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
            />
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={pending}
            className="h-8 px-3 rounded-full bg-brand hover:bg-brand-dark text-white text-xs font-medium shadow-sm shadow-brand/20 disabled:opacity-50 transition"
          >
            {pending ? "Saving…" : "Save"}
          </button>
        </div>
      )}
    </li>
  );
}

function IconButton({ children, label, onClick, disabled, danger }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`h-7 w-7 rounded-lg flex items-center justify-center text-muted transition disabled:opacity-50 ${
        danger
          ? "hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-danger"
          : "hover:bg-surface-soft hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function CategoryIcon({ category }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const wrap = (icon) => (
    <div className="h-7 w-7 shrink-0 rounded-lg bg-brand-pale text-brand-dark flex items-center justify-center mt-0.5">
      {icon}
    </div>
  );
  switch (category) {
    case "textbook":
      return wrap(
        <svg {...common} aria-hidden="true">
          <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v14H5.5A1.5 1.5 0 0 0 4 18.5V4.5z" />
          <path d="M4 18.5A1.5 1.5 0 0 0 5.5 20H19" />
        </svg>
      );
    case "term_outline":
    case "assessment_schedule":
      return wrap(
        <svg {...common} aria-hidden="true">
          <rect x="3.5" y="5" width="17" height="15" rx="2" />
          <path d="M3.5 9.5h17" />
          <path d="M8 3v4M16 3v4" />
        </svg>
      );
    case "school_report":
      return wrap(
        <svg {...common} aria-hidden="true">
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <path d="M14 3v6h6" />
          <path d="M8 13h8M8 17h5" />
        </svg>
      );
    case "teacher_notes":
      return wrap(
        <svg {...common} aria-hidden="true">
          <path d="M16.5 4.5L19.5 7.5 9 18l-4 1 1-4z" />
          <path d="M14 7l3 3" />
        </svg>
      );
    case "assessment":
      return wrap(
        <svg {...common} aria-hidden="true">
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      );
    default:
      return wrap(
        <svg {...common} aria-hidden="true">
          <path d="M21.4 11l-9 9a4.7 4.7 0 1 1-6.7-6.7l9.2-9.2a3.2 3.2 0 1 1 4.5 4.5L10.3 17.4a1.6 1.6 0 1 1-2.3-2.3l8.4-8.4" />
        </svg>
      );
  }
}

function EditIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16.5 4.5L19.5 7.5 9 18l-4 1 1-4z" />
      <path d="M14 7l3 3" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export { CATEGORY_LABEL };
