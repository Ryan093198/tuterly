// Session status vocabulary used wherever a session badge is rendered
// (tutor roster card, per-student session list, etc.). Keep tone + label in
// lockstep so a status change anywhere updates everywhere.
export const SESSION_STATUS_TONE = {
  pending: "neutral",
  notes_added: "neutral",
  report_generated: "warning",
  sent_to_parent: "success",
};

export const SESSION_STATUS_LABEL = {
  pending: "Notes pending",
  notes_added: "Notes added",
  report_generated: "Ready · not emailed",
  sent_to_parent: "Emailed",
};
