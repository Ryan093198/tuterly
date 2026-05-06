import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.RESEND_FROM_EMAIL || "Tuterly <noreply@tuterly.com.au>";

function appUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

async function send({ to, subject, html, attachments }) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — would have sent:", { to, subject });
    return { id: null, skipped: true };
  }
  const payload = { from: FROM, to, subject, html };
  if (attachments?.length) payload.attachments = attachments;
  const { data, error } = await resend.emails.send(payload);
  if (error) throw error;
  return data;
}

function shellHtml({ title, body }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#fafaf9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#18181b;">
<div style="max-width:560px;margin:0 auto;padding:32px 24px;">
  <div style="font-size:20px;font-weight:600;letter-spacing:-0.01em;margin-bottom:24px;">Tuterly</div>
  ${body}
  <div style="margin-top:48px;font-size:12px;color:#a1a1aa;">
    Sent by Tuterly · <a href="${appUrl()}" style="color:#a1a1aa;">tuterly.com.au</a>
  </div>
</div>
</body>
</html>`;
}

function button(href, label) {
  return `<a href="${href}" style="display:inline-block;background:#18181b;color:#fafaf9;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:500;font-size:14px;">${label}</a>`;
}

export async function sendInviteEmail({ to, inviterName, studentName, role, token }) {
  const url = `${appUrl()}/invite/${token}`;
  const isParent = role === "parent";

  const subject = isParent
    ? `${inviterName} invited you to view ${studentName}'s tutoring reports`
    : `${inviterName} invited you to tutor ${studentName} on Tuterly`;

  const intro = isParent
    ? `<strong>${inviterName}</strong> has invited you to view tutoring session reports for <strong>${studentName}</strong> on Tuterly.`
    : `<strong>${inviterName}</strong> has invited you to tutor <strong>${studentName}</strong> on Tuterly.`;

  const html = shellHtml({
    title: subject,
    body: `
      <h1 style="font-size:22px;font-weight:600;margin:0 0 16px;">You've been invited to Tuterly</h1>
      <p style="font-size:15px;line-height:1.6;color:#3f3f46;margin:0 0 24px;">${intro}</p>
      <p style="margin:0 0 32px;">${button(url, "Accept invite")}</p>
      <p style="font-size:13px;color:#71717a;margin:0;">This invite expires in 7 days. If the button doesn't work, copy and paste this link: ${url}</p>
    `,
  });

  return send({ to, subject, html });
}

export async function sendReportEmail({
  to,
  parentName,
  studentName,
  reportUrl,
  attachments,
}) {
  const subject = `${studentName}'s session report is ready`;

  const html = shellHtml({
    title: subject,
    body: `
      <h1 style="font-size:22px;font-weight:600;margin:0 0 16px;">A session report is ready for ${studentName}</h1>
      <p style="font-size:15px;line-height:1.6;color:#3f3f46;margin:0 0 24px;">${
        parentName ? `Hi ${parentName.split(" ")[0]},` : "Hi,"
      } the latest tutoring session report is available in your Tuterly dashboard, with a PDF copy attached.</p>
      <p style="margin:0 0 32px;">${button(reportUrl, "View report")}</p>
      <p style="font-size:13px;color:#71717a;margin:0;">If the button doesn't work, copy and paste: ${reportUrl}</p>
    `,
  });

  return send({ to, subject, html, attachments });
}
