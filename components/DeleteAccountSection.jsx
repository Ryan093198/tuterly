"use client";

import { useState } from "react";
import { deleteAccount } from "@/app/dashboard/account-actions";
import Button from "@/components/ui/Button";
import SubmitButton from "@/components/ui/SubmitButton";

const CONSEQUENCE_BY_ROLE = {
  tutor:
    "All your students, sessions, reports, photos, resources, and confidence ratings will be permanently deleted.",
  admin:
    "All your students, sessions, reports, photos, resources, and confidence ratings will be permanently deleted.",
  parent:
    "Your children will stay on their tutor's account, only your parent access and pending invites are removed.",
  student:
    "Your student account will be unlinked from your student profile. Your tutor can re-invite you later.",
};

export default function DeleteAccountSection({ email, role }) {
  const [expanded, setExpanded] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState(null);

  const consequence =
    CONSEQUENCE_BY_ROLE[role] || CONSEQUENCE_BY_ROLE.parent;
  const matches =
    confirmEmail.trim().toLowerCase() === (email || "").toLowerCase();

  if (!expanded) {
    return (
      <div className="rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50/40 dark:bg-red-950/10 p-5 space-y-2">
        <p className="text-sm font-medium">Delete my account</p>
        <p className="text-xs text-muted leading-relaxed">{consequence}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setExpanded(true)}
          className="text-danger border-red-300 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/20"
        >
          Delete my account…
        </Button>
      </div>
    );
  }

  return (
    <form
      action={async (formData) => {
        try {
          await deleteAccount(formData);
        } catch (e) {
          // redirect() inside the action throws a special signal Next handles
          // — only surface real errors to the user.
          if (e?.digest?.startsWith?.("NEXT_REDIRECT")) throw e;
          setError(e?.message || "Could not delete account.");
        }
      }}
      className="rounded-2xl border border-red-300 dark:border-red-900/50 bg-red-50/60 dark:bg-red-950/15 p-5 space-y-3"
    >
      <div>
        <p className="text-sm font-semibold text-danger">
          This permanently deletes your account.
        </p>
        <p className="text-xs text-muted mt-1 leading-relaxed">{consequence}</p>
      </div>

      <label className="block space-y-1.5">
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          Type <span className="font-mono">{email}</span> to confirm
        </span>
        <input
          type="email"
          name="confirm_email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          autoComplete="off"
          className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-danger/30 focus:border-danger transition"
          required
        />
      </label>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <div className="flex gap-2 pt-1">
        <SubmitButton
          variant="danger"
          size="sm"
          pendingLabel="Deleting…"
          disabled={!matches}
        >
          Permanently delete
        </SubmitButton>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setExpanded(false);
            setConfirmEmail("");
            setError(null);
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
